const { ApolloServer } = require('apollo-server-express');

const schema = require('../schema/collections');

const createApolloServer = (app) => {
  return new Promise(async (resolve, reject) => {
    try {
      const apolloServer = new ApolloServer({
        schema,
      });
      await apolloServer.start();
      apolloServer.applyMiddleware({ app, path: '/graphql' });
      resolve(apolloServer);
    } catch {
      reject(Error('Failed to start apollo server'));
    }
  });
};

module.exports = createApolloServer;
