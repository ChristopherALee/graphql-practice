import React from "react";
import { graphql, compose } from "react-apollo";
import "./addBook.css";

import { getBooksQuery, addBookMutation } from "../../../../queries/queries";

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      genre: "",
      author: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderSubmitButton = this.renderSubmitButton.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .addBookMutation({
        variables: {
          name: this.state.name,
          genre: this.state.genre,
          author: this.state.author
        },
        refetchQueries: [
          {
            query: getBooksQuery
          }
        ]
      })
      .then(() => {
        this.setState({
          name: "",
          genre: "",
          author: ""
        });
      });
  }

  renderSubmitButton() {
    if (
      this.state.name.length > 0 &&
      this.state.genre.length > 0 &&
      this.state.author.length > 0
    ) {
      return (
        <td id="submit-button" className="active" onClick={this.handleSubmit}>
          +
        </td>
      );
    } else {
      return (
        <td id="submit-button" className="inactive">
          +
        </td>
      );
    }
  }

  render() {
    return (
      <tr id="add-book-container">
        {this.renderSubmitButton()}

        <td className="field">
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange("name")}
            placeholder="Add Name..."
          />
        </td>

        <td className="field">
          <input
            type="text"
            value={this.state.author}
            onChange={this.handleChange("author")}
            placeholder="Add Author..."
          />
        </td>

        <td className="field">
          <input
            type="text"
            value={this.state.genre}
            onChange={this.handleChange("genre")}
            placeholder="Add Genre..."
          />
        </td>
      </tr>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
