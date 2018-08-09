import React from "react";
import { graphql } from "react-apollo";

import { getAuthorsQuery } from "../queries/queries";

class AddBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookName: "",
      genre: "",
      author: "5b6a666c1cc787bbaf6fddf0"
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
    console.log(this.state);
  }

  displayAuthors() {
    let data = this.props.data;

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
          <input type="text" onChange={this.handleChange("bookName")} />
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={this.handleChange("genre")} />
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={this.handleChange("author")}>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);
