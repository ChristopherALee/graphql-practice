import { gql } from "apollo-boost";

const getBooksQuery = gql`
  {
    books {
      name
      genre
      author
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $author: String!) {
    addBook(name: $name, genre: $genre, author: $author) {
      name
      genre
      author
      id
    }
  }
`;

export { getBooksQuery, addBookMutation };
