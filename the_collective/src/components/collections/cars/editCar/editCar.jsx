import React from "react";
import { graphql, compose } from "react-apollo";
import {
  getCarsQuery,
  editCarMutation,
  deleteCarMutation
} from "../../../../queries/queries";

class EditCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.car.id,
      make: this.props.car.make,
      model: this.props.car.model
    };

    this.deleteCar = this.deleteCar.bind(this);
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

  populateCarMakes() {
    return this.props.carMakes.map((make, idx) => {
      if (this.state.make === make) {
        return (
          <option key={idx} value={make} selected>
            {make}
          </option>
        );
      } else {
        return (
          <option key={idx} value={make}>
            {make}
          </option>
        );
      }
    });
  }

  render() {
    return (
      <tr id="car-item" key={this.props.car.id}>
        <td id="delete-button">
          <div onClick={this.deleteCar(this.props.car.id)}>-</div>
        </td>

        <td id="delete-cell">
          <select id="car-options">{this.populateCarMakes()}</select>
        </td>
        <td id="delete-cell">{this.props.car.model}</td>
      </tr>
    );
  }
}

export default compose(
  graphql(getCarsQuery, { name: "getCarsQuery" }),
  graphql(editCarMutation, { name: "editCarMutation" }),
  graphql(deleteCarMutation, { name: "deleteCarMutation" })
)(EditCar);
