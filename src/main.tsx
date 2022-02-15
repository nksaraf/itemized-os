import { render } from "react-dom";
import { App } from "./app";
import { VechaiProvider, defaultTheme } from "@vechaiui/react";
import "./index.css";
import "regenerator-runtime/runtime";
import React from "react";
import { createClient, Provider } from "urql";
import { QueryClient, QueryClientProvider } from "react-query";
import { GQLClient } from "./graphql-tag/core";

const client = createClient({
  url: "http://localhost:9999/graphql",
});

render(
  <Provider value={client}>
    <QueryClientProvider
      client={
        new GQLClient({
          url: "http://localhost:9999/graphql",
        })
      }
    >
      <VechaiProvider
        theme={{
          ...defaultTheme,
          cursor: "pointer",
        }}
      >
        <App />
      </VechaiProvider>
    </QueryClientProvider>
  </Provider>,
  document.getElementById("app")!
);
