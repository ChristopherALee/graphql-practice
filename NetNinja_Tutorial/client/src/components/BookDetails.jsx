import React from "react";
import { graphql } from "react-apollo";

import { getBookQuery } from "../queries/queries";

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="book-details">
        <p>Output book details</p>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookDetails);
