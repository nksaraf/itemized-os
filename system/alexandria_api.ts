import { Server } from "https://deno.land/std@0.107.0/http/server.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.1/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";
import renderPlayground from "https://esm.sh/@magiql/ide/render";
import { printSchema } from "https://deno.land/x/graphql_deno@v15.0.0/mod.ts";
import pluralize from "https://esm.sh/pluralize";
let id = 0;
const data = {
  version: 1,
  items: [] as {
    id: number;
    type: string;
    metadata?: object;
    [key: string]: any;
  }[],
  references: [] as [number, number][],
};

function getItemTypes(id: number) {
  console.log(id);
  const refs = getReferencenedBy(id).page.filter((ref) =>
    getReferencenedBy(ref.cursor).page.find((ref) => ref.cursor === 0)
  );

  // .filter((ref) =>
  //   getReferences(ref.cursor).references.find((ref) => ref.cursor === id)
  // );
  console.log(refs.map((ref) => ref.item.value));
  return refs.map((ref) => ref.item.value);
  // return data.items[
  //   data.references.find(
  //     ([a, b]) => getItemType(a) === getItemType(id)
  //   )?.[1] as number
  // ];
}

const builder = () => {
  let itemInterface = `
  id: ID!
  renferencedItems(type: ItemType, first: Int, after: String): ReferencesPage!
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

  return {
    addItemType: (type: string, fields: string, resolvers: object) => {
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
          items(type: ItemType!, first: Int, after: String): ReferencesPage!
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
      console.log(typeDefs);
      const schema = makeExecutableSchema({
        typeDefs: gql(typeDefs),
        resolvers: {
          Query: {
            item: (root: any, args: any) => {
              return data["items"][args.id];
            },
            items: (root: any, args: any) => {
              return {
                page: data["items"]
                  .filter((item) => getItemTypes(item.id).includes(args.type))
                  .map((item: any) => ({
                    cursor: item.id,
                    item: item,
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
                    page: data["items"]
                      .filter((item) => getItemTypes(item.id).includes(type))
                      .map((item: any) => ({
                        cursor: item.id,
                        item: item,
                      })),
                  };
                },
              ])
            ),
          },
          Item: {
            renferencedItems: (item: any) => {
              return getReferences(item.id);
            },
            referencedBy: (item: any) => {
              return getReferencenedBy(item.id);
            },
          },
          ...Object.fromEntries(
            itemTypes.map(([type, f, resolvers]) => [
              type,
              {
                renferencedItems: (root: any) => getReferences(root.id),
                referencedBy: (root: any) => getReferences(root.id),
                ...resolvers,
                types: (root: any) => getItemTypes(root.id),
                __isTypeOf: (root: any) => getItemTypes(root.id).includes(type),
              },
            ])
          ),
        },
      });

      return schema;
    },
  };
};

let schemaBuilder = builder();

function taskService() {}

// schemaBuilder.addItemType("Text", "text: String");
// schemaBuilder.addItemType("Title", "title: String");
// schemaBuilder.addItemType("Topic", "topicType: String text: String");
// schemaBuilder.addItemType("Task", "");
// schemaBuilder.addItemType("List", "title: String");
// schemaBuilder.addItemType("Webpage", "url: String");
// schemaBuilder.addItemType("Note", "title: String");

function addReference(from: number, to: number) {
  data.references.push([from, to]);
}

function addItem(typeId: number, props: any) {
  let item = {
    id: id++,
    ...props,
  };
  data.items.push(item);

  let t = data.items[typeId];
  data.references.push([t!.id, item.id]);
  return item;
}

function addType(type: string, fields?: string, resolvers?: any) {
  schemaBuilder.addItemType(type, fields ?? "", resolvers ?? {});
  return addItem(0, {
    value: type,
  });
}

var Type = addType("Type", "value: String");
var Text = addType("Text", "value: String");
var Date = addType("Date");

var Title = addType("Title");
var Topic = addType("Topic");
var Task = addType("Task");

var List = addType("List");

var Webpage = addType("Webpage");

var Note = addType("Note");

var Status = addType("Status");

var Book = addType("Book");
var Movie = addType("Movie");

let title = addItem(Title.id, {});
addReference(
  title.id,
  addItem(Text.id, {
    value: "To Review",
  }).id
);
let toReview = addItem(Status.id, {});
addReference(toReview.id, title.id);

title = addItem(Title.id, {});
addReference(
  title.id,
  addItem(Text.id, {
    value: "Later",
  }).id
);
let later = addItem(Status.id, {});
addReference(later.id, title.id);

let harryPotter1 = addItem(Book.id, {});
let harryPotter = addItem(Topic.id, {});

title = addItem(Title.id, {});
addReference(
  title.id,
  addItem(Text.id, {
    value: "Harry Potter",
  }).id
);
addReference(harryPotter.id, title.id);

title = addItem(Title.id, {});
addReference(
  title.id,
  addItem(Text.id, {
    value: "Harry Potter and the Socerer's Stone",
  }).id
);

addReference(harryPotter1.id, title.id);
addReference(Movie.id, harryPotter1.id);

console.log(data);

// const resolvers = {
//   Todo: {
//     type: () => "Todo",
//     renferencedItems: getRefeferences,
//   },
//   List: {
//     type: () => "List",
//     renferencedItems: getRefeferences,
//   },
//   Query: {
//     item: () => `Hello World!`,
//     items: (ctx: any) => {
//       return {
//         references: Object.entries(data["items"]).map(([_, item]: any) => ({
//           cursor: item.id,
//           item: item,
//         })),
//       };
//     },
//   },
// };

const schema = schemaBuilder.toSchema();

Deno.writeTextFileSync("./schema.graphql", printSchema(schema));

const s = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url);

    if (req.method === "OPTIONS") {
      const res = new Response(null, {});
      res.headers.set("Access-Control-Allow-Origin", "*");
      res.headers.set("Access-Control-Allow-Headers", "Content-Type");
      console.log([...res.headers.entries()]);
      return res;
    }
    const res: any =
      pathname === "/graphql"
        ? req.method === "GET"
          ? new Response(await renderPlayground({ uri: "/graphql" }), {
              headers: {
                "Content-Type": "text/html",
              },
            })
          : await GraphQLHTTP<Request>({
              schema,

              graphiql: false,
            })(req)
        : new Response(`Hello World!`);

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    return new Response(res.body, {
      headers,
    });
  },

  addr: ":9999",
});

s.listenAndServe();

function getReferences(id: any) {
  const references = data["references"]
    .filter(([a, b]: any) => a === id)
    .map(([_, id]: any) => ({
      cursor: id,
      item: data["items"][id],
    }));

  return {
    page: references,
  };
}

function getReferencenedBy(id: any) {
  const references = data["references"]
    .filter(([a, b]: any) => b === id)
    .map(([id, _]: any) => ({
      cursor: id,
      item: data["items"][id],
    }));

  return {
    page: references,
  };
}
