const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, resp) => {
  const users = await User
    .find({})
    .populate('blogs', 'title author url likes')
  resp.json(users)
})

module.exports = usersRouter 