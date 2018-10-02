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

    this.handleChange = this.handleChange.bind(this);
    this.editCar = this.editCar.bind(this);
    this.deleteCar = this.deleteCar.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  editCar() {
    this.props.editCarMutation({
      variables: {
        id: this.state.id,
        make: this.state.make,
        model: this.state.model
      },
      refetchQueries: [
        {
          query: getCarsQuery
        }
      ]
    });
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
          <select id="car-options" onChange={this.handleChange("make")}>
            {this.populateCarMakes()}
          </select>
        </td>

        <td id="delete-cell">
          <input
            type="text"
            value={this.state.model}
            onChange={this.handleChange("model")}
          />
        </td>

        <td id="done-editing" onClick={this.editCar}>
          Finish Editing
        </td>
      </tr>
    );
  }
}

export default compose(
  graphql(getCarsQuery, { name: "getCarsQuery" }),
  graphql(editCarMutation, { name: "editCarMutation" }),
  graphql(deleteCarMutation, { name: "deleteCarMutation" })
)(EditCar);
