import React from "react";
import { Route, Switch } from "react-router-dom";
import "./mainPage.css";

// imported components
import NavBar from "../navbar/navBar";
import BookList from "../collections/books/bookList";
import CarList from "../collections/cars/carList";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.redirectHome = this.redirectHome.bind(this);
  }

  redirectHome() {
    if (this.props.location.pathname !== "/") {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <main id="main-component">
        <section id="header">
          <h1 onClick={this.redirectHome}>The Collective</h1>
          <p>"For the culture" - Migos</p>
        </section>

        <Route path="/" component={NavBar} />

        <Switch>
          <Route path="/books" component={BookList} />
          <Route path="/cars" component={CarList} />
        </Switch>
      </main>
    );
  }
}
