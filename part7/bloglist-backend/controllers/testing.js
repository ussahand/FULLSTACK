const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (req, resp, err) =>{
  await User.deleteMany({})
  await Blog.deleteMany({})
  resp.status(204).end() // A 204 response is terminated by the first empty line after the header fields because it cannot contain a message body.
})

module.exports = testingRouter

// middleware.blogs.forEach(blg => {
//   const newBlog = new Blog({title:blg.title, author:blg.author, url:blg.url, likes:blg.likes})
//  newBlog.save().then(x => info(JSON.stringify(x))).catch(err => error(err))
// })
// blog.save().then(x => info(JSON.stringify(x))).catch(err => error(err))
// Blog.find({})
// .then(list => list.forEach(record => info(JSON.stringify(record)))).catch(err => error(err))
// Blog.deleteMany({}).then(()=>info(200)).catch(()=>error(400))
