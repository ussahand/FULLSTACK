const { ApolloServer } = require('apollo-server')
const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolvers')
const context = require('./gql/context')

const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

mongoose.connect(MONGODB_URI)
  .then( resp => console.log('connected ...'))
  .catch( e => console.log("couldn't connect",  e))

// const initializeDb = require('./utils/initializer')
// initializeDb() // run only when you want to initialize the authors and books

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
