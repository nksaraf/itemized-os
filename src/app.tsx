import { Checkbox } from "@vechaiui/react";
import React from "react";
import { ItemType, Selector, Thunder } from "./system/zeus";
import { useTypedQuery } from "./system/zeus/reactQuery";
import { graphql } from "./graphql-tag/relay-compile-tag/graphql-tag";
import { useFragment, useQuery } from "./graphql-tag/react";
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

function Card(props: React.PropsWithChildren<{}>) {
  return (
    <div className="p-6 pb-12 flex flex-column h-full">
      <div className="bg-white h-full rounded-md px-6 shadow-lg">
        {props.children}
      </div>
    </div>
  );
}

const selector = Selector("Item");
const query = Selector("Query");

const TitleFragment = graphql`
  fragment TitleFragment on Book {
    renferencedItems(type: Title) {
      page {
        item {
          id
          ... on Title {
            renferencedItems(type: Text) {
              page {
                item {
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

function Title({ item }: { item: any }) {
  const data = useFragment(TitleFragment, item);
  console.log(item, data);

  return (
    <h1>
      {data.renferencedItems.page[0].item.renferencedItems.page[0].item.value}
    </h1>
  );
}

export function App() {
  const { data, isLoading } = useQuery(graphql`
    query MyQuery {
      items(type: Book) {
        page {
          item {
            id
            ...${TitleFragment}
          }
        }
      }
    }
  `);

  return (
    <Card>
      <div className="flex flex-wrap p-8 space-x-4">
        <Checkbox>Checkbox</Checkbox>
        <Checkbox defaultChecked>Checkbox</Checkbox>
      </div>
      {!isLoading &&
        data.items.page.map((ref: any) => (
          <>
            <Title item={ref.item} />
          </>
        ))}
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
      </p>
    </Card>
  );
}
