import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { getMainDefinition } from "apollo-utilities";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

const wsLink = new WebSocketLink({
  uri: "wss://kwaostorm.herokuapp.com/graphql",
  options: {
    reconnect: true
  }
});
const cache = new InMemoryCache();
const httpLink = new HttpLink("https://kwaostorm.herokuapp.com/graphql");
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({ link, cache });
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
