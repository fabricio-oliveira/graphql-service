import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()

function buildRoutes(app, gqlServer) {
    app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(gqlServer));
}

export { app }

export default  buildRoutes