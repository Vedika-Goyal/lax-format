const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'lex-format',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCase', inputVars);
}
createCaseRef.operationName = 'CreateCase';
exports.createCaseRef = createCaseRef;

exports.createCase = function createCase(dcOrVars, vars) {
  return executeMutation(createCaseRef(dcOrVars, vars));
};

const getCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCase', inputVars);
}
getCaseRef.operationName = 'GetCase';
exports.getCaseRef = getCaseRef;

exports.getCase = function getCase(dcOrVars, vars) {
  return executeQuery(getCaseRef(dcOrVars, vars));
};

const updateCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCase', inputVars);
}
updateCaseRef.operationName = 'UpdateCase';
exports.updateCaseRef = updateCaseRef;

exports.updateCase = function updateCase(dcOrVars, vars) {
  return executeMutation(updateCaseRef(dcOrVars, vars));
};

const listCasesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCases');
}
listCasesRef.operationName = 'ListCases';
exports.listCasesRef = listCasesRef;

exports.listCases = function listCases(dc) {
  return executeQuery(listCasesRef(dc));
};
