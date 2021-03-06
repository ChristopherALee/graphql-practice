import React from "react";
import "./carList.css";

import { getCarsQuery, deleteCarMutation } from "../../../queries/queries";
import { graphql, compose } from "react-apollo";

import AddCar from "./addCar/addCar";
import EditCar from "./editCar/editCar";

class CarList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteMode: false,
      sortBy: null,
      makeSort: [null, "ascending", "descending"],
      modelSort: [null, "ascending", "descending"]
    };

    this.carMakes = [
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

    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.sortCarsBy = this.sortCarsBy.bind(this);
  }

  toggleDeleteMode() {
    if (this.state.deleteMode) {
      this.setState({ deleteMode: false });
    } else {
      this.setState({ deleteMode: true });
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

  displayCars() {
    let data = this.props.getCarsQuery;

    if (data.loading) {
      return <div>Loading cars...</div>;
    } else {
      let sortedCars = this.sortCarsBy(this.state.sortBy, data.cars);

      if (this.state.deleteMode) {
        return sortedCars.map((car, idx) => {
          return <EditCar carMakes={this.carMakes} car={car} />;
        });
      } else {
        return sortedCars.map((car, idx) => {
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

  sortBy(field) {
    return e => {
      if (!this.state.deleteMode) {
        this.setState({ sortBy: field });

        let pivotEl, sortedState;

        switch (field) {
          case "make":
            pivotEl = this.state.makeSort[0];
            sortedState = this.state.makeSort.slice(1);
            sortedState.push(pivotEl);

            if (!sortedState[0]) {
              this.setState({ sortBy: null });
            }

            this.setState({
              makeSort: sortedState,
              modelSort: [null, "ascending", "descending"]
            });
            break;
          case "model":
            pivotEl = this.state.modelSort[0];
            sortedState = this.state.modelSort.slice(1);
            sortedState.push(pivotEl);

            if (!sortedState[0]) {
              this.setState({ sortBy: null });
            }

            this.setState({
              makeSort: [null, "ascending", "descending"],
              modelSort: sortedState
            });
            break;
          default:
            break;
        }
      }
    };
  }

  sortCarsBy(field, cars) {
    switch (field) {
      case "make":
        if (this.state.makeSort[0] === "ascending") {
          return cars.sort((a, b) => {
            let aCar = a.make;
            let bCar = b.make;

            if (aCar < bCar) {
              return -1;
            } else if (bCar < aCar) {
              return 1;
            } else {
              return 0;
            }
          });
        } else if (this.state.makeSort[0] === "descending") {
          return cars.sort((a, b) => {
            let aCar = a.make;
            let bCar = b.make;

            if (aCar > bCar) {
              return -1;
            } else if (bCar > aCar) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        break;
      case "model":
        if (this.state.modelSort[0] === "ascending") {
          return cars.sort((a, b) => {
            let aCar = a.model;
            let bCar = b.model;

            if (aCar < bCar) {
              return -1;
            } else if (bCar < aCar) {
              return 1;
            } else {
              return 0;
            }
          });
        } else if (this.state.modelSort[0] === "descending") {
          return cars.sort((a, b) => {
            let aCar = a.model;
            let bCar = b.model;

            if (aCar > bCar) {
              return -1;
            } else if (bCar > aCar) {
              return 1;
            } else {
              return 0;
            }
          });
        }

        break;
      default:
        return cars.sort((a, b) => {
          let aCar = a.id;
          let bCar = b.id;

          if (aCar < bCar) {
            return -1;
          } else if (aCar > bCar) {
            return 1;
          } else {
            return 0;
          }
        });
    }
  }

  sortIcon(field) {
    if (field === "make" && this.state.sortBy === "make") {
      if (this.state.makeSort[0] === "ascending") {
        return <div id="ascending-arrow" />;
      } else if (this.state.makeSort[0] === "descending") {
        return <div id="descending-arrow" />;
      }
    } else if (field === "model" && this.state.sortBy === "model") {
      if (this.state.modelSort[0] === "ascending") {
        return <div id="ascending-arrow" />;
      } else if (this.state.modelSort[0] === "descending") {
        return <div id="descending-arrow" />;
      }
    }
  }

  columnHeaderClassNameToggle() {
    if (this.state.deleteMode) {
      return "column-header-inactive";
    } else {
      return "column-header";
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

          <th
            className={this.columnHeaderClassNameToggle()}
            onClick={this.sortBy("make")}
          >
            <p>Make {this.sortIcon("make")}</p>
          </th>

          <th
            className={this.columnHeaderClassNameToggle()}
            onClick={this.sortBy("model")}
          >
            <p>Model {this.sortIcon("model")}</p>
          </th>

          {this.displayCars()}

          <AddCar carMakes={this.carMakes} />
        </table>
      </div>
    );
  }
}

export default compose(
  graphql(getCarsQuery, { name: "getCarsQuery" }),
  graphql(deleteCarMutation, { name: "deleteCarMutation" })
)(CarList);
