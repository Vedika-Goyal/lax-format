import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'lex-format',
  location: 'us-east4'
};

export const createCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCase', inputVars);
}
createCaseRef.operationName = 'CreateCase';

export function createCase(dcOrVars, vars) {
  return executeMutation(createCaseRef(dcOrVars, vars));
}

export const getCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCase', inputVars);
}
getCaseRef.operationName = 'GetCase';

export function getCase(dcOrVars, vars) {
  return executeQuery(getCaseRef(dcOrVars, vars));
}

export const updateCaseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCase', inputVars);
}
updateCaseRef.operationName = 'UpdateCase';

export function updateCase(dcOrVars, vars) {
  return executeMutation(updateCaseRef(dcOrVars, vars));
}

export const listCasesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCases');
}
listCasesRef.operationName = 'ListCases';

export function listCases(dc) {
  return executeQuery(listCasesRef(dc));
}

