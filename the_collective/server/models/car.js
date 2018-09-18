const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: String,
  model: String
});

module.exports = mongoose.model("Car", carSchema);
