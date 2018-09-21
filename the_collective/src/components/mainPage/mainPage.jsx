import React from "react";
import { Route, Switch } from "react-router-dom";
import "./mainPage.css";

// imported components
import NavBar from "../navbar/navBar";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main id="main-component">
        <section id="header">
          <h1>The Collective</h1>
          <p>"For the culture" - Migos</p>
        </section>

        <Route path="/" component={NavBar} />
      </main>
    );
  }
}
