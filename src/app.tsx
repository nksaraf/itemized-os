import { Checkbox } from "@vechaiui/react";
import React from "react";
import { ItemType, Selector, Thunder } from "./system/zeus";
import { useTypedQuery } from "./system/zeus/reactQuery";
import { graphql } from "./graphql-tag/relay-compile-tag/graphql-tag";
import { useFragment, useQuery } from "./graphql-tag/react";
import { Graph } from "./graph";
const fetchGraphQL = async (query: string, vars: object) => {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: vars }),
  });
  return response.json();
};

import init, { OS } from "../db/pkg/indradb.js";

await init();
export let os = OS.new();

var Text = os.add_type("Text");
var Date = os.add_type("Date");

var Titl = os.add_type("Title");
var Topic = os.add_type("Topic");
var Task = os.add_type("Task");

var List = os.add_type("List");

var Webpage = os.add_type("Webpage");

var Note = os.add_type("Note");

var Status = os.add_type("Status");

var Book = os.add_type("Book");
var Movie = os.add_type("Movie");

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

console.log(os.get_types());

function Card(props: React.PropsWithChildren<{}>) {
  return (
    <div className="p-6 pb-12 flex flex-column w-full h-full">
      <div className="bg-white h-full rounded-md w-full shadow-lg overflow-hidden">
        {props.children}
      </div>
    </div>
  );
}

const selector = Selector("Item");
const query = Selector("Query");

const TitleFragment = (type: string) => graphql`
  fragment TitleFragment${type} on ${type} {
    referencedItems(type: Title) {
      page {
        item {
          id
          ... on Title {
            referencedItems(type: Text) {
              page {
                item {
                  id
                  ... on Text {
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function Title({ item, type }: { item: any; type: string }) {
  const data = useFragment(TitleFragment(type), item);
  console.log(item, data);

  return (
    <h1>
      {data.referencedItems.page[0].item.referencedItems.page[0].item.value}
    </h1>
  );
}

let sample = {
  nodes: [
    {
      id: 1,
      title: "Node A",
      x: 258.3976135253906,
      y: 331.9783248901367,
      type: "empty",
    },
    {
      id: 2,
      title: "Node B",
      x: 593.9393920898438,
      y: 260.6060791015625,
      type: "empty",
    },
    {
      id: 3,
      title: "Node C",
      x: 237.5757598876953,
      y: 61.81818389892578,
      type: "custom",
    },
    {
      id: 4,
      title: "Node C",
      x: 600.5757598876953,
      y: 600.81818389892578,
      type: "custom",
    },
  ],
  edges: [
    {
      source: 1,
      target: 2,
      type: "emptyEdge",
    },
    {
      source: 2,
      target: 4,
      type: "emptyEdge",
    },
  ],
};

export function App() {
  const { data, isLoading } = useQuery(graphql`
    query MyQuery {
      books: items(type: Book) {
        page {
          item {
            id
            ...${TitleFragment("Book")}
          }
        }
      }
      taskLists: items(type: List) {
        page {
          item {
            ...${TitleFragment("List")}
          }
        }
      }
      tasks: items(type: Task) {
        page {
          item {
            id
            ... on Task {
              referencedItems(type: Text) {
                page {
                  item {
                    id
                    ... on Text {
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
      types: items(type: Type) {
        page {
          item {
            id
            ... on Type {
              name
              referencedItems {
                page {
                  item {
                    id
                    types
                  }
                }
              }
            }
          }
        }
      }

      items {
        page {
          item {
            id
            ... on Type {
              name
            }
            referencedItems {
              page {
                item {
                  id
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Card>
      {
        !isLoading && (
          <Graph
            sample={{
              nodes: data.items.page.map((t, i) => ({
                id: t.item.id,
                title: t.item.name,
                x: i * 100,
                y: Math.random() * 1000,
                type: "empty",
              })),
              edges: data.items.page
                .map((t, i) =>
                  t.item.referencedItems.page.map((r) => ({
                    source: t.item.id,
                    target: r.item.id,
                  }))
                )
                .flat(),
            }}
          />
        )
        // data.books.page.map((ref: any) => (
        //   <>
        //     <Title type={"Book"} item={ref.item} />
        //   </>
        // ))}
      }
      {/* <div className="flex flex-wrap p-8 space-x-4">
        <Checkbox>Checkbox</Checkbox>
        <Checkbox defaultChecked>Checkbox</Checkbox>
      </div>
      {!isLoading &&
        data.books.page.map((ref: any) => (
          <>
            <Title type={"Book"} item={ref.item} />
          </>
        ))}
      <ul>
        {!isLoading &&
          data.types.page.map((ref: any) => (
            <li className="list-disc">
              {ref.item.name}{" "}
              {JSON.stringify(ref.item.referencedItems, null, 2)}
            </li>
          ))}
      </ul>
      <div>
        {!isLoading &&
          data.tasks.page.map((ref: any) => (
            <Checkbox>{ref.item.referencedItems.page[0].item.value}</Checkbox>
          ))}
      </div>
      <div>
        {!isLoading &&
          data.taskLists.page.map((ref: any) => (
            <Title type={"List"} item={ref.item} />
          ))}
      </div>
      <p>Hello Vite + Preact!</p>
      <p>
        <a
          className="link"
          href="https://preactjs.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Preact
        </a>
      </p> */}
    </Card>
  );
}
