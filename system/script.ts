import init, { OS } from "./db/pkg/indradb.js";

await init();

let os = OS.new();

let v1 = os.add_vertex();
let t1 = os.add_type("Type");
let t2 = os.add_type("Book");
let t3 = os.add_type("Movie");
let t4 = os.add_type("Title");
console.log(os.get_vertex_count());
let v2 = os.add_vertex();
console.log(v1, v2);
console.log(os.add_edge(t2, v1));

console.log(os.get_vertex_count());

console.log(os.get_edge_count(v1));
// console.log(os.add_edge(v1, v2));
console.log(os.get_types());
console.log(os.get_item_types(v1));

console.log(os.get_vertex_count());
console.log(os.get_edge_count(v1));
console.log(os.get_references(v1));
