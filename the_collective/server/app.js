const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// mlab connection
mongoose.connect(
  "mongodb://creme:fraiche123@ds261342.mlab.com:61342/the_collective",
  {
    useNewUrlParser: true
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to mlab database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log("now listening for requests on port 3000");
});
