import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav id="main-nav">
        <h2>
          <p>Books</p>
        </h2>
        <h2>
          <p>Cars</p>
        </h2>
        <h2>
          <p>Games</p>
        </h2>
        <h2>
          <p>Gundam</p>
        </h2>
        <h2>
          <p>Movies</p>
        </h2>
      </nav>
    );
  }
}
