import React from "react";
import { graphql, compose } from "react-apollo";

import {
  getBooksQuery,
  getAuthorsQuery,
  addBookMutation
} from "../queries/queries";

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookName: "",
      genre: "",
      authorId: "5b6a666c1cc787bbaf6fddf0"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          name: this.state.bookName,
          genre: this.state.genre,
          authorId: this.state.authorId
        },
        refetchQueries: [
          {
            query: getBooksQuery
          }
        ]
      })
      .then(() => {
        this.setState({
          bookName: "",
          genre: "",
          authorId: "5b6a666c1cc787bbaf6fddf0"
        });
      });
  }

  displayAuthors() {
    let data = this.props.getAuthorsQuery;

    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            onChange={this.handleChange("bookName")}
            value={this.state.bookName}
          />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={this.handleChange("genre")}
            value={this.state.genre}
          />
        </div>

        <div className="field">
          <label>Author:</label>
          <select
            onChange={this.handleChange("authorId")}
            value={this.state.authorId}
          >
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
