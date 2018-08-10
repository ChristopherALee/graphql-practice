import React from "react";
import { graphql } from "react-apollo";

import { getBooksQuery } from "../queries/queries";

import BookDetails from "./BookDetails";

class BookList extends React.Component {
  constructor(props) {
    super(props);
  }

  displayBooks() {
    let data = this.props.data;

    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return <li key={book.id}>{book.name}</li>;
      });
    }
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>

        <BookDetails />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
