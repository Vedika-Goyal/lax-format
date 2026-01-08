import { CreateCaseData, CreateCaseVariables, GetCaseData, GetCaseVariables, UpdateCaseData, UpdateCaseVariables, ListCasesData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateCase(options?: useDataConnectMutationOptions<CreateCaseData, FirebaseError, CreateCaseVariables>): UseDataConnectMutationResult<CreateCaseData, CreateCaseVariables>;
export function useCreateCase(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCaseData, FirebaseError, CreateCaseVariables>): UseDataConnectMutationResult<CreateCaseData, CreateCaseVariables>;

export function useGetCase(vars: GetCaseVariables, options?: useDataConnectQueryOptions<GetCaseData>): UseDataConnectQueryResult<GetCaseData, GetCaseVariables>;
export function useGetCase(dc: DataConnect, vars: GetCaseVariables, options?: useDataConnectQueryOptions<GetCaseData>): UseDataConnectQueryResult<GetCaseData, GetCaseVariables>;

export function useUpdateCase(options?: useDataConnectMutationOptions<UpdateCaseData, FirebaseError, UpdateCaseVariables>): UseDataConnectMutationResult<UpdateCaseData, UpdateCaseVariables>;
export function useUpdateCase(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCaseData, FirebaseError, UpdateCaseVariables>): UseDataConnectMutationResult<UpdateCaseData, UpdateCaseVariables>;

export function useListCases(options?: useDataConnectQueryOptions<ListCasesData>): UseDataConnectQueryResult<ListCasesData, undefined>;
export function useListCases(dc: DataConnect, options?: useDataConnectQueryOptions<ListCasesData>): UseDataConnectQueryResult<ListCasesData, undefined>;
