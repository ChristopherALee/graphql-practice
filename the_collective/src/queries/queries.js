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

const getCarsQuery = gql`
  {
    cars {
      make
      model
      id
    }
  }
`;

const addCarMutation = gql`
  mutation($make: String!, $model: String!) {
    addCar(make: $make, model: $model) {
      make
      model
      id
    }
  }
`;

export { getBooksQuery, addBookMutation, getCarsQuery, addCarMutation };
