/* eslint-disable */

import { AllTypesProps, ReturnTypes } from './const';
type ZEUS_INTERFACES = GraphQLTypes["Item"]
type ZEUS_UNIONS = never

export type ValueTypes = {
    ["Item"]:AliasType<{
		id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean;
		['...on Type']?: Omit<ValueTypes["Type"],keyof ValueTypes["Item"]>;
		['...on Text']?: Omit<ValueTypes["Text"],keyof ValueTypes["Item"]>;
		['...on Date']?: Omit<ValueTypes["Date"],keyof ValueTypes["Item"]>;
		['...on Title']?: Omit<ValueTypes["Title"],keyof ValueTypes["Item"]>;
		['...on Topic']?: Omit<ValueTypes["Topic"],keyof ValueTypes["Item"]>;
		['...on Task']?: Omit<ValueTypes["Task"],keyof ValueTypes["Item"]>;
		['...on List']?: Omit<ValueTypes["List"],keyof ValueTypes["Item"]>;
		['...on Webpage']?: Omit<ValueTypes["Webpage"],keyof ValueTypes["Item"]>;
		['...on Note']?: Omit<ValueTypes["Note"],keyof ValueTypes["Item"]>;
		['...on Status']?: Omit<ValueTypes["Status"],keyof ValueTypes["Item"]>;
		['...on Book']?: Omit<ValueTypes["Book"],keyof ValueTypes["Item"]>;
		['...on Movie']?: Omit<ValueTypes["Movie"],keyof ValueTypes["Item"]>;
		__typename?: boolean
}>;
	["References"]: AliasType<{
	references?:ValueTypes["Reference"],
	pageInfo?:ValueTypes["PageInfo"],
		__typename?: boolean
}>;
	["PageInfo"]: AliasType<{
	hasNextPage?:boolean,
		__typename?: boolean
}>;
	["Reference"]: AliasType<{
	cursor?:boolean,
	item?:ValueTypes["Item"],
		__typename?: boolean
}>;
	["Query"]: AliasType<{
item?: [{	id:string},ValueTypes["Item"]],
items?: [{	type:ValueTypes["ItemType"],	first?:number | null,	after?:string | null},ValueTypes["References"]],
		__typename?: boolean
}>;
	["Type"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
	value?:boolean,
		__typename?: boolean
}>;
	["Text"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
	value?:boolean,
		__typename?: boolean
}>;
	["Date"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Title"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Topic"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Task"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["List"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Webpage"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Note"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Status"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Book"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["Movie"]: AliasType<{
	id?:boolean,
renferencedItems?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
referencedBy?: [{	type?:ValueTypes["ItemType"] | null,	first?:number | null,	after?:string | null},ValueTypes["References"]],
	types?:boolean,
	metadata?:boolean,
		__typename?: boolean
}>;
	["ItemType"]:ItemType
  }

export type ModelTypes = {
    ["Item"]: ModelTypes["Type"] | ModelTypes["Text"] | ModelTypes["Date"] | ModelTypes["Title"] | ModelTypes["Topic"] | ModelTypes["Task"] | ModelTypes["List"] | ModelTypes["Webpage"] | ModelTypes["Note"] | ModelTypes["Status"] | ModelTypes["Book"] | ModelTypes["Movie"];
	["References"]: {
		references:ModelTypes["Reference"][],
	pageInfo:ModelTypes["PageInfo"]
};
	["PageInfo"]: {
		hasNextPage:boolean
};
	["Reference"]: {
		cursor:string,
	item:ModelTypes["Item"]
};
	["Query"]: {
		item?:ModelTypes["Item"],
	items:ModelTypes["References"]
};
	["Type"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string,
	value?:string
};
	["Text"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string,
	value?:string
};
	["Date"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Title"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Topic"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Task"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["List"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Webpage"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Note"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Status"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Book"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["Movie"]: {
		id:string,
	renferencedItems:ModelTypes["References"],
	referencedBy:ModelTypes["References"],
	types?:ModelTypes["ItemType"][],
	metadata?:string
};
	["ItemType"]: GraphQLTypes["ItemType"]
    }

export type GraphQLTypes = {
    ["Item"]: {
	__typename:"Type" | "Text" | "Date" | "Title" | "Topic" | "Task" | "List" | "Webpage" | "Note" | "Status" | "Book" | "Movie",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
	['...on Type']: '__union' & GraphQLTypes["Type"];
	['...on Text']: '__union' & GraphQLTypes["Text"];
	['...on Date']: '__union' & GraphQLTypes["Date"];
	['...on Title']: '__union' & GraphQLTypes["Title"];
	['...on Topic']: '__union' & GraphQLTypes["Topic"];
	['...on Task']: '__union' & GraphQLTypes["Task"];
	['...on List']: '__union' & GraphQLTypes["List"];
	['...on Webpage']: '__union' & GraphQLTypes["Webpage"];
	['...on Note']: '__union' & GraphQLTypes["Note"];
	['...on Status']: '__union' & GraphQLTypes["Status"];
	['...on Book']: '__union' & GraphQLTypes["Book"];
	['...on Movie']: '__union' & GraphQLTypes["Movie"];
};
	["References"]: {
	__typename: "References",
	references: Array<GraphQLTypes["Reference"]>,
	pageInfo: GraphQLTypes["PageInfo"]
};
	["PageInfo"]: {
	__typename: "PageInfo",
	hasNextPage: boolean
};
	["Reference"]: {
	__typename: "Reference",
	cursor: string,
	item: GraphQLTypes["Item"]
};
	["Query"]: {
	__typename: "Query",
	item?: GraphQLTypes["Item"],
	items: GraphQLTypes["References"]
};
	["Type"]: {
	__typename: "Type",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string,
	value?: string
};
	["Text"]: {
	__typename: "Text",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string,
	value?: string
};
	["Date"]: {
	__typename: "Date",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Title"]: {
	__typename: "Title",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Topic"]: {
	__typename: "Topic",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Task"]: {
	__typename: "Task",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["List"]: {
	__typename: "List",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Webpage"]: {
	__typename: "Webpage",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Note"]: {
	__typename: "Note",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Status"]: {
	__typename: "Status",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Book"]: {
	__typename: "Book",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["Movie"]: {
	__typename: "Movie",
	id: string,
	renferencedItems: GraphQLTypes["References"],
	referencedBy: GraphQLTypes["References"],
	types?: Array<GraphQLTypes["ItemType"]>,
	metadata?: string
};
	["ItemType"]: ItemType
    }
export const enum ItemType {
	Type = "Type",
	Text = "Text",
	Date = "Date",
	Title = "Title",
	Topic = "Topic",
	Task = "Task",
	List = "List",
	Webpage = "Webpage",
	Note = "Note",
	Status = "Status",
	Book = "Book",
	Movie = "Movie"
}
export class GraphQLError extends Error {
    constructor(public response: GraphQLResponse) {
      super("");
      console.error(response);
    }
    toString() {
      return "GraphQL Response Error";
    }
  }


export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
export type ZeusState<T extends (...args: any[]) => Promise<any>> = NonNullable<
  UnwrapPromise<ReturnType<T>>
>;
export type ZeusHook<
  T extends (
    ...args: any[]
  ) => Record<string, (...args: any[]) => Promise<any>>,
  N extends keyof ReturnType<T>
> = ZeusState<ReturnType<T>[N]>;

type WithTypeNameValue<T> = T & {
  __typename?: boolean;
};
type AliasType<T> = WithTypeNameValue<T> & {
  __alias?: Record<string, WithTypeNameValue<T>>;
};
export interface GraphQLResponse {
  data?: Record<string, any>;
  errors?: Array<{
    message: string;
  }>;
}
type DeepAnify<T> = {
  [P in keyof T]?: any;
};
type IsPayLoad<T> = T extends [any, infer PayLoad] ? PayLoad : T;
type IsArray<T, U> = T extends Array<infer R> ? InputType<R, U>[] : InputType<T, U>;
type FlattenArray<T> = T extends Array<infer R> ? R : T;

type IsInterfaced<SRC extends DeepAnify<DST>, DST> = FlattenArray<SRC> extends ZEUS_INTERFACES | ZEUS_UNIONS
  ? {
      [P in keyof SRC]: SRC[P] extends '__union' & infer R
        ? P extends keyof DST
          ? IsArray<R, '__typename' extends keyof DST ? DST[P] & { __typename: true } : DST[P]>
          : {}
        : never;
    }[keyof DST] &
      {
        [P in keyof Omit<
          Pick<
            SRC,
            {
              [P in keyof DST]: SRC[P] extends '__union' & infer R ? never : P;
            }[keyof DST]
          >,
          '__typename'
        >]: IsPayLoad<DST[P]> extends boolean ? SRC[P] : IsArray<SRC[P], DST[P]>;
      }
  : {
      [P in keyof Pick<SRC, keyof DST>]: IsPayLoad<DST[P]> extends boolean ? SRC[P] : IsArray<SRC[P], DST[P]>;
    };

export type MapType<SRC, DST> = SRC extends DeepAnify<DST> ? IsInterfaced<SRC, DST> : never;
export type InputType<SRC, DST> = IsPayLoad<DST> extends { __alias: infer R }
  ? {
      [P in keyof R]: MapType<SRC, R[P]>;
    } &
      MapType<SRC, Omit<IsPayLoad<DST>, '__alias'>>
  : MapType<SRC, IsPayLoad<DST>>;
type Func<P extends any[], R> = (...args: P) => R;
type AnyFunc = Func<any, any>;
export type ArgsType<F extends AnyFunc> = F extends Func<infer P, any> ? P : never;
export type OperationOptions = {
  variables?: Record<string, any>;
  operationName?: string;
};
export type SubscriptionToGraphQL<Z, T> = {
  ws: WebSocket;
  on: (fn: (args: InputType<T, Z>) => void) => void;
  off: (fn: (e: { data?: InputType<T, Z>; code?: number; reason?: string; message?: string }) => void) => void;
  error: (fn: (e: { data?: InputType<T, Z>; errors?: string[] }) => void) => void;
  open: () => void;
};
export type SelectionFunction<V> = <T>(t: T | V) => T;
export type fetchOptions = ArgsType<typeof fetch>;
type websocketOptions = typeof WebSocket extends new (
  ...args: infer R
) => WebSocket
  ? R
  : never;
export type chainOptions =
  | [fetchOptions[0], fetchOptions[1] & {websocket?: websocketOptions}]
  | [fetchOptions[0]];
export type FetchFunction = (
  query: string,
  variables?: Record<string, any>,
) => Promise<any>;
export type SubscriptionFunction = (query: string) => any;
type NotUndefined<T> = T extends undefined ? never : T;
export type ResolverType<F> = NotUndefined<F extends [infer ARGS, any] ? ARGS : undefined>;



export const ZeusSelect = <T>() => ((t: any) => t) as SelectionFunction<T>;

export const ScalarResolver = (scalar: string, value: any) => {
  switch (scalar) {
    case 'String':
      return  `${JSON.stringify(value)}`;
    case 'Int':
      return `${value}`;
    case 'Float':
      return `${value}`;
    case 'Boolean':
      return `${value}`;
    case 'ID':
      return `"${value}"`;
    case 'enum':
      return `${value}`;
    case 'scalar':
      return `${value}`;
    default:
      return false;
  }
};


export const TypesPropsResolver = ({
    value,
    type,
    name,
    key,
    blockArrays
}: {
    value: any;
    type: string;
    name: string;
    key?: string;
    blockArrays?: boolean;
}): string => {
    if (value === null) {
        return `null`;
    }
    let resolvedValue = AllTypesProps[type][name];
    if (key) {
        resolvedValue = resolvedValue[key];
    }
    if (!resolvedValue) {
        throw new Error(`Cannot resolve ${type} ${name}${key ? ` ${key}` : ''}`)
    }
    const typeResolved = resolvedValue.type;
    const isArray = resolvedValue.array;
    const isArrayRequired = resolvedValue.arrayRequired;
    if (typeof value === 'string' && value.startsWith(`ZEUS_VAR$`)) {
        const isRequired = resolvedValue.required ? '!' : '';
        let t = `${typeResolved}`;
        if (isArray) {
          if (isRequired) {
              t = `${t}!`;
          }
          t = `[${t}]`;
          if(isArrayRequired){
            t = `${t}!`;
          }
        }else{
          if (isRequired) {
                t = `${t}!`;
          }
        }
        return `\$${value.split(`ZEUS_VAR$`)[1]}__ZEUS_VAR__${t}`;
    }
    if (isArray && !blockArrays) {
        return `[${value
        .map((v: any) => TypesPropsResolver({ value: v, type, name, key, blockArrays: true }))
        .join(',')}]`;
    }
    const reslovedScalar = ScalarResolver(typeResolved, value);
    if (!reslovedScalar) {
        const resolvedType = AllTypesProps[typeResolved];
        if (typeof resolvedType === 'object') {
        const argsKeys = Object.keys(resolvedType);
        return `{${argsKeys
            .filter((ak) => value[ak] !== undefined)
            .map(
            (ak) => `${ak}:${TypesPropsResolver({ value: value[ak], type: typeResolved, name: ak })}`
            )}}`;
        }
        return ScalarResolver(AllTypesProps[typeResolved], value) as string;
    }
    return reslovedScalar;
};


const isArrayFunction = (
  parent: string[],
  a: any[]
) => {
  const [values, r] = a;
  const [mainKey, key, ...keys] = parent;
  const keyValues = Object.keys(values).filter((k) => typeof values[k] !== 'undefined');

  if (!keys.length) {
      return keyValues.length > 0
        ? `(${keyValues
            .map(
              (v) =>
                `${v}:${TypesPropsResolver({
                  value: values[v],
                  type: mainKey,
                  name: key,
                  key: v
                })}`
            )
            .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
        : traverseToSeekArrays(parent, r);
    }

  const [typeResolverKey] = keys.splice(keys.length - 1, 1);
  let valueToResolve = ReturnTypes[mainKey][key];
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k];
  }

  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r);
  return argumentString;
};


const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;


const objectToTree = (o: { [x: string]: boolean | string }): string =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`).join(' ')}}`;


const traverseToSeekArrays = (parent: string[], a?: any): string => {
  if (!a) return '';
  if (Object.keys(a).length === 0) {
    return '';
  }
  let b: Record<string, any> = {};
  if (Array.isArray(a)) {
    return isArrayFunction([...parent], a);
  } else {
    if (typeof a === 'object') {
      Object.keys(a)
        .filter((k) => typeof a[k] !== 'undefined')
        .forEach((k) => {
        if (k === '__alias') {
          Object.keys(a[k]).forEach((aliasKey) => {
            const aliasOperations = a[k][aliasKey];
            const aliasOperationName = Object.keys(aliasOperations)[0];
            const aliasOperation = aliasOperations[aliasOperationName];
            b[
              `${aliasOperationName}__alias__${aliasKey}: ${aliasOperationName}`
            ] = traverseToSeekArrays([...parent, aliasOperationName], aliasOperation);
          });
        } else {
          b[k] = traverseToSeekArrays([...parent, k], a[k]);
        }
      });
    } else {
      return '';
    }
  }
  return objectToTree(b);
};  


const buildQuery = (type: string, a?: Record<any, any>) => 
  traverseToSeekArrays([type], a);


const inspectVariables = (query: string) => {
  const regex = /\$\b\w*__ZEUS_VAR__\[?[^!^\]^\s^,^\)^\}]*[!]?[\]]?[!]?/g;
  let result;
  const AllVariables: string[] = [];
  while ((result = regex.exec(query))) {
    if (AllVariables.includes(result[0])) {
      continue;
    }
    AllVariables.push(result[0]);
  }
  if (!AllVariables.length) {
    return query;
  }
  let filteredQuery = query;
  AllVariables.forEach((variable) => {
    while (filteredQuery.includes(variable)) {
      filteredQuery = filteredQuery.replace(variable, variable.split('__ZEUS_VAR__')[0]);
    }
  });
  return `(${AllVariables.map((a) => a.split('__ZEUS_VAR__'))
    .map(([variableName, variableType]) => `${variableName}:${variableType}`)
    .join(', ')})${filteredQuery}`;
};


export const queryConstruct = (t: 'query' | 'mutation' | 'subscription', tName: string, operationName?: string) => (o: Record<any, any>) =>
  `${t.toLowerCase()}${operationName ? ' ' + operationName : ''}${inspectVariables(buildQuery(tName, o))}`;
  

export const fullChainConstruct = (fn: FetchFunction) => (t: 'query' | 'mutation' | 'subscription', tName: string) => (
  o: Record<any, any>,
  options?: OperationOptions,
) => fn(queryConstruct(t, tName, options?.operationName)(o), options?.variables).then((r:any) => { 
  seekForAliases(r)
  return r
});


export const fullSubscriptionConstruct = (fn: SubscriptionFunction) => (
  t: 'query' | 'mutation' | 'subscription',
  tName: string,
) => (o: Record<any, any>, options?: OperationOptions) =>
  fn(queryConstruct(t, tName, options?.operationName)(o));


const seekForAliases = (response: any) => {
  const traverseAlias = (value: any) => {
    if (Array.isArray(value)) {
      value.forEach(seekForAliases);
    } else {
      if (typeof value === 'object') {
        seekForAliases(value);
      }
    }
  };
  if (typeof response === 'object' && response) {
    const keys = Object.keys(response);
    if (keys.length < 1) {
      return;
    }
    keys.forEach((k) => {
      const value = response[k];
      if (k.indexOf('__alias__') !== -1) {
        const [operation, alias] = k.split('__alias__');
        response[alias] = {
          [operation]: value,
        };
        delete response[k];
      }
      traverseAlias(value);
    });
  }
};


export const $ = (t: TemplateStringsArray): any => `ZEUS_VAR$${t.join('')}`;


export const resolverFor = <
  X,
  T extends keyof ValueTypes,
  Z extends keyof ValueTypes[T],
>(
  type: T,
  field: Z,
  fn: (
    args: Required<ValueTypes[T]>[Z] extends [infer Input, any] ? Input : any,
    source: any,
  ) => Z extends keyof ModelTypes[T] ? ModelTypes[T][Z] | Promise<ModelTypes[T][Z]> | X : any,
) => fn as (args?: any,source?: any) => any;


const handleFetchResponse = (
  response: Parameters<Extract<Parameters<ReturnType<typeof fetch>['then']>[0], Function>>[0]
): Promise<GraphQLResponse> => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response.text().then(text => {
        try { reject(JSON.parse(text)); }
        catch (err) { reject(text); }
      }).catch(reject);
    });
  }
  return response.json();
};

export const apiFetch = (options: fetchOptions) => (query: string, variables: Record<string, any> = {}) => {
    let fetchFunction = fetch;
    let queryString = query;
    let fetchOptions = options[1] || {};
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      queryString = encodeURIComponent(query);
      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response: GraphQLResponse) => {
          if (response.errors) {
            throw new GraphQLError(response);
          }
          return response.data;
        });
    }
    return fetchFunction(`${options[0]}`, {
      body: JSON.stringify({ query: queryString, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      ...fetchOptions
    })
      .then(handleFetchResponse)
      .then((response: GraphQLResponse) => {
        if (response.errors) {
          throw new GraphQLError(response);
        }
        return response.data;
      });
  };
  

export const apiSubscription = (options: chainOptions) => (
    query: string,
  ) => {
    try {
      const queryString = options[0] + '?query=' + encodeURIComponent(query);
      const wsString = queryString.replace('http', 'ws');
      const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString;
      const webSocketOptions = options[1]?.websocket || [host];
      const ws = new WebSocket(...webSocketOptions);
      return {
        ws,
        on: (e: (args: any) => void) => {
          ws.onmessage = (event:any) => {
            if(event.data){
              const parsed = JSON.parse(event.data)
              const data = parsed.data
              if (data) {
                seekForAliases(data);
              }
              return e(data);
            }
          };
        },
        off: (e: (args: any) => void) => {
          ws.onclose = e;
        },
        error: (e: (args: any) => void) => {
          ws.onerror = e;
        },
        open: (e: () => void) => {
          ws.onopen = e;
        },
      };
    } catch {
      throw new Error('No websockets implemented');
    }
  };



const allOperations = {
    "query": "Query"
}

export type GenericOperation<O> = O extends 'query'
  ? "Query"
  : O extends 'mutation'
  ? never
  : never

export const Thunder = (fn: FetchFunction) => <
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(o: Z | ValueTypes[R], ops?: OperationOptions) =>
  fullChainConstruct(fn)(operation, allOperations[operation])(o as any, ops) as Promise<InputType<GraphQLTypes[R], Z>>;

export const Chain = (...options: chainOptions) => Thunder(apiFetch(options));  
  
export const SubscriptionThunder = (fn: SubscriptionFunction) => <
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
) => <Z extends ValueTypes[R]>(
  o: Z | ValueTypes[R],
  ops?: OperationOptions
)=>
  fullSubscriptionConstruct(fn)(operation, allOperations[operation])(
    o as any,
    ops,
  ) as SubscriptionToGraphQL<Z, GraphQLTypes[R]>;

export const Subscription = (...options: chainOptions) => SubscriptionThunder(apiSubscription(options));
export const Zeus = <
  Z extends ValueTypes[R],
  O extends 'query',
  R extends keyof ValueTypes = GenericOperation<O>
>(
  operation: O,
  o: Z | ValueTypes[R],
  operationName?: string,
) => queryConstruct(operation, allOperations[operation], operationName)(o as any);
export const Selector = <T extends keyof ValueTypes>(key: T) => ZeusSelect<ValueTypes[T]>();
  