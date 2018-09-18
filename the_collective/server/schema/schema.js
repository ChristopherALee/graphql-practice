const graphql = require("graphql");
const _ = require("lodash");

const Book = require("../models/book");
const Car = require("../models/car");
const Game = require("../models/game");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: { type: GraphQLString }
  })
});

const CarType = new GraphQLObjectType({
  name: "Car",
  fields: () => ({
    id: { type: GraphQLID },
    make: { type: GraphQLString },
    model: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Book.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find({});
      }
    },
    car: {
      type: CarType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Car.findById(args.id);
      }
    },
    cars: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Car.find({});
      }
    },
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Game.findById(args.id);
      }
    },
    games: {
      type: new GraphQLList(CarType),
      resolve(parent, args) {
        return Game.find({});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
