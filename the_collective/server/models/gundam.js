const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gundamSchema = new Schema({
  name: String,
  grade: String,
  series: String
});

module.exports = mongoose.model("Gundam", gundamSchema);
