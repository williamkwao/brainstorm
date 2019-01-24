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
  state ={
     data: []
  }
  render() {
    return (
      <Subscription subscription={subscription}>
        {({ data, loading }) => {
          console.log("give me data!", data, loading);
          if (data && data.ideaAdded) {
            console.log("data", data.ideaAdded);
            return (
              <div className="idea">
                <h1>{data.ideaAdded.text}</h1>
                <h4> user: {data.ideaAdded.user}</h4>
              </div>
            );
          }
          return (
            <div className="idea">
              <h4>Waiting for new ideas</h4>
            </div>
          );
        }}
      </Subscription>
    );
  }
}

export default App;
