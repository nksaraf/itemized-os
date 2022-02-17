use indradb::*;
use serde::{Deserialize, Serialize};
use std::result::Result as StdResult;

use wasm_bindgen::prelude::*;
#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub struct OS {
    store: MemoryDatastore,
    type_vertex: uuid::Uuid,
    system_vertex: uuid::Uuid,
}

#[derive(Serialize, Deserialize)]
pub struct Props {
    pub field1: std::collections::HashMap<u32, String>,
}

#[wasm_bindgen]
impl OS {
    pub fn new() -> Self {
        let store = MemoryDatastore::default();
        let vertex1 = &Vertex::new(indradb::Identifier::new("Type").expect("Root"));
        store
            .create_vertex(vertex1)
            .expect("Expected to be able to create a vertex");
        store
            .set_vertex_properties(
                VertexPropertyQuery::new(
                    SpecificVertexQuery::new(vec![vertex1.id]).into(),
                    indradb::Identifier::new("name")
                        .expect("Expected to be able to create a vertex"),
                ),
                serde_json::to_value("System").expect("Expected to be able to serialize a string"),
            )
            .expect("Expected to be able to set a vertex property");

        let vertex2 = &Vertex::new(indradb::Identifier::new("Type").expect("System"));
        store
            .create_vertex(vertex2)
            .expect("Expected to be able to create a vertex");

        store
            .create_edge(&EdgeKey::new(
                vertex1.id,
                indradb::Identifier::new("System").expect("System"),
                vertex2.id,
            ))
            .expect("Expected to be able to create an edge");
        store
            .set_vertex_properties(
                VertexPropertyQuery::new(
                    SpecificVertexQuery::new(vec![vertex2.id]).into(),
                    indradb::Identifier::new("name")
                        .expect("Expected to be able to create a vertex"),
                ),
                serde_json::to_value("Type").expect("Expected to be able to serialize a string"),
            )
            .expect("Expected to be able to set a vertex property");

        store
            .index_property(indradb::Identifier::new("name").expect("name"))
            .expect("Expected to be able to index a property");
        let os = OS {
            store: store,
            system_vertex: vertex1.id,
            type_vertex: vertex2.id,
        };

        return os;
    }

    pub fn add_vertex(&mut self) -> String {
        let vertex1 = &Vertex::new(indradb::Identifier::default());
        self.store
            .create_vertex(vertex1)
            .expect("Expected to be able to create a vertex");
        return vertex1.id.to_simple().to_string();
    }

    pub fn get_items(&self) -> Vec<JsValue> {
        return self
            .store
            .get_vertices(RangeVertexQuery::new().into())
            .expect("Expected to be able to get vertices")
            .into_iter()
            .map(|v| v.id.to_simple().to_string().into())
            .collect();
    }

    pub fn add_type(&mut self, name: String) -> String {
        let vertex1 = &Vertex::new(
            indradb::Identifier::new("Type").expect("Expected to be able to create a vertex"),
        );

        self.store
            .create_vertex(vertex1)
            .expect("Expected to be able to create a vertex");
        self.store
            .set_vertex_properties(
                VertexPropertyQuery::new(
                    SpecificVertexQuery::new(vec![vertex1.id]).into(),
                    indradb::Identifier::new("name")
                        .expect("Expected to be able to create a vertex"),
                ),
                serde_json::to_value(&name).expect("Expected to be able to serialize a string"),
            )
            .expect("Expected to be able to set a vertex property");
        self.store
            .create_edge(&EdgeKey {
                inbound_id: vertex1.id,
                t: indradb::Identifier::new("System")
                    .expect("Expected to be able to create a vertex"),
                outbound_id: self.type_vertex,
            })
            .expect("Expected to be able to create an edge");
        return vertex1.id.to_simple().to_string();
    }

    pub fn get_types(&mut self) -> Vec<JsValue> {
        return self
            .store
            .get_vertex_properties(VertexPropertyQuery::new(
                RangeVertexQuery::new()
                    .t(indradb::Identifier::new("Type")
                        .expect("Expected to be able to create a vertex"))
                    .into(),
                indradb::Identifier::new("name").expect("Expected to be able to create a vertex"),
            ))
            .expect("Expected to be able to set a vertex property")
            .into_iter()
            .map(|v| {
                serde_json::from_value::<String>(v.value)
                    .expect("Expected to be able to deserialize a string")
                    .into()
            })
            .collect();
    }

    pub fn get_item_types(&mut self, id: String) -> Vec<JsValue> {
        let uid = uuid::Uuid::parse_str(&id).expect("Expected to be able to parse UUID");
        if uid == self.system_vertex {
            return vec![JsValue::from("System")];
        }
        return self
            .store
            .get_vertex_properties(VertexPropertyQuery::new(
                PipeVertexQuery::new(
                    Box::new(
                        SpecificVertexQuery::new(vec![
                            uuid::Uuid::parse_str(&id).expect("Expected to be able to parse UUID")
                        ])
                        .inbound()
                        .into(),
                    ),
                    indradb::EdgeDirection::Outbound,
                )
                .into(),
                indradb::Identifier::new("name").expect("Expected to be able to create a vertex"),
            ))
            .expect("Expected to be able to set a vertex property")
            .into_iter()
            .map(|v| {
                serde_json::from_value::<String>(v.value)
                    .expect("Expected to be able to deserialize a string")
                    .into()
            })
            .collect();
    }

    pub fn add_item(&mut self, t: String) -> String {
        let vertex1 = &Vertex::new(
            indradb::Identifier::new("Item").expect("Expected to be able to create a vertex"),
        );

        web_sys::console::log_1(&JsValue::from_str(&t));

        let type_vertex = self
            .store
            .get_vertices(
                PropertyValueVertexQuery::new(
                    indradb::Identifier::new("name")
                        .expect("Expected to be able to create a vertex"),
                    serde_json::from_str::<String>(format!("\"{}\"", t).as_str())
                        .expect("Expected to be able to deserialize a string")
                        .into(),
                )
                .into(),
            )
            .expect("Expected to be able to get vertices")
            .into_iter()
            .map(|v| v.id)
            .next()
            .expect("Expected to be able to get a vertex");

        self.store
            .create_vertex(vertex1)
            .expect("Expected to be able to create a vertex");

        let edge = EdgeKey::new(type_vertex, indradb::Identifier::default(), vertex1.id);
        self.store
            .create_edge(&edge)
            .expect("Expected to be able to create a vertex");

        return vertex1.id.to_simple().to_string();
    }

    pub fn add_edge(&mut self, a: String, b: String) {
        let edge = EdgeKey::new(
            uuid::Uuid::parse_str(&a).expect("Expected to be able to parse UUID"),
            indradb::Identifier::default(),
            uuid::Uuid::parse_str(&b).expect("Expected to be able to parse UUID"),
        );
        self.store
            .create_edge(&edge)
            .expect("Expected to be able to create a vertex");
    }

    pub fn get_vertex_count(&mut self) -> u64 {
        return self
            .store
            .get_vertex_count()
            .expect("Expected to be able to get the vertex count");
    }

    pub fn get_edge_count(&mut self, a: String) -> u64 {
        return self
            .store
            .get_edge_count(
                uuid::Uuid::parse_str(&a).expect("Expected to be able to parse UUID"),
                None,
                indradb::EdgeDirection::Outbound,
            )
            .expect("Expected to be able to get the edge count");
    }

    pub fn get_properties(&mut self, id: String) -> JsValue {
        let mut ma = std::collections::HashMap::<&str, serde_json::Value>::new();
        let vertex = self
            .store
            .get_all_vertex_properties(
                SpecificVertexQuery::new(vec![
                    uuid::Uuid::parse_str(&id).expect("Expected to be able to parse UUID")
                ])
                .into(),
            )
            .expect("Expected to be able to set a vertex property")
            .into_iter()
            .next()
            .expect("Expected to be able to get a vertex");

        web_sys::console::log_2(
            &JsValue::from_str(vertex.vertex.id.to_simple().to_string().as_str()),
            &JsValue::from(vertex.props.len()),
        );

        for p in vertex.props.iter() {
            web_sys::console::log_1(&JsValue::from_str(p.name.as_str()));
            ma.insert(p.name.as_str(), p.value.clone());
        }

        return JsValue::from_serde(&ma).unwrap();

        // .into_iter()
        // .map(|v| {
        //     serde_json::from_value::<String>(
        //         v.props
        //             .into_iter()
        //             .filter(|p| {
        //                 p.name
        //                     == indradb::Identifier::new(&name)
        //                         .expect("Expected to be able to create a vertex")
        //                         .into_string()
        //             })
        //             .next()
        //             .expect("Expected to be able to get a property")
        //             .value,
        //     )
        //     .expect("Expected to be able to deserialize a string")
        //     .into()
        // })
        // .collect();
    }

    pub fn set_property(&mut self, id: String, name: String, value: String) {
        let uid = uuid::Uuid::parse_str(&id).expect("Expected to be able to parse UUID");
        web_sys::console::log_2(&JsValue::from_str(&value), &JsValue::from_str(&name));
        self.store
            .set_vertex_properties(
                VertexPropertyQuery::new(
                    SpecificVertexQuery::new(vec![
                        uuid::Uuid::parse_str(&id).expect("Expected to be able to parse UUID")
                    ])
                    .into(),
                    indradb::Identifier::new(name.clone())
                        .expect("Expected to be able to create a vertex"),
                ),
                serde_json::from_str::<String>(&value)
                    .expect("Expected to be able to deserialize a string")
                    .into(),
            )
            .expect("Expected to be able to set a vertex property");
    }

    pub fn get_references(&mut self, a: String) -> Vec<JsValue> {
        return self
            .store
            .get_edges(
                SpecificVertexQuery::new(vec![
                    uuid::Uuid::parse_str(&a).expect("Expected to be able to parse UUID")
                ])
                .outbound() // uuid::Uuid::parse_str(&a).expect("Expected to be able to parse UUID"),
                .into(),
            )
            .expect("Expected to be able to get the edge count")
            .into_iter()
            .map(|e| e.key.inbound_id.to_simple().to_string().into())
            .collect();
        // .(|e| e.key.inbound_id)
        // .collect();
    }
    pub fn get_referenced_by(&mut self, a: String) -> Vec<JsValue> {
        return self
            .store
            .get_edges(
                SpecificVertexQuery::new(vec![
                    uuid::Uuid::parse_str(&a).expect("Expected to be able to parse UUID")
                ])
                .inbound() // uuid::Uuid::parse_str(&a).expect("Expected to be able to parse UUID"),
                .into(),
            )
            .expect("Expected to be able to get the edge count")
            .into_iter()
            .map(|e| e.key.outbound_id.to_simple().to_string().into())
            .collect();
        // .(|e| e.key.inbound_id)
        // .collect();
    }
}
// // Called when the wasm module is instantiated
// #[wasm_bindgen(start)]
// pub fn wasm_main() -> StdResult<(), JsValue> {
//     init_panic_hook();
//     let store = MemoryDatastore::default();

//     // store.create_vertex_from_type(t: Identifier::new((): ));

//     let vertex1 = &Vertex::new(indradb::Identifier::default());
//     let vertex2 = &Vertex::new(indradb::Identifier::default());
//     store
//         .create_vertex(vertex1)
//         .expect("Expected to be able to create a vertex");
//     store
//         .create_vertex(vertex2)
//         .expect("Expected to be able to create a vertex");

//     store
//         .create_edge(&EdgeKey::new(
//             vertex1.id,
//             indradb::Identifier::default(),
//             vertex2.id,
//         ))
//         .expect("Expected to be able to create a vertex");

//     let vertex_count = store
//         .get_vertex_count()
//         .expect("Expected to be able to get the vertex count");

//     // Use `web_sys`'s global `window` function to get a handle on the global
//     // window object.
//     // let window = web_sys::window().expect("no global `window` exists");
//     // let document = window.document().expect("should have a document on window");
//     // let body = document.body().expect("document should have a body");
//     web_sys::console::log_2(&"Hello using web-sys".into(), &vertex_count.into());

//     // Manufacture the element we're gonna append
//     // let val = document.create_element("p")?;
//     // val.set_inner_html("Hello from Rust!");

//     // body.append_child(&val)?;

//     Ok(())
// }

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

pub fn main() {

}

// pub fn main() -> wry::Result<()> {
//     use wry::{
//         application::{
//             event::{Event, StartCause, WindowEvent},
//             event_loop::{ControlFlow, EventLoop},
//             window::WindowBuilder,
//         },
//         webview::WebViewBuilder,
//     };
//     let event_loop = EventLoop::new();
//     let window = WindowBuilder::new()
//         .with_title("Hello World")
//         .build(&event_loop)?;
//     let _webview = WebViewBuilder::new(window)?
//         .with_url("https://tauri.studio")?
//         .build()?;
//     event_loop.run(move |event, _, control_flow| {
//         *control_flow = ControlFlow::Wait;

//         match event {
//             Event::NewEvents(StartCause::Init) => println!("Wry has started!"),
//             Event::WindowEvent {
//                 event: WindowEvent::CloseRequested,
//                 ..
//             } => *control_flow = ControlFlow::Exit,
//             _ => (),
//         }
//     });
// }
