import React from "react";
import "./carList.css";

import { getCarsQuery } from "../../../queries/queries";
import { graphql } from "react-apollo";

class CarList extends React.Component {
  constructor(props) {
    super(props);
  }

  displayCars() {
    let data = this.props.data;

    if (data.loading) {
      return <div>Loading cars...</div>;
    } else {
      return data.cars.map((car, idx) => {
        return (
          <tr id="car-item" key={car.id}>
            <td>{idx + 1}</td>
            <td>{car.make}</td>
            <td>{car.model}</td>
          </tr>
        );
      });
    }
  }

  render() {
    return (
      <div id="car-list">
        <table id="displayed-cars">
          <th />
          <th>Make</th>
          <th>Model</th>
          {this.displayCars()}
        </table>
      </div>
    );
  }
}

export default graphql(getCarsQuery)(CarList);
