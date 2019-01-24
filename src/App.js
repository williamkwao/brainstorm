import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import "./App.css";
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
const subscription = gql`
  subscription ideaAdded {
    ideaAdded {
      user
      text
    }
  }
`;

class App extends Component {
  render() {
    return (
      <Subscription subscription={subscription}>
        {({ data, loading }) => {
          console.log("give me data!", data, loading);
          if (data && data.ideaAdded) {
            console.log("data", data.ideaAdded);

            return (
              <div>
                <h4> New Idea added by {data.ideaAdded.user}</h4>
                <h1>{data.ideaAdded.text}</h1>
              </div>
            );
          }
          return <h4>Waiting for new ideas</h4>;
        }}
      </Subscription>
    );
  }
}

export default App;
