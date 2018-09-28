import React from "react";
import { graphql, compose } from "react-apollo";

import {
  getBooksQuery,
  editBookMutation,
  deleteBookMutation
} from "../../../../queries/queries";

class EditBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.book.name,
      author: this.props.book.author,
      genre: this.props.book.genre
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
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
      </tr>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(editBookMutation, { name: "editBookMutation" }),
  graphql(deleteBookMutation, { name: "deleteBookMutation" })
)(EditBook);
