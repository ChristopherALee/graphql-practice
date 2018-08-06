const express = require("express");
const graphqlHTTP = require("express-graphql");

const app = express();

// /graphql path in url request
// object in graphqlHTTP is the schema
app.use("/graphql", graphqlHTTP({}));

app.listen(3000, () => {
  console.log("now listening for requests on port 3000");
});
