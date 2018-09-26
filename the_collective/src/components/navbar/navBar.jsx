import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.redirectTo = this.redirectTo.bind(this);
    this.isActiveTab = this.isActiveTab.bind(this);
  }

  redirectTo(section) {
    return e => {
      if (this.props.location.pathname !== section) {
        this.props.history.push(section);
      }
    };
  }

  isActiveTab(category) {
    if (category === this.props.location.pathname.slice(1)) {
      return "active-cat";
    } else {
      return "inactive-cat";
    }
  }

  render() {
    return (
      <nav id="main-nav">
        <h2
          className={this.isActiveTab("books")}
          onClick={this.redirectTo("/books")}
        >
          <p>Books</p>
        </h2>
        <h2
          className={this.isActiveTab("cars")}
          onClick={this.redirectTo("/cars")}
        >
          <p>Cars</p>
        </h2>
        <h2
          className={this.isActiveTab("games")}
          onClick={this.redirectTo("/games")}
        >
          <p>Games</p>
        </h2>
        <h2
          className={this.isActiveTab("gundam")}
          onClick={this.redirectTo("/gundam")}
        >
          <p>Gundam</p>
        </h2>
        <h2
          className={this.isActiveTab("movies")}
          onClick={this.redirectTo("/movies")}
        >
          <p>Movies</p>
        </h2>
      </nav>
    );
  }
}
