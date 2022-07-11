const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, resp) => {
  const users = await User
    .find({})
    .populate('blogs', 'title author url likes')
  resp.json(users)
})

usersRouter.get('/info', (req, resp) => {
  resp.send('<h3 style="color:green;border:2px solid red">Hello to blogs list </h3>')
})


module.exports = usersRouter
