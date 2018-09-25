import React from "react";
import { graphql, compose } from "react-apollo";

import { getBooksQuery, addBookMutation } from "../../../queries/queries";

import AddBook from "./addBook";

class BookList extends React.Component {
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

  displayBooks() {
    let data = this.props.data;

    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <div key={book.id}>
            <p>{book.name}</p>
            <p>{book.author}</p>
            <p>{book.genre}</p>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <section id="column-headers">
          <h3>Name</h3>
          <h3>Genre</h3>
          <h3>Author</h3>
        </section>

        <ul id="book-list">{this.displayBooks()}</ul>

        <AddBook />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
