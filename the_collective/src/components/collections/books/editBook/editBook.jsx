import React from "react";
import { graphql, compose } from "react-apollo";
import "./editBook.css";

import {
  getBooksQuery,
  editBookMutation,
  deleteBookMutation
} from "../../../../queries/queries";

class EditBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.book.id,
      name: this.props.book.name,
      author: this.props.book.author,
      genre: this.props.book.genre,
      isFinishButtonActive: false
    };

    this.toggleActive = this.toggleActive.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editBook = this.editBook.bind(this);
  }

  toggleActive() {
    if (this.state.isFinishButtonActive) {
      return "active-edit";
    } else {
      return "inactive-edit";
    }
  }

  handleChange(field) {
    return e => {
      this.setState({
        [field]: e.target.value,
        isFinishButtonActive: true
      });
    };
  }

  editBook() {
    this.setState({ isFinishButtonActive: false });

    this.props.editBookMutation({
      variables: {
        id: this.state.id,
        name: this.state.name,
        author: this.state.author,
        genre: this.state.genre
      },
      refetchQueries: [
        {
          query: getBooksQuery
        }
      ]
    });
  }

  deleteBook(id) {
    return e => {
      this.props.deleteBookMutation({
        variables: {
          id: id
        },
        refetchQueries: [
          {
            query: getBooksQuery
          }
        ]
      });
    };
  }

  render() {
    let book = this.props.book;

    return (
      <tr id="book-item" key={book.id}>
        <td id="delete-button">
          <div onClick={this.deleteBook(book.id)}>-</div>
        </td>

        <td id="delete-cell">
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </td>
        <td id="delete-cell">
          <input
            type="text"
            value={this.state.author}
            onChange={this.handleChange("author")}
          />
        </td>
        <td id="delete-cell">
          <input
            type="text"
            value={this.state.genre}
            onChange={this.handleChange("genre")}
          />
        </td>

        <td
          id="done-editing"
          className={this.toggleActive()}
          onClick={this.editBook}
        >
          Finish Editing
        </td>
      </tr>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(editBookMutation, { name: "editBookMutation" }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(EditBook);
