const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

// connect to mlab database
mongoose.connect(
  "mongodb://creme:test123@ds215502.mlab.com:15502/graphql-test",
  {
    useNewUrlParser: true
  }
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// /graphql path in url request
// object in graphqlHTTP is the schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 3000");
});
