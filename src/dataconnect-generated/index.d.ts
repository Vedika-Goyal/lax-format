import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CaseClient_Key {
  caseId: UUIDString;
  clientId: UUIDString;
  __typename?: 'CaseClient_Key';
}

export interface CaseDate_Key {
  id: UUIDString;
  __typename?: 'CaseDate_Key';
}

export interface Case_Key {
  id: UUIDString;
  __typename?: 'Case_Key';
}

export interface Client_Key {
  id: UUIDString;
  __typename?: 'Client_Key';
}

export interface CreateCaseData {
  case_insert: Case_Key;
}

export interface CreateCaseVariables {
  caseName: string;
  description: string;
  status: string;
}

export interface Document_Key {
  id: UUIDString;
  __typename?: 'Document_Key';
}

export interface GetCaseData {
  case?: {
    id: UUIDString;
    caseName: string;
    description?: string | null;
    status: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    userId: UUIDString;
  } & Case_Key;
}

export interface GetCaseVariables {
  id: UUIDString;
}

export interface ListCasesData {
  cases: ({
    id: UUIDString;
    caseName: string;
    description?: string | null;
    status: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    userId: UUIDString;
  } & Case_Key)[];
}

export interface UpdateCaseData {
  case_update?: Case_Key | null;
}

export interface UpdateCaseVariables {
  id: UUIDString;
  caseName?: string | null;
  description?: string | null;
  status?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateCaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCaseVariables): MutationRef<CreateCaseData, CreateCaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCaseVariables): MutationRef<CreateCaseData, CreateCaseVariables>;
  operationName: string;
}
export const createCaseRef: CreateCaseRef;

export function createCase(vars: CreateCaseVariables): MutationPromise<CreateCaseData, CreateCaseVariables>;
export function createCase(dc: DataConnect, vars: CreateCaseVariables): MutationPromise<CreateCaseData, CreateCaseVariables>;

interface GetCaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCaseVariables): QueryRef<GetCaseData, GetCaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCaseVariables): QueryRef<GetCaseData, GetCaseVariables>;
  operationName: string;
}
export const getCaseRef: GetCaseRef;

export function getCase(vars: GetCaseVariables): QueryPromise<GetCaseData, GetCaseVariables>;
export function getCase(dc: DataConnect, vars: GetCaseVariables): QueryPromise<GetCaseData, GetCaseVariables>;

interface UpdateCaseRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCaseVariables): MutationRef<UpdateCaseData, UpdateCaseVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCaseVariables): MutationRef<UpdateCaseData, UpdateCaseVariables>;
  operationName: string;
}
export const updateCaseRef: UpdateCaseRef;

export function updateCase(vars: UpdateCaseVariables): MutationPromise<UpdateCaseData, UpdateCaseVariables>;
export function updateCase(dc: DataConnect, vars: UpdateCaseVariables): MutationPromise<UpdateCaseData, UpdateCaseVariables>;

interface ListCasesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCasesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCasesData, undefined>;
  operationName: string;
}
export const listCasesRef: ListCasesRef;

export function listCases(): QueryPromise<ListCasesData, undefined>;
export function listCases(dc: DataConnect): QueryPromise<ListCasesData, undefined>;

