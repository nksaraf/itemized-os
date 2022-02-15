/* eslint-disable */

import { ValueTypes, GraphQLTypes, InputType, Chain, OperationOptions, chainOptions } from './index';
import { useQuery } from 'react-query';
import type { UseQueryOptions } from 'react-query';


export function useTypedQuery<O extends "Query", TData extends ValueTypes[O], TResult = InputType<GraphQLTypes[O], TData>>(
  queryKey: string | unknown[],
  query: TData | ValueTypes[O],
  options?: Omit<UseQueryOptions<TResult>, 'queryKey' | 'queryFn'>,
  zeusOptions?: OperationOptions,
  host = "",
  hostOptions: chainOptions[1] = {},
) {
  return useQuery<TResult>(queryKey, () => Chain(host, hostOptions)("query")(query, zeusOptions) as Promise<TResult>, options);
}
