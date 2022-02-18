import { createClient } from "https://esm.sh/@supabase/supabase-js";

// Get the connection string from the environment variable "DATABASE_URL"
// const databaseUrl = Deno.env.get("DATABASE_URL")!;
// const pool = new postgres.Pool(`postgres://postgres:8f187cbf0264f6d480127cfe36bc0828f966a157637fc9f0@alexandria-db.internal:5432/postgres`, 3, true);

const supabaseUrl = "https://qksyrtriwpguwrkxyekd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDc3NjQ4NSwiZXhwIjoxOTU2MzUyNDg1fQ.anrvkkFNQwp_Fao1DvQnaD56yJ1ucFNrAt3Q4Iw3jqQ";
const supabase = createClient(supabaseUrl, supabaseKey, {
  fetch,
});

/**
 */
interface OS {
  free(): void;

  /**
   * @returns {string}
   */
  add_vertex(): Promise<string>;
  /**
   * @returns {any[]}
   */
  get_items(): Promise<any>[];
  /**
   * @param {string} name
   * @returns {string}
   */
  add_type(name: string): Promise<string>;
  /**
   * @returns {any[]}
   */
  get_types(): Promise<any>[];
  /**
   * @param {string} id
   * @returns {any[]}
   */
  get_item_types(id: string): Promise<any>[];
  /**
   * @param {string} t
   * @returns {string}
   */
  add_item(t: string): Promise<string>;
  /**
   * @param {string} a
   * @param {string} b
   */
  add_edge(a: string, b: string): Promise<void>;
  /**
   * @returns {BigInt}
   */
  get_vertex_count(): Promise<BigInt>;
  /**
   * @param {string} a
   * @returns {BigInt}
   */
  get_edge_count(a: string): Promise<BigInt>;
  /**
   * @param {string} id
   * @returns {any}
   */
  get_properties(id: string): Promise<any>;
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} value
   */
  set_property(id: string, name: string, value: string): Promise<void>;
  /**
   * @param {string} a
   * @returns {any[]}
   */
  get_references(a: string): Promise<any>[];
  /**
   * @param {string} a
   * @returns {any[]}
   */
  get_referenced_by(a: string): Promise<any>[];
}

import { serve } from "https://deno.land/std@0.126.0/http/server.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import renderPlayground from "https://esm.sh/@magiql/ide/render";
import {
  printSchema,
  graphql,
} from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";
import pluralize from "https://esm.sh/pluralize";

// import type  { OS } from "./os/indradb.js";

// await init();
export let os: OS = {
  add_type: async (name: string) => {
    const { data: systemType, errors } = await supabase
      .from("items")
      .insert([{ type: "Type" }]);

    await supabase.from("item_properties").insert([
      {
        id: systemType[0].id,
        name: "typeName",
        value: name,
      },
    ]);

    await supabase.from("references").insert([
      {
        outbound_id: "00000000-0000-0000-0000-000000000002",
        inbound_id: systemType[0].id,
        type: `Type`,
      },
    ]);

    return systemType[0].id;
  },
  add_item: async (name: string) => {},
  set_property: () => {},
  add_edge: () => {},
  get_items: async () => {
    return (await supabase.from("items").select("id")).data;
  },
  get_references: async (id) => {
    const { data } = await supabase
      .from("references")
      .select("*")
      .eq("outbound_id", id);
    return data.map((d) => d.inbound_id);
  },
  get_referenced_by: async (id) => {
    const { data } = await supabase
      .from("references")
      .select("*")
      .eq("inbound_id", id);
    return data.map((d) => d.outbound_id);
  },
  get_item_types: async (id) => {
    console.log({ id });
    const { data } = await supabase
      .from("references")
      .select("*")
      .eq("inbound_id", id);
    console.log({ data });
    if (!data.length) {
      return ["Type"];
    }
    const { data: types } = await supabase
      .from("items")
      .select("*,item_properties(*)")
      .in(
        "id",
        data.map((d) => d.outbound_id)
      )
      .eq("type", "Type");
    let system = types.map(
      (t) => t.item_properties.find((prop) => prop.name === "typeName").value
    );

    if (system.length === 1 && system[0] === "System") {
      return ["Type"];
    }
    console.log({ system });
    return system;
  },
  get_properties: async (id) => {
    console.log("get_properties", id);
    const {
      data: [item],
      errors,
    } = await supabase
      .from("items")
      .select("*,item_properties(*)")
      .eq("id", id);

    console.log({ errors });
    console.log({ item });
    if (!item) {
      return {};
    }
    console.log(
      Object.fromEntries(item.item_properties.map((pr) => [pr.name, pr.value]))
    );
    return Object.fromEntries(
      item.item_properties.map((pr) => [pr.name, pr.value])
    );
  },
  async setup() {
    console.log(
      await supabase
        .from("item_properties")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
    );
    console.log(
      await supabase
        .from("references")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
    );
    console.log(
      await supabase
        .from("items")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
    );

    const { data: systemType, errors } = await supabase.from("items").insert([
      {
        id: "00000000-0000-0000-0000-000000000001",
        type: "Type",
      },
    ]);

    await supabase.from("item_properties").insert([
      {
        id: systemType[0].id,
        name: "typeName",
        value: `System`,
      },
    ]);

    await supabase.from("item_properties").insert([
      {
        id: "00000000-0000-0000-0000-000000000000",
        name: "name",
        value: `Bootloader`,
      },
    ]);

    const { data: baseType, errors: baseErrors } = await supabase
      .from("items")
      .insert([
        {
          type: "Type",
          id: "00000000-0000-0000-0000-000000000002",
        },
      ]);

    await supabase.from("item_properties").insert([
      {
        id: baseType[0].id,
        name: "typeName",
        value: `Type`,
      },
    ]);

    await supabase.from("references").insert([
      {
        outbound_id: systemType[0].id,
        inbound_id: baseType[0].id,
        type: `Type`,
      },
    ]);

    this.installServices(
      systemService,
      knowledgeService,
      bookService,
      movieService
    );

    return true;
  },
  async installServices(...services: any) {
    for (let service of services) {
      await service(os);
    }
  },
};

const builder = (os: OS) => {
  let itemInterface = `
  id: ID!
  referencedItems(type: ItemType, first: Int, after: String): ReferencesPage!
  referencedBy(type: ItemType, first: Int, after: String): ReferencesPage!
  types: [ItemType!]
  metadata: String
  `;

  let itemTypes: [any, any, any][] = [];
  let internalTypeDefs = `
    interface Item {
      ${itemInterface}
    }
  `;

  let userTypeDefs = ``;

  async function getReferences(id: any, args: { type: string }) {
    let references = [];
    for (let ref of await os.get_references(id)) {
      if (
        args?.type ? (await os.get_item_types(id)).includes(args.type) : true
      ) {
        references.push({
          cursor: ref,
        });
      }
    }

    return {
      page: references,
    };
  }

  async function getReferencenedBy(id: any, args: { type: string }) {
    let references = [];
    for (let ref of await os.get_referenced_by(id)) {
      if (
        args?.type ? (await os.get_item_types(id)).includes(args.type) : true
      ) {
        references.push({
          cursor: ref,
        });
      }
    }

    return {
      page: references,
    };
  }

  let api = {
    addItemType: (
      type: string,
      fields: string = "",
      resolvers: object = {}
    ) => {
      userTypeDefs += `
        type ${type} implements Item {
          ${itemInterface}
          ${fields}
        }

        input ${type}Input {
          id: String
          ${fields}
        }
      `;

      itemTypes.push([type, fields, resolvers]);
      // return os.add_type(type);
    },
    toSchema: () => {
      let typeDefs = `${internalTypeDefs} \n ${userTypeDefs} \n
        enum ItemType {
          ${itemTypes.map((m) => m[0]).join("\n")}
        }

        \n

        type ReferencesPage {
          page: [Reference!]!
          pageInfo: PageInfo!
        }

        type PageInfo {
          hasNextPage: Boolean!
        }

        type Reference {
          cursor: String!
          item: Item!
        }

        type Query {
          item(id: ID!): Item
          items(type: ItemType, first: Int, after: String): ReferencesPage!
          ${itemTypes
            .map(
              (m) =>
                `${pluralize(
                  m[0].replace(/^([A-Z])/, (o: string) => o.toLowerCase()),
                  10
                )}(first: Int, after: String): ReferencesPage!`
            )
            .join("\n")}
        }

        type Mutation {
          addType(name: String): Type
          setup(name: String): Boolean
          addItem(type: ItemType): Type
        }
      `;
      const schema = makeExecutableSchema({
        typeDefs: gql(typeDefs),
        resolvers: {
          Mutation: {
            addType: async (root: any, args: any) => {
              let id = await os.add_type(args.name);
              return {
                id,
                ...(await os.get_properties(id)),
              };
            },
            addItem: async (root: any, args: any) => {
              let id = await os.add_type(args.name);
              return {
                id,
                ...(await os.get_properties(id)),
              };
            },
            setup: () => {
              return os.setup();
            },
          },
          Query: {
            item: (root: any, args: any) => {
              // return os.get_item(args.id);
            },
            items: async (root: any, args: any) => {
              let items = await os.get_items();

              let page = [];
              for (let item of items) {
                if (
                  args.type
                    ? (await os.get_item_types(item.id)).includes(args.type)
                    : true
                ) {
                  page.push({ cursor: item.id });
                }
              }
              return { page };
            },

            ...Object.fromEntries(
              itemTypes.map(([type, f, resolvers]) => [
                pluralize(
                  type.replace(/^([A-Z])/, (o: string) => o.toLowerCase()),
                  10
                ),
                () => {
                  return {
                    page: os
                      .get_items()
                      .filter((item) => os.get_item_types(item).includes(type))
                      .map((item: any) => ({
                        cursor: item,
                      })),
                  };
                },
              ])
            ),
          },
          Item: {
            referencedItems: (item: any, args: { type: string }) => {
              return getReferences(item.id, args);
            },
            referencedBy: (item: any, args: { type: string }) => {
              return getReferencenedBy(item.id, args);
            },
            types: (root: any) => os.get_item_types(root.id),
          },
          Reference: {
            item: async (root: any, args: any) => {
              console.log({
                id: root.cursor,
                ...(await os.get_properties(root.cursor)),
              });
              return {
                id: root.cursor,
                ...(await os.get_properties(root.cursor)),
              };
            },
          },
          ...Object.fromEntries(
            itemTypes.map(([type, f, resolvers]) => [
              type,
              {
                referencedItems: (root: any, args: { type: string }) =>
                  getReferences(root.id, args),
                referencedBy: (root: any, args: { type: string }) =>
                  getReferencenedBy(root.id, args),
                ...resolvers,
                types: (root: any) => os.get_item_types(root.id),
                __isTypeOf: async (root: any) => {
                  return (await os.get_item_types(root.id)).includes(type);
                },
              },
            ])
          ),
        },
      });

      return schema;
    },
  };
  api.addItemType("System", "typeName: String", {});
  api.addItemType("Type", "typeName: String", {});
  return api;
};

let schemaBuilder = builder(os);

async function systemService(os: OS) {
  await os.add_type("Text");
  schemaBuilder.addItemType("Text", "value: String");
  await os.add_type("Date");
  schemaBuilder.addItemType("Date", "value: String");
  await os.add_type("URL");
  schemaBuilder.addItemType("URL", "value: String");
}

async function knowledgeService(os: OS) {
  await os.add_type("Title");
  schemaBuilder.addItemType("Title");
  await os.add_type("Topic");
  schemaBuilder.addItemType("Topic");
  await os.add_type("List");
  schemaBuilder.addItemType("List");
  await os.add_type("Note");
  schemaBuilder.addItemType("Note");
  await os.add_type("Status");
  schemaBuilder.addItemType("Status");
}

async function bookService(os: OS) {
  await os.add_type("Book");
  schemaBuilder.addItemType("Note");
}

async function movieService(os: OS) {
  await os.add_type("Movie");
  schemaBuilder.addItemType("Movie");
}

async function taskService(os: OS) {
  await os.add_type("Task");
  schemaBuilder.addItemType("Task");
}

async function webService(os: OS) {
  await os.add_type("Webpage");
  schemaBuilder.addItemType("Webpage");
}

// var Webpage = schemaBuilder.addItemType("Webpage");

// let title = addItem(Title.id, {});
// addReference(
//   title.id,
//   addItem(Text.id, {
//     value: "To Review",
//   }).id
// );
// let toReview = addItem(Status.id, {});
// addReference(toReview.id, title.id);

// title = addItem(Title.id, {});
// addReference(
//   title.id,
//   addItem(Text.id, {
//     value: "Later",
//   }).id
// );
// let later = addItem(Status.id, {});
// addReference(later.id, title.id);

// let harryPotter1 = os.add_item("Book");
// let title = os.add_item("Title");
// let text = os.add_item("Text");
// os.set_property(text, "value", `"Harry Potter"`);
// os.add_edge(title, text);
// os.add_edge(Movie, harryPotter1);
// os.add_edge(harryPotter1, title);

// let task = os.add_item("Task");
// let taskItem = os.add_item("Text");
// os.set_property(taskItem, "value", `"Harry Potter"`);

// os.add_edge(task, taskItem);
// os.add_edge(title, text);

// let taskList = os.add_item("List");
// title = os.add_item("Title");
// text = os.add_item("Text");
// os.set_property(text, "value", `"Harry Potter"`);
// os.add_edge(taskList, task);
// os.add_edge(title, text);
// os.add_edge(taskList, title);

const schema = schemaBuilder.toSchema();

// Deno.writeTextFileSync("./schema.graphql", printSchema(schema));

async function respondWithGraphQL(req: Request) {
  const query = await req.json();
  console.log(query);
  try {
    return new Response(
      JSON.stringify(
        await graphql({
          source: query.query,
          schema,
          // source:
        })
      ),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: {
          message: e.message,
          stack: e.stack,
        },
      }),
      {
        status: 400,
        headers: {
          "content-type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Private-Network": "true",
};

let handler = async (req: Request) => {
  const { pathname } = new URL(req.url);

  if (req.method === "OPTIONS") {
    const res = new Response(null, {
      headers: {
        ...corsHeaders,
      },
    });

    return res;
  }
  const res: any =
    req.method === "GET"
      ? new Response(await renderPlayground({ uri: "/" }), {
          headers: {
            "Content-Type": "text/html",
            ...corsHeaders,
          },
        })
      : respondWithGraphQL(req);

  return res;
};

serve(handler, {
  port: 9999,
});
