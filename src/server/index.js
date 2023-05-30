import { createServer } from 'http';
import buildRoutes, { app } from './express.js'
import buildWsServer from './ws.js'
import buildGraphqlServer from './graphql.js'

const httpServer = createServer(app);
const wsServer = buildWsServer(httpServer)
const gqlServer = await buildGraphqlServer(httpServer,wsServer)
buildRoutes(app, gqlServer)

const PORT = 4000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});