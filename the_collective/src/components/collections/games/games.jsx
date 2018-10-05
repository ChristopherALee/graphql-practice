import React from "react";
import { graphql, compose } from "react-apollo";

import { getGamesQuery } from "../../../queries/queries";

class Games extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="games-section">
        <table id="games-table" />

        <div id="add-game-container" />

        <div id="game-detail-container" />
      </div>
    );
  }
}

export default compose(graphql(getGamesQuery, { name: "getGamesQuery" }))(
  Games
);
