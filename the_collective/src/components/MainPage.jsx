import React from "react";
import { Route, Switch } from "react-router-dom";

// imported components
import NavBar from "./navbar";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main id="main-component">
        <Route path="/" component={NavBar} />
      </main>
    );
  }
}
