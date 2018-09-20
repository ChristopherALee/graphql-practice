import React from "react";
import "./navbar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav id="main-nav">
        <h2>Books</h2>
        <h2>Cars</h2>
        <h2>Games</h2>
        <h2>Gundam</h2>
        <h2>Movies</h2>
      </nav>
    );
  }
}
