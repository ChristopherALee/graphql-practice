import React, { Component } from "react";
import { Provider } from "react-redux";
import { Route, HashRouter } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "./index.css";

// components
import MainPage from "./components/mainPage/mainPage";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <HashRouter>
          <ApolloProvider client={client}>
            <div id="main">
              <Route path="/" component={MainPage} />
            </div>
          </ApolloProvider>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
