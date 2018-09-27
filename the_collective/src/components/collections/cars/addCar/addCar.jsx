import React from "react";
import { graphql, compose } from "react-apollo";
import "./addCar.css";

import { getCarsQuery, addCarMutation } from "../../../../queries/queries";

class AddCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      make: "Acura",
      model: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderSubmitButton = this.renderSubmitButton.bind(this);
  }

  handleChange(field) {
    return e => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props
      .addCarMutation({
        variables: {
          make: this.state.make,
          model: this.state.model
        },
        refetchQueries: [
          {
            query: getCarsQuery
          }
        ]
      })
      .then(() => {
        this.setState({
          model: ""
        });
      });
  }

  renderSubmitButton() {
    if (this.state.make.length > 0 && this.state.model.length > 0) {
      return (
        <td id="submit-button" className="active" onClick={this.handleSubmit}>
          +
        </td>
      );
    } else {
      return (
        <td id="submit-button" className="inactive">
          +
        </td>
      );
    }
  }

  populateCarMakes() {
    const carMakes = [
      "Acura",
      "Alfa Romeo",
      "Aston Martin",
      "Audi",
      "Bentley",
      "BMW",
      "Bugatti",
      "Buick",
      "Cadillac",
      "Chevrolet",
      "Chrysler",
      "Dodge",
      "Ferrari",
      "Fiat",
      "Ford",
      "GMC",
      "Honda",
      "Hyundai",
      "Infiniti",
      "Jaguar",
      "Jeep",
      "Kia",
      "Koenigsegg",
      "Lamborghini",
      "Land Rover",
      "Lexus",
      "Maserati",
      "Mazda",
      "McLaren",
      "Mercedes-Benz",
      "Mini",
      "Mitsubishi",
      "Nissan",
      "Pagani",
      "Peugeot",
      "Porsche",
      "Ram",
      "Rolls Royce",
      "Saab",
      "Subaru",
      "Suzuki",
      "Tesla",
      "Toyota",
      "Volkswagen",
      "Volvo"
    ];

    return carMakes.map((make, idx) => {
      return (
        <option key={idx} value={make}>
          {make}
        </option>
      );
    });
  }

  render() {
    return (
      <tr id="add-car-container">
        {this.renderSubmitButton()}

        <td className="field">
          <select id="car-options" onChange={this.handleChange("make")}>
            {this.populateCarMakes()}
          </select>
        </td>

        <td className="field">
          <input
            type="text"
            value={this.state.model}
            onChange={this.handleChange("model")}
            placeholder="Add Model..."
          />
        </td>
      </tr>
    );
  }
}

export default compose(
  graphql(getCarsQuery, { name: "getCarsQuery" }),
  graphql(addCarMutation, { name: "addCarMutation" })
)(AddCar);
