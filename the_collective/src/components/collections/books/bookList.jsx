import React from "react";
import { graphql, compose } from "react-apollo";
import "./bookList.css";

import { getBooksQuery } from "../../../queries/queries";

import AddBook from "./addBook/addBook";

class BookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      author: ""
    };
  }

  displayBooks() {
    let data = this.props.data;

    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <tr id="book-item" key={book.id}>
            <td>{book.name}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div id="book-list">
        <table id="displayed-books">
          <th>Name</th>
          <th>Author</th>
          <th>Genre</th>
          {this.displayBooks()}
        </table>

        <AddBook />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
