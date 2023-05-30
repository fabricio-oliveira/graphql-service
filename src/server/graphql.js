import { ApolloServer } from "@apollo/server";
import { useServer } from "graphql-ws/lib/use/ws";

import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PubSub } from 'graphql-subscriptions';

import { resolvers, typeDefs } from "../schemas/index.js";

async function buildGraphqlServer(httpServer, wsServer) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const pubSub = new PubSub();

  const serverCleanup = useServer(
    {
      schema,
      context: { pubSub }
    },
    wsServer
  );

  const gqlServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await gqlServer.start();

  return gqlServer;
}
export default buildGraphqlServer;
