import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.redirectTo = this.redirectTo.bind(this);
  }

  redirectTo(section) {
    return e => {
      if (this.props.location.pathname !== section) {
        this.props.history.push(section);
      }
    };
  }

  render() {
    return (
      <nav id="main-nav">
        <h2 onClick={this.redirectTo("/books")}>
          <p>Books</p>
        </h2>
        <h2 onClick={this.redirectTo("/cars")}>
          <p>Cars</p>
        </h2>
        <h2 onClick={this.redirectTo("/games")}>
          <p>Games</p>
        </h2>
        <h2 onClick={this.redirectTo("/gundam")}>
          <p>Gundam</p>
        </h2>
        <h2 onClick={this.redirectTo("/movies")}>
          <p>Movies</p>
        </h2>
      </nav>
    );
  }
}
