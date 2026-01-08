# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCase*](#getcase)
  - [*ListCases*](#listcases)
- [**Mutations**](#mutations)
  - [*CreateCase*](#createcase)
  - [*UpdateCase*](#updatecase)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCase
You can execute the `GetCase` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCase(vars: GetCaseVariables): QueryPromise<GetCaseData, GetCaseVariables>;

interface GetCaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCaseVariables): QueryRef<GetCaseData, GetCaseVariables>;
}
export const getCaseRef: GetCaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCase(dc: DataConnect, vars: GetCaseVariables): QueryPromise<GetCaseData, GetCaseVariables>;

interface GetCaseRef {
  ...
  (dc: DataConnect, vars: GetCaseVariables): QueryRef<GetCaseData, GetCaseVariables>;
}
export const getCaseRef: GetCaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCaseRef:
```typescript
const name = getCaseRef.operationName;
console.log(name);
```

### Variables
The `GetCase` query requires an argument of type `GetCaseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCaseVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCase` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCaseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCase, GetCaseVariables } from '@dataconnect/generated';

// The `GetCase` query requires an argument of type `GetCaseVariables`:
const getCaseVars: GetCaseVariables = {
  id: ..., 
};

// Call the `getCase()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCase(getCaseVars);
// Variables can be defined inline as well.
const { data } = await getCase({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCase(dataConnect, getCaseVars);

console.log(data.case);

// Or, you can use the `Promise` API.
getCase(getCaseVars).then((response) => {
  const data = response.data;
  console.log(data.case);
});
```

### Using `GetCase`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCaseRef, GetCaseVariables } from '@dataconnect/generated';

// The `GetCase` query requires an argument of type `GetCaseVariables`:
const getCaseVars: GetCaseVariables = {
  id: ..., 
};

// Call the `getCaseRef()` function to get a reference to the query.
const ref = getCaseRef(getCaseVars);
// Variables can be defined inline as well.
const ref = getCaseRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCaseRef(dataConnect, getCaseVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.case);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.case);
});
```

## ListCases
You can execute the `ListCases` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCases(): QueryPromise<ListCasesData, undefined>;

interface ListCasesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCasesData, undefined>;
}
export const listCasesRef: ListCasesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCases(dc: DataConnect): QueryPromise<ListCasesData, undefined>;

interface ListCasesRef {
  ...
  (dc: DataConnect): QueryRef<ListCasesData, undefined>;
}
export const listCasesRef: ListCasesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCasesRef:
```typescript
const name = listCasesRef.operationName;
console.log(name);
```

### Variables
The `ListCases` query has no variables.
### Return Type
Recall that executing the `ListCases` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCasesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListCases`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCases } from '@dataconnect/generated';


// Call the `listCases()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCases();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCases(dataConnect);

console.log(data.cases);

// Or, you can use the `Promise` API.
listCases().then((response) => {
  const data = response.data;
  console.log(data.cases);
});
```

### Using `ListCases`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCasesRef } from '@dataconnect/generated';


// Call the `listCasesRef()` function to get a reference to the query.
const ref = listCasesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCasesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.cases);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.cases);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateCase
You can execute the `CreateCase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCase(vars: CreateCaseVariables): MutationPromise<CreateCaseData, CreateCaseVariables>;

interface CreateCaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCaseVariables): MutationRef<CreateCaseData, CreateCaseVariables>;
}
export const createCaseRef: CreateCaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCase(dc: DataConnect, vars: CreateCaseVariables): MutationPromise<CreateCaseData, CreateCaseVariables>;

interface CreateCaseRef {
  ...
  (dc: DataConnect, vars: CreateCaseVariables): MutationRef<CreateCaseData, CreateCaseVariables>;
}
export const createCaseRef: CreateCaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCaseRef:
```typescript
const name = createCaseRef.operationName;
console.log(name);
```

### Variables
The `CreateCase` mutation requires an argument of type `CreateCaseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCaseVariables {
  caseName: string;
  description: string;
  status: string;
}
```
### Return Type
Recall that executing the `CreateCase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCaseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCaseData {
  case_insert: Case_Key;
}
```
### Using `CreateCase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCase, CreateCaseVariables } from '@dataconnect/generated';

// The `CreateCase` mutation requires an argument of type `CreateCaseVariables`:
const createCaseVars: CreateCaseVariables = {
  caseName: ..., 
  description: ..., 
  status: ..., 
};

// Call the `createCase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCase(createCaseVars);
// Variables can be defined inline as well.
const { data } = await createCase({ caseName: ..., description: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCase(dataConnect, createCaseVars);

console.log(data.case_insert);

// Or, you can use the `Promise` API.
createCase(createCaseVars).then((response) => {
  const data = response.data;
  console.log(data.case_insert);
});
```

### Using `CreateCase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCaseRef, CreateCaseVariables } from '@dataconnect/generated';

// The `CreateCase` mutation requires an argument of type `CreateCaseVariables`:
const createCaseVars: CreateCaseVariables = {
  caseName: ..., 
  description: ..., 
  status: ..., 
};

// Call the `createCaseRef()` function to get a reference to the mutation.
const ref = createCaseRef(createCaseVars);
// Variables can be defined inline as well.
const ref = createCaseRef({ caseName: ..., description: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCaseRef(dataConnect, createCaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.case_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.case_insert);
});
```

## UpdateCase
You can execute the `UpdateCase` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCase(vars: UpdateCaseVariables): MutationPromise<UpdateCaseData, UpdateCaseVariables>;

interface UpdateCaseRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCaseVariables): MutationRef<UpdateCaseData, UpdateCaseVariables>;
}
export const updateCaseRef: UpdateCaseRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCase(dc: DataConnect, vars: UpdateCaseVariables): MutationPromise<UpdateCaseData, UpdateCaseVariables>;

interface UpdateCaseRef {
  ...
  (dc: DataConnect, vars: UpdateCaseVariables): MutationRef<UpdateCaseData, UpdateCaseVariables>;
}
export const updateCaseRef: UpdateCaseRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCaseRef:
```typescript
const name = updateCaseRef.operationName;
console.log(name);
```

### Variables
The `UpdateCase` mutation requires an argument of type `UpdateCaseVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCaseVariables {
  id: UUIDString;
  caseName?: string | null;
  description?: string | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateCase` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCaseData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCaseData {
  case_update?: Case_Key | null;
}
```
### Using `UpdateCase`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCase, UpdateCaseVariables } from '@dataconnect/generated';

// The `UpdateCase` mutation requires an argument of type `UpdateCaseVariables`:
const updateCaseVars: UpdateCaseVariables = {
  id: ..., 
  caseName: ..., // optional
  description: ..., // optional
  status: ..., // optional
};

// Call the `updateCase()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCase(updateCaseVars);
// Variables can be defined inline as well.
const { data } = await updateCase({ id: ..., caseName: ..., description: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCase(dataConnect, updateCaseVars);

console.log(data.case_update);

// Or, you can use the `Promise` API.
updateCase(updateCaseVars).then((response) => {
  const data = response.data;
  console.log(data.case_update);
});
```

### Using `UpdateCase`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCaseRef, UpdateCaseVariables } from '@dataconnect/generated';

// The `UpdateCase` mutation requires an argument of type `UpdateCaseVariables`:
const updateCaseVars: UpdateCaseVariables = {
  id: ..., 
  caseName: ..., // optional
  description: ..., // optional
  status: ..., // optional
};

// Call the `updateCaseRef()` function to get a reference to the mutation.
const ref = updateCaseRef(updateCaseVars);
// Variables can be defined inline as well.
const ref = updateCaseRef({ id: ..., caseName: ..., description: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCaseRef(dataConnect, updateCaseVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.case_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.case_update);
});
```

