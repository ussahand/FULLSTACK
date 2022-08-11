const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
// const Blog = require('./models/blog')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const commentRouter = require('./controllers/comment')

// toDo: print has weird act whe you give an object as a parameter
const app = express()

info('#yellow;THE ENVIRONMENT IS:#magenta ', process.env.NODE_ENV)

mongoose.connect(config.MONGODB_URI)
  .then(() => info('DB connected...'))
  .catch(err => error(err))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing/', testingRouter)
}

app.use('/api/blogs', commentRouter) // only for comments path
app.use('/api/login/', loginRouter)
app.use('/api/users', usersRouter)

app.use(middleware.tokenExtractor)// <-- all blogs routes
// need token extractor so it must be load before blogrouter
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorhandler)

module.exports = app
