const { ApolloServer } = require('@apollo/server')
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

class HeaderMap extends Map {
  set(key, value) {
    return super.set(key.toLowerCase(), value)
  }

  get(key) {
    return super.get(key.toLowerCase())
  }

  delete(key) {
    return super.delete(key.toLowerCase())
  }

  has(key) {
    return super.has(key.toLowerCase())
  }
}

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

  app.use('/', cors(), express.json(), async (req, res) => {
    const headers = new HeaderMap()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value)
      }
    }

    const requestUrl = new URL(req.originalUrl ?? req.url, 'http://localhost')
    const httpGraphQLRequest = {
      method: req.method.toUpperCase(),
      headers,
      search: requestUrl.search ?? '',
      body: req.body ?? undefined,
    }

    try {
      const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
        httpGraphQLRequest,
        context: async () => ({
          currentUser: await getUserFromAuthHeader(req?.headers?.authorization),
        }),
      })

      for (const [key, value] of httpGraphQLResponse.headers) {
        res.setHeader(key, value)
      }

      res.status(httpGraphQLResponse.status || 200)

      if (httpGraphQLResponse.body.kind === 'complete') {
        res.send(httpGraphQLResponse.body.string)
        return
      }

      for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
        res.write(chunk)
      }

      res.end()
    } catch (error) {
      console.error('GraphQL request failed', error)
      res.status(500).send('Internal server error')
    }
  })

  httpServer.listen({ port: 4000 }, () => {
    console.log('Server ready at http://localhost:4000/')
  })
}

start().catch((error) => {
  console.log('Error starting server', error.message)
})
