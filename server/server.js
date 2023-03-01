const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const { ApolloServer } = require ('@apollo/server');
const { startStandaloneServer } = require ('@apollo/server/standalone');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const startServer = async () => {   

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
return url;
}


startServer().then((url) => {
  console.log(`🚀  Server ready at: ${url}`);
});

// console.log(`🚀  Server ready at: ${url}`);