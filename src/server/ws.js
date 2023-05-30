import { WebSocketServer } from 'ws';

export default (httpServer) => (
    new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    })
  )