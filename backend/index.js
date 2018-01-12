import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema/typeDefinitions';
import resolvers from './schema/resolvers';

import connect from './mongoconnector'

const start = async () => {
  const mongo = await connect();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();

  app.use('/graphql', bodyParser.json(), 
    graphqlExpress({
      context: {mongo},
      schema,
    })
  );

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  app.listen(5000, () => {
    console.log('Go to http://localhost:3000/graphiql to run queries!');
  });
}
start();