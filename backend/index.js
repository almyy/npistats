import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";
import typeDefs from "./schema/typeDefinitions";
import resolvers from "./schema/resolvers";

import connect from "./mongoconnector";

const DEFAULT_PORT = 4000;
const start = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();

  if (true) {
    const staticPath = path.join(__dirname, "../../build");

    console.log("Production, serving static files from " + staticPath);
    app.use(express.static(path.resolve("build")));
  } else {
    console.log("Env is not production, not serving any static files.");
  }

  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress({
      schema,
    })
  );

  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

  app.listen(process.env.PORT || DEFAULT_PORT, () => {
    console.log(
      `Go to http://localhost:${process.env.PORT || DEFAULT_PORT}/graphiql to run queries!`
    );
  });
};
start();
