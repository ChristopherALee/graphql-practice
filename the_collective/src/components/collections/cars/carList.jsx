import React from "react";
import "./carList.css";

import { getCarsQuery, deleteCarMutation } from "../../../queries/queries";
import { graphql, compose } from "react-apollo";

import AddCar from "./addCar/addCar";

class CarList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteMode: false
    };

    this.deleteCar = this.deleteCar.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
  }

  toggleDeleteMode() {
    if (this.state.deleteMode) {
      this.setState({
        deleteMode: false
      });
    } else {
      this.setState({
        deleteMode: true
      });
    }
  }

  toggleDeleteButton() {
    if (this.state.deleteMode) {
      return (
        <button
          id="delete-mode-toggle"
          className="delete-mode-active"
          onClick={this.toggleDeleteMode}
        >
          Cancel
        </button>
      );
    } else {
      return (
        <button
          id="delete-mode-toggle"
          className="delete-mode-inactive"
          onClick={this.toggleDeleteMode}
        >
          Edit
        </button>
      );
    }
  }

  deleteCar(id) {
    return e =>
      this.props.deleteCarMutation({
        variables: {
          id: id
        },
        refetchQueries: [
          {
            query: getCarsQuery
          }
        ]
      });
  }

  displayCars() {
    let data = this.props.getCarsQuery;

    if (data.loading) {
      return <div>Loading cars...</div>;
    } else {
      if (this.state.deleteMode) {
        return data.cars.map((car, idx) => {
          return (
            <tr id="car-item" key={car.id}>
              <td id="delete-button">
                <div onClick={this.deleteCar(car.id)}>-</div>
              </td>
              <td>{car.make}</td>
              <td>{car.model}</td>
            </tr>
          );
        });
      } else {
        return data.cars.map((car, idx) => {
          return (
            <tr id="car-item" key={car.id}>
              <td id="row-number">{idx + 1}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
            </tr>
          );
        });
      }
    }
  }

  render() {
    return (
      <div id="car-list">
        <div id="delete-mode-toggle-container">
          <div id="delete-mode-toggle" onClick={this.toggleDeleteMode}>
            {this.toggleDeleteButton()}
          </div>
        </div>

        <table id="displayed-cars">
          <th id="cell-filler" />
          <th>Make</th>
          <th>Model</th>
          {this.displayCars()}
          <AddCar />
        </table>
      </div>
    );
  }
}

// export default graphql(getCarsQuery)(CarList);
export default compose(
  graphql(getCarsQuery, { name: "getCarsQuery" }),
  graphql(deleteCarMutation, { name: "deleteCarMutation" })
)(CarList);
