const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const start = async () => {
  await mongoose.connect(MONGODB_URI)
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const auth = req?.headers?.authorization
      if (auth && auth.startsWith('Bearer ')) {
        const decoded = jwt.verify(auth.substring(7), JWT_SECRET)
        const currentUser = await User.findById(decoded.id)
        return { currentUser }
      }
      return { currentUser: null }
    },
  })
  console.log(`Server ready at ${url}`)
}

start().catch((error) => {
  console.log('Error starting server', error.message)
})
