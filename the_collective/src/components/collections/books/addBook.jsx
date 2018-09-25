import React from "react";
import { graphql, compose } from "react-apollo";

import { getBooksQuery, addBookMutation } from "../../../queries/queries";

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

  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </div>

        <div className="field">
          <input
            type="text"
            value={this.state.genre}
            onChange={this.handleChange("genre")}
          />
        </div>

        <div className="field">
          <input
            type="text"
            value={this.state.author}
            onChange={this.handleChange("author")}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: "getBooksQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
