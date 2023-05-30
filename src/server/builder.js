import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import { createServer } from 'http';

// ws
import { WebSocketServer } from 'ws';

// apollo server
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from '@apollo/server/express4'

// graphql 
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers, typeDefs } from "../schemas/index.js";

// graphserver-ws
import { useServer } from "graphql-ws/lib/use/ws";

class BuilderServer {
    constructor(){
        // features Enable
        this.enableGraphqlServer = false
        this.enableGraphqlSubscriber = false

        // graphql
        this.graphqlRootPath = null
        this.serverOptions = {}

        // express app
        this.app = express()
        this.port = 4000;
        this.router = express.Router()
    }

    // graphql
    setGraphqlRoot(path) {
        this.graphqlRootPath = path
        return this
    }

    setGraphql() {
        this.enableGraphqlServer = true
        return this
    }

    setGraphqlSubscriber() {
        this.enableGraphqlSubscriber = true
        return this
    }
    
    // express 
    setCors() {
        this.app.use(cors());
        return this
    }
    
    setBodyParser() {
        this.app.use(bodyParser.json())
        return this
    }

    setPort(port) {
        this.port = port;
        return this
    }

    setRoute(method, path, cb){
        if (method == 'GET') 
            this.router.get(path, cb)
        else if (method == 'POST')
            this.router.post(path, cb)
        else if (method == 'PUT')
            this.router.put(path, cb)
        else if (method == 'DELETE')
            this.router.delete(path, cb)
        
        return this
    }

    setHealthCheck(path){
        this.setRoute('GET', path, (_, res) => {
            res.send({msg: "health"})
        })
        return this
    }
    
    // build
   async build() {

        const httpServer = createServer(this.app);

         // build schema and pubSub for graphql
        if (this.enableGraphqlServer) {
            this.schema = makeExecutableSchema({ typeDefs, resolvers });
            const pubSub = new PubSub();
            this.context = { pubSub: pubSub }
        }

        // enable wsServer ( for graphql subscriber)
        if (this.enableGraphqlSubscriber) {
            if (!this.graphqlRootPath) throw new Error("grapqlRootPath nees to be defined")
            
            const wsServer = new WebSocketServer({
                server: httpServer,
                path: this.graphqlRootPath,
            })

            this.serverCleanup = useServer(
              {
                schema: this.schema,
                context: this.context
              },
              wsServer
            );

            this.serverOptions =  { 
                async serverWillStart() {
                return {
                  async drainServer() {
                    await serverCleanup.dispose();
                  },
                };
              },
            }
        }

        // enable graphqlServer
        if (this.enableGraphqlServer) { 
            if (!this.graphqlRootPath) throw new Error("grapqlRootPath nees to be defined")
            
            const gqlServer = new ApolloServer({
              schema: this.schema,
              plugins: [
                ApolloServerPluginDrainHttpServer({ httpServer }),

                // Proper server shutdown.
                this.serverOptions,
              ],
            });

            await gqlServer.start();
            this.app.use(this.graphqlRootPath, expressMiddleware(gqlServer, {context:  async () => this.context}));
        }

        // enable routes
        this.app.use('/', this.router)

        httpServer.listen(this.port, () => {
            console.log(`🚀 Http server ready at http://localhost:${this.port}`);
            if (this.enableGraphqlServer) console.log(`🚀 Graphql server ready at http://localhost:${this.port}${this.graphqlRootPath}`);
        });

    }

}

export default BuilderServer