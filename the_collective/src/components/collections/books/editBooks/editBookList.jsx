import React from "react";

import { getBooksQuery } from "../../../../queries/queries";
import { graphql, compose } from "react-apollo";

import EditBook from "./editBook";

class EditBookList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBooks() {
    let books = this.props.books;

    return books.map((book, idx) => {
      return <EditBook key={book.id} book={book} />;
    });
  }

  render() {
    return this.renderBooks();
  }
}

export default EditBookList;
