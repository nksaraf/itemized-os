/* tslint:disable */
/* eslint-disable */
/**
*/
export function init_panic_hook(): void;
/**
*/
export function main(): void;
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a: number, b: number): number;
/**
*/
export class OS {
  free(): void;
/**
* @returns {OS}
*/
  static new(): OS;
/**
* @returns {string}
*/
  add_vertex(): string;
/**
* @returns {any[]}
*/
  get_items(): any[];
/**
* @param {string} name
* @returns {string}
*/
  add_type(name: string): string;
/**
* @returns {any[]}
*/
  get_types(): any[];
/**
* @param {string} id
* @returns {any[]}
*/
  get_item_types(id: string): any[];
/**
* @param {string} t
* @returns {string}
*/
  add_item(t: string): string;
/**
* @param {string} a
* @param {string} b
*/
  add_edge(a: string, b: string): void;
/**
* @returns {BigInt}
*/
  get_vertex_count(): BigInt;
/**
* @param {string} a
* @returns {BigInt}
*/
  get_edge_count(a: string): BigInt;
/**
* @param {string} id
* @returns {any}
*/
  get_properties(id: string): any;
/**
* @param {string} id
* @param {string} name
* @param {string} value
*/
  set_property(id: string, name: string, value: string): void;
/**
* @param {string} a
* @returns {any[]}
*/
  get_references(a: string): any[];
/**
* @param {string} a
* @returns {any[]}
*/
  get_referenced_by(a: string): any[];
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly init_panic_hook: () => void;
  readonly __wbg_os_free: (a: number) => void;
  readonly os_new: () => number;
  readonly os_add_vertex: (a: number, b: number) => void;
  readonly os_get_items: (a: number, b: number) => void;
  readonly os_add_type: (a: number, b: number, c: number, d: number) => void;
  readonly os_get_types: (a: number, b: number) => void;
  readonly os_get_item_types: (a: number, b: number, c: number, d: number) => void;
  readonly os_add_item: (a: number, b: number, c: number, d: number) => void;
  readonly os_add_edge: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly os_get_vertex_count: (a: number, b: number) => void;
  readonly os_get_edge_count: (a: number, b: number, c: number, d: number) => void;
  readonly os_get_properties: (a: number, b: number, c: number) => number;
  readonly os_set_property: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
  readonly os_get_references: (a: number, b: number, c: number, d: number) => void;
  readonly os_get_referenced_by: (a: number, b: number, c: number, d: number) => void;
  readonly main: () => void;
  readonly add: (a: number, b: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
