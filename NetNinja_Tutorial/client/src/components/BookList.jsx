import React from "react";

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          <li>Book Name</li>
        </ul>
      </div>
    );
  }
}
