import { useState, useEffect } from 'react';
import mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import './App.css';

// ---------------------------------------------------------
// 🔴 YOUR KEY
// ---------------------------------------------------------
const RAW_API_KEY = "AIzaSyBuf2R6i_ymaBIv2uMbzHismyT2RjzS8D4"; 
const API_KEY = RAW_API_KEY.trim();

function App() {
  const [activeTab, setActiveTab] = useState('citation'); 
  
  // Standard States
  const [citationInput, setCitationInput] = useState('');
  const [citationResult, setCitationResult] = useState('');
  const [loadingCit, setLoadingCit] = useState(false);
  
  const [fileText, setFileText] = useState('');
  const [indexResult, setIndexResult] = useState('');
  const [loadingIndex, setLoadingIndex] = useState(false);
  const [annexureResult, setAnnexureResult] = useState('');
  const [loadingAnnexure, setLoadingAnnexure] = useState(false);
  
  // LAYOUT ENGINE STATES
  const [layoutText, setLayoutText] = useState(''); 
  const [selectedFormat, setSelectedFormat] = useState('supreme'); // Default: Supreme Court

  const [workingModel, setWorkingModel] = useState(null);

  // --- 1. AUTO-DETECT LOGIC ---
  useEffect(() => {
    const findWorkingModel = async () => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();
        if (data.models) {
          const validModel = data.models.find(m => 
            m.supportedGenerationMethods.includes("generateContent") &&
            (m.name.includes("gemini") || m.name.includes("pro") || m.name.includes("flash"))
          );
          if (validModel) setWorkingModel(validModel.name); 
        }
      } catch (e) { console.error(e); }
    };
    findWorkingModel();
  }, []);

  // --- 2. UNIVERSAL AI CALL ---
  const callGoogleAI = async (prompt) => {
    if (!workingModel) throw new Error("Initializing AI... please wait 2 seconds.");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${workingModel}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text.replace(/\*/g, ''); 
  };

  const fixCitation = async () => {
    if (!citationInput) return;
    setLoadingCit(true);
    try {
      const prompt = `Convert to Bluebook citation: "${citationInput}". Return ONLY citation.`;
      const text = await callGoogleAI(prompt);
      setCitationResult(text);
    } catch (error) { setCitationResult(`Error: ${error.message}`); }
    setLoadingCit(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setFileText(result.value);
      alert("✅ Document Scanned! Now click Generate.");
    } catch (err) { alert("Failed to read file."); }
  };

  const generateIndex = async () => {
    if (!fileText) { alert("Upload file first!"); return; }
    setLoadingIndex(true);
    try {
      const prompt = `List every CASE NAME from this text as a numbered list: ${fileText.substring(0, 6000)}`;
      const text = await callGoogleAI(prompt);
      setIndexResult(text);
    } catch (error) { setIndexResult(error.message); }
    setLoadingIndex(false);
  };

  const generateAnnexure = async () => {
    if (!fileText) { alert("Upload file first!"); return; }
    setLoadingAnnexure(true);
    try {
      const prompt = `List all Annexures/Exhibits from this text: ${fileText.substring(0, 6000)}`;
      const text = await callGoogleAI(prompt);
      setAnnexureResult(text);
    } catch (error) { setAnnexureResult(error.message); }
    setLoadingAnnexure(false);
  };

  // --- FEATURE 4: MULTI-FORMAT LAYOUT ENGINE ---
  const handleLayoutUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setLayoutText(result.value);
      alert("✅ Draft Uploaded! Select a format and convert.");
    } catch (err) { alert("Failed to read file."); }
  };

  const generateFormattedDoc = () => {
    if (!layoutText) { alert("Please upload a draft document first!"); return; }

    // Define Rules based on Selection
    let headerText = "IN THE SUPREME COURT OF INDIA";
    let fontName = "Times New Roman";
    let lineSpacing = 360; // 1.5 spacing
    let leftMargin = 1440; // 1 inch
    
    if (selectedFormat === 'highcourt') {
      headerText = "IN THE HIGH COURT OF JUDICATURE AT NEW DELHI";
      fontName = "Arial"; // Modern preference
      lineSpacing = 480; // Double spacing
      leftMargin = 2160; // 1.5 inch (for stitching/binding)
    } 
    else if (selectedFormat === 'district') {
      headerText = "IN THE COURT OF DISTRICT JUDGE";
      fontName = "Courier New"; // Typewriter style
      lineSpacing = 240; // Single spacing
    }

    // Process Text
    const paragraphs = layoutText.split('\n').filter(line => line.trim() !== '');
    
    const docChildren = paragraphs.map(textLine => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: textLine,
                    font: fontName,
                    size: 24, // 12pt
                }),
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: lineSpacing,
                after: 200,
            }
        });
    });

    // Add Header
    docChildren.unshift(
        new Paragraph({
            children: [
                new TextRun({
                    text: headerText,
                    bold: true,
                    font: fontName,
                    size: 28, // 14pt Header
                }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
        })
    );

    // Create Doc
    const doc = new Document({
      sections: [{
        properties: {
            page: {
                margin: {
                    top: 1440, // 1 inch
                    bottom: 1440,
                    left: leftMargin, // Dynamic margin
                    right: 1440,
                },
            },
        },
        children: docChildren,
      }],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `LexFormat_${selectedFormat}_Submission.docx`);
      alert(`✅ Converted to ${selectedFormat.toUpperCase()} format!`);
    });
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="logo"><span className="scale-icon">⚖️</span><h1>LexFormat</h1></div>
        <nav>
          <button className={`nav-btn ${activeTab === 'citation' ? 'active' : ''}`} onClick={() => setActiveTab('citation')}>✨ Citation Fixer</button>
          <button className={`nav-btn ${activeTab === 'index' ? 'active' : ''}`} onClick={() => setActiveTab('index')}>📖 Table of Authorities</button>
          <button className={`nav-btn ${activeTab === 'annexure' ? 'active' : ''}`} onClick={() => setActiveTab('annexure')}>📎 Annexure List</button>
          <button className={`nav-btn ${activeTab === 'layout' ? 'active' : ''}`} onClick={() => setActiveTab('layout')}>📐 Layout Compliance</button>
        </nav>
        <div className="footer-note"><p>v1.0 • Team 4_everInSync</p></div>
      </aside>

      <main className="content-area">
        {activeTab === 'citation' && (
          <div className="workspace">
            <header><h2>Instant Citation Fixer</h2></header>
            <div className="tool-box">
              <textarea placeholder="Paste case name..." value={citationInput} onChange={(e) => setCitationInput(e.target.value)} />
              <button onClick={fixCitation} disabled={loadingCit} className="action-btn">{loadingCit ? "Thinking..." : "Fix Citation"}</button>
              {citationResult && <div className="result-panel"><div className="citation-text">{citationResult}</div></div>}
            </div>
          </div>
        )}

        {activeTab === 'index' && (
          <div className="workspace">
            <header><h2>Table of Authorities</h2></header>
            <div className="tool-box">
              <div className="upload-zone"><input type="file" id="up1" onChange={handleFileUpload} style={{display:'none'}}/><label htmlFor="up1">📂 Upload Draft (.docx)</label></div>
              <button onClick={generateIndex} disabled={loadingIndex} className="action-btn">{loadingIndex ? "Scanning..." : "Generate Table"}</button>
              {indexResult && <div className="result-panel"><pre>{indexResult}</pre></div>}
            </div>
          </div>
        )}

        {activeTab === 'annexure' && (
          <div className="workspace">
            <header><h2>Annexure List</h2></header>
            <div className="tool-box">
              <div className="upload-zone"><input type="file" id="up2" onChange={handleFileUpload} style={{display:'none'}}/><label htmlFor="up2">📎 Upload Draft (.docx)</label></div>
              <button onClick={generateAnnexure} disabled={loadingAnnexure} className="action-btn">{loadingAnnexure ? "Scanning..." : "Generate List"}</button>
              {annexureResult && <div className="result-panel"><pre>{annexureResult}</pre></div>}
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="workspace">
            <header><h2>Layout Compliance Engine</h2><p className="subtitle">Select your target court and upload your draft. We format it automatically.</p></header>
            <div className="tool-box">
              
              {/* LAYOUT SELECTOR */}
              <label style={{display:'block', marginBottom:'8px', fontWeight:'600', color:'var(--text-main)'}}>Select Formatting Standard:</label>
              <select className="layout-selector" value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
                <option value="supreme">🏛️ Supreme Court of India (Times New Roman, 1.5 Spacing)</option>
                <option value="highcourt">⚖️ High Court (Arial, Double Spacing, Wide Left Margin)</option>
                <option value="district">📜 District Court (Courier, Single Spacing)</option>
              </select>

              <div className="upload-zone">
                <input type="file" id="up3" accept=".docx" onChange={handleLayoutUpload} style={{display:'none'}} />
                <label htmlFor="up3">📝 Upload Raw Draft (.docx)</label>
              </div>

              <button onClick={generateFormattedDoc} className="action-btn download-btn">⬇️ Convert & Download</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;