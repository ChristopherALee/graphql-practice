import React from "react";
import { graphql, compose } from "react-apollo";
import "./bookList.css";

import { getBooksQuery } from "../../../queries/queries";

import AddBook from "./addBook/addBook";
import EditBook from "./editBook/editBook";

class BookList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteMode: false
    };

    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
  }

  toggleDeleteMode() {
    if (this.state.deleteMode) {
      this.setState({
        deleteMode: false
      });
    } else {
      this.setState({
        deleteMode: true
      });
    }
  }

  toggleDeleteButton() {
    if (this.state.deleteMode) {
      return (
        <button
          id="delete-mode-toggle"
          className="delete-mode-active"
          onClick={this.toggleDeleteMode}
        >
          Cancel
        </button>
      );
    } else {
      return (
        <button
          id="delete-mode-toggle"
          className="delete-mode-inactive"
          onClick={this.toggleDeleteMode}
        >
          Edit
        </button>
      );
    }
  }

  displayBooks() {
    let data = this.props.getBooksQuery;

    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      if (this.state.deleteMode) {
        return data.books.map((book, idx) => {
          return <EditBook key={book.id} book={book} />;
        });
      } else {
        return data.books.map((book, idx) => {
          return (
            <tr id="book-item" key={book.id}>
              <td id="row-number">{idx + 1}</td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
            </tr>
          );
        });
      }
    }
  }

  render() {
    return (
      <div id="book-list">
        <div id="delete-mode-toggle-container">
          <div id="delete-mode-toggle" onClick={this.toggleDeleteMode}>
            {this.toggleDeleteButton()}
          </div>
        </div>

        <table id="displayed-books">
          <th id="cell-filler" />
          <th>Name</th>
          <th>Author</th>
          <th>Genre</th>
          {this.displayBooks()}
          <AddBook />
        </table>
      </div>
    );
  }
}

export default compose(graphql(getBooksQuery, { name: "getBooksQuery" }))(
  BookList
);
