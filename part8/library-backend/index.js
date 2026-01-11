const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const cors = require('cors')
const express = require('express')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

if (!MONGODB_URI) {
  console.log('MONGODB_URI not set')
  process.exit(1)
}

if (!JWT_SECRET) {
  console.log('JWT_SECRET not set')
  process.exit(1)
}

mongoose.set('strictQuery', false)

const schema = makeExecutableSchema({ typeDefs, resolvers })

const getUserFromAuthHeader = async (authorization) => {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return null
  }
  const decoded = jwt.verify(authorization.substring(7), JWT_SECRET)
  return User.findById(decoded.id)
}

const start = async () => {
  await mongoose.connect(MONGODB_URI)

  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        const authorization = ctx.connectionParams?.authorization
        const currentUser = await getUserFromAuthHeader(authorization)
        return { currentUser }
      },
    },
    wsServer
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        currentUser: await getUserFromAuthHeader(req?.headers?.authorization),
      }),
    })
  )

  httpServer.listen({ port: 4000 }, () => {
    console.log('Server ready at http://localhost:4000/')
  })
}

start().catch((error) => {
  console.log('Error starting server', error.message)
})
