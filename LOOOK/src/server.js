import { ApolloServer,gql } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express'
import http from 'http'
import { typeDefs } from './modules/typeDefs.js'
import { resolvers } from './modules/resolvers.js'
import path from 'path'
import fs from 'fs'

;(async () => {
  const app = express();
  const httpServer = http.createServer(app);
  app.use(express.static(path.join(process.cwd(),'public')))
  app.get('/',(req,res)=>res.sendFile(path.join(process.cwd(),'index.html')))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app  })

  await new Promise(resolve => httpServer.listen({ port: 1889 }, resolve))
  console.log(`🚀 Server ready at http://localhost:1889{server.graphqlPath}`)
})()
