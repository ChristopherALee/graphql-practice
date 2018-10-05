const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  genre: String,
  platform: String,
  numOfPlayers: String,
  rating: String
});

module.exports = mongoose.model("Game", gameSchema);
