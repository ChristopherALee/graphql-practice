import React from "react";
import "./carList.css";

import { getCarsQuery } from "../../../queries/queries";
import { graphql } from "react-apollo";

class CarList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="car-list">
        <table id="displayed-cars">
          <th />
          <th>Make</th>
          <th>Model</th>
        </table>
      </div>
    );
  }
}

export default graphql(getCarsQuery)(CarList);
