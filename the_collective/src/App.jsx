import React, { Component } from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

// components
import MainPage from "./components/MainPage";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <ApolloProvider client={client}>
            <div id="main">
              <h1>The Collective</h1>
              <MainPage />
            </div>
          </ApolloProvider>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
