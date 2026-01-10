const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.log('MONGODB_URI not set')
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
  })
  console.log(`Server ready at ${url}`)
}

start().catch((error) => {
  console.log('Error starting server', error.message)
})
