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
      deleteMode: false,
      sortBy: null,
      nameSort: [null, "ascending", "descending"],
      authorSort: [null, "ascending", "descending"]
    };

    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sortBooksBy = this.sortBooksBy.bind(this);
  }

  toggleDeleteMode() {
    if (this.state.deleteMode) {
      this.setState({ deleteMode: false });
    } else {
      this.setState({ deleteMode: true });
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
      let sortedBooks = this.sortBooksBy(this.state.sortBy, data.books);

      if (this.state.deleteMode) {
        return sortedBooks.map((book, idx) => {
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

  sortBy(field) {
    return e => {
      if (!this.state.deleteMode) {
        this.setState({ sortBy: field });

        let pivotEl, sortedState;

        switch (field) {
          case "name":
            pivotEl = this.state.nameSort[0];
            sortedState = this.state.nameSort.slice(1);
            sortedState.push(pivotEl);

            if (!sortedState[0]) {
              this.setState({ sortBy: null });
            }

            this.setState({
              nameSort: sortedState,
              authorSort: [null, "ascending", "descending"],
              genreSort: [null, "ascending", "descending"]
            });

            break;
          case "author":
            pivotEl = this.state.authorSort[0];
            sortedState = this.state.authorSort.slice(1);
            sortedState.push(pivotEl);

            if (!sortedState[0]) {
              this.setState({ sortBy: null });
            }

            this.setState({
              nameSort: [null, "ascending", "descending"],
              authorSort: sortedState,
              genreSort: [null, "ascending", "descending"]
            });

            break;
          case "genre":
            pivotEl = this.state.genreSort[0];
            sortedState = this.state.genreSort.slice(1);
            sortedState.push(pivotEl);

            if (!sortedState[0]) {
              this.setState({ sortBy: null });
            }

            this.setState({
              nameSort: [null, "ascending", "descending"],
              authorSort: [null, "ascending", "descending"],
              genreSort: sortedState
            });

            break;
          default:
            break;
        }
      }
    };
  }

  sortBooksBy(field, books) {
    switch (field) {
      case "name":
        if (this.state.nameSort[0] === "ascending") {
          return books.sort((a, b) => {
            let aBook = a.name;
            let bBook = b.name;

            if (aBook < bBook) {
              return -1;
            } else if (bBook < aBook) {
              return 1;
            } else {
              return 0;
            }
          });
        } else if (this.state.nameSort[0] === "descending") {
          return books.sort((a, b) => {
            let aBook = a.name;
            let bBook = b.name;

            if (aBook > bBook) {
              return -1;
            } else if (bBook > aBook) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        break;
      case "author":
        if (this.state.authorSort[0] === "ascending") {
          return books.sort((a, b) => {
            let aBook = a.author;
            let bBook = b.author;

            if (aBook < bBook) {
              return -1;
            } else if (bBook < aBook) {
              return 1;
            } else {
              return 0;
            }
          });
        } else if (this.state.authorSort[0] === "descending") {
          return books.sort((a, b) => {
            let aBook = a.author;
            let bBook = b.author;

            if (aBook > bBook) {
              return -1;
            } else if (bBook > aBook) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        break;
      case "genre":
        if (this.state.genreSort[0] === "ascending") {
          return books.sort((a, b) => {
            let aBook = a.genre;
            let bBook = b.genre;

            if (aBook < bBook) {
              return -1;
            } else if (bBook < aBook) {
              return 1;
            } else {
              return 0;
            }
          });
        } else if (this.state.genreSort[0] === "descending") {
          return books.sort((a, b) => {
            let aBook = a.genre;
            let bBook = b.genre;

            if (aBook > bBook) {
              return -1;
            } else if (bBook > aBook) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        break;
      default:
        return books.sort((a, b) => {
          let aBook = a.id;
          let bBook = b.id;

          if (aBook < bBook) {
            return -1;
          } else if (bBook < aBook) {
            return 1;
          } else {
            return 0;
          }
        });
    }
  }

  sortIcon(field) {
    if (field === "name" && this.state.sortBy === "name") {
      if (this.state.nameSort[0] === "ascending") {
        return <div id="ascending-arrow" />;
      } else if (this.state.nameSort[0] === "descending") {
        return <div id="descending-arrow" />;
      }
    } else if (field === "author" && this.state.sortBy === "author") {
      if (this.state.authorSort[0] === "ascending") {
        return <div id="ascending-arrow" />;
      } else if (this.state.authorSort[0] === "descending") {
        return <div id="descending-arrow" />;
      }
    } else if (field === "genre" && this.state.sortBy === "genre") {
      if (this.state.genreSort[0] === "ascending") {
        return <div id="ascending-arrow" />;
      } else if (this.state.genreSort[0] === "descending") {
        return <div id="descending-arrow" />;
      }
    }
  }

  columnHeaderClassNameToggle() {
    if (this.state.deleteMode) {
      return "column-header-inactive";
    } else {
      return "column-header";
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

          <th
            className={this.columnHeaderClassNameToggle()}
            onClick={this.sortBy("name")}
          >
            <p>Name {this.sortIcon("name")}</p>
          </th>

          <th
            className={this.columnHeaderClassNameToggle()}
            onClick={this.sortBy("author")}
          >
            <p>Author {this.sortIcon("author")}</p>
          </th>

          <th
            className={this.columnHeaderClassNameToggle()}
            onClick={this.sortBy("genre")}
          >
            <p>Genre {this.sortIcon("genre")}</p>
          </th>

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
