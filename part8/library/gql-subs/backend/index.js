const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const http = require('http')

const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const depthLimit = require('graphql-depth-limit')
console.log(444, depthLimit)

const typeDefs = require('./gql/schema')
const resolvers = require('./gql/resolvers')
const context = require('./gql/context')

const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')

mongoose.connect(MONGODB_URI)
  .then( resp => console.log('connected ...'))
  .catch( e => console.log("couldn't connect",  e))

// mongoose.set('debug', true)

// const initializeDb = require('./utils/initializer')
// initializeDb() // run only when you want to initialize the authors and books

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context,
// })

// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`)
// })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '',
    }
  )

  const server = new ApolloServer({
    schema,
    validationRules: [ depthLimit(2) ],
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },      
    ],
  })

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

// call the function that does the setup and starts the server
start()