import {
  Server,
  listenAndServe,
} from "https://deno.land/std@0.126.0/http/server.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.1/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import renderPlayground from "https://esm.sh/@magiql/ide/render";
import {
  printSchema,
  graphql,
} from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";
import pluralize from "https://esm.sh/pluralize";

import init, { OS } from "./os/indradb.js";

await init();
export let os = OS.new();

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

  function getReferences(id: any, args: { type: string }) {
    const references = os
      .get_references(id)
      .filter((id) =>
        args?.type ? os.get_item_types(id).includes(args.type) : true
      )
      .map((id: any) => ({
        cursor: id,
      }));

    return {
      page: references,
    };
  }

  function getReferencenedBy(id: any, args: { type: string }) {
    const references = os
      .get_referenced_by(id)
      .filter((id) =>
        args?.type ? os.get_item_types(id).includes(args.type) : true
      )
      .map((id: any) => ({
        cursor: id,
      }));

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
      return os.add_type(type);
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
      `;
      const schema = makeExecutableSchema({
        typeDefs: gql(typeDefs),
        resolvers: {
          Query: {
            item: (root: any, args: any) => {
              // return os.get_item(args.id);
            },
            items: (root: any, args: any) => {
              return {
                page: os
                  .get_items()
                  .filter((item: any) =>
                    args.type
                      ? os.get_item_types(item).includes(args.type)
                      : true
                  )
                  .map((item: any) => ({
                    cursor: item,
                  })),
              };
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
            item: (root: any, args: any) => {
              return {
                id: root.cursor,
                ...os.get_properties(root.cursor),
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
                __isTypeOf: (root: any) =>
                  os.get_item_types(root.id).includes(type),
              },
            ])
          ),
        },
      });

      return schema;
    },
  };
  api.addItemType("System", "name: String", {});
  api.addItemType("Type", "name: String", {});
  return api;
};

let schemaBuilder = builder(os);

var Text = schemaBuilder.addItemType("Text", "value: String");
var Date = schemaBuilder.addItemType("Date");

var Title = schemaBuilder.addItemType("Title");
var Topic = schemaBuilder.addItemType("Topic");
var Task = schemaBuilder.addItemType("Task");

var List = schemaBuilder.addItemType("List");

var Webpage = schemaBuilder.addItemType("Webpage");

var Note = schemaBuilder.addItemType("Note");

var Status = schemaBuilder.addItemType("Status");

var Book = schemaBuilder.addItemType("Book");
var Movie = schemaBuilder.addItemType("Movie");

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

let harryPotter1 = os.add_item("Book");
let title = os.add_item("Title");
let text = os.add_item("Text");
os.set_property(text, "value", `"Harry Potter"`);
os.add_edge(title, text);
os.add_edge(Movie, harryPotter1);
os.add_edge(harryPotter1, title);

let task = os.add_item("Task");
let taskItem = os.add_item("Text");
os.set_property(taskItem, "value", `"Harry Potter"`);

os.add_edge(task, taskItem);
os.add_edge(title, text);

let taskList = os.add_item("List");
title = os.add_item("Title");
text = os.add_item("Text");
os.set_property(text, "value", `"Harry Potter"`);
os.add_edge(taskList, task);
os.add_edge(title, text);
os.add_edge(taskList, title);

const schema = schemaBuilder.toSchema();

Deno.writeTextFileSync("./schema.graphql", printSchema(schema));

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
  console.log(req.url);
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

listenAndServe(
  {
    port: 9999,
  },
  handler
);

// import {
//   app,
//   get,
//   post,
//   redirect,
//   contentType,
// } from "https://denopkg.com/syumai/dinatra/mod.ts";

// const greeting = "<h1>Hello From Deno on Fly!</h1>";

// app(
//   get("/", () => greeting),
//   get("/:id", ({ params }) => greeting + `</br>and hello to ${params.id}`)
// );
