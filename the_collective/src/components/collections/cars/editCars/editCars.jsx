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

  render() {
    return (
      <tr id="car-item" key={this.props.car.id}>
        <td id="delete-button">
          <div onClick={this.deleteCar(this.props.car.id)}>-</div>
        </td>
        <td id="delete-cell">{this.props.car.make}</td>
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
