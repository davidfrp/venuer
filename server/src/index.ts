import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { authContext } from './authContext'
import mongoose from 'mongoose'
import express from 'express'
import http from 'http'

// import typeDefs from './graphql/typeDefs'
// import resolvers from './graphql/resolvers'
import { makeSchema } from './graphql/schemaBuilder'

startApolloServer()

async function startApolloServer () {
  const schema = await makeSchema()

  try {
    await mongoose.connect(process.env.MONGO_URI as string)
  } catch (err) {
    return console.error(err)
  }

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: authContext
  })

  await server.start()
  server.applyMiddleware({ app })

  const PORT = process.env.PORT || 4000

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
}
