const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// blogRouter.get('/', (req, resp, nxt) =>
//    Blog.find({}).then(list => resp.json(list)).catch(err => nxt(err)))

// blogRouter.get('/', async (req, resp) => {
//   // await Blog.deleteMany({})
//   const list = await Blog.find({})
//     resp.json(list)
// })

blogRouter.get('/', async (req, resp) => {
  // const list = await User.findById(req.token.userId).populate('blogs')

  // the below marked is correct solution because it shows only authorized user blogs,
  // but I disabled due to Fullstack exersize demands.

  const list = await User.findById(req.token.userId)
    .populate({
      path: 'blogs',
      populate: { path: 'user', select: 'name userName' },
    })
  resp.json(list.blogs)

  // The below code is only for fullstack excercises
//  const list = await Blog.find({})
  //  .populate({ path: 'user', select: 'name userName' })
  // resp.json(list)
})

// blogRouter.get('/:id', (req, resp, nxt) =>
//   Blog.findById(req.params.id)
//   .then(record => resp.json(record))
//   .catch(err => nxt(err)
//   ))

// blogRouter.get('/:id', async (req, resp) => {
//   const found = await Blog.findById(req.params.id)
//   found
//     ? resp.json(found)
//     : resp.status(404).send('record was not find')
// })

// blogRouter.get('/:id', async (req, resp) => {
//   const loggedinUser = tokenExtractor(req)
//   const found = await User.findById(loggedinUser.userId)
//     .populate({path: 'blogs',
//               match: {_id: req.params.id},
//             })
//   found
//     ? resp.json(found.blogs)
//     : resp.status(404).send('record was not find')
// })

blogRouter.get('/:id', async (req, resp) => {
  const loggedinUser = req.token
  const found = await Blog
    .findOne({ _id: req.params.id, user: loggedinUser.userId })
  found
    ? resp.json(found)
    : resp.status(404).send('record was not find')
})

// blogRouter.post('/', (req, resp, nxt) => {
//   const { title } = req.body
//   Blog.find({ title }).then(records => {
//     records.length
//       ? resp.status(404).send({ error: 'title must be unique' })
//       : Blog(req.body).save().then(saved => resp.status(201).json(saved)).catch(err => nxt(err))
//   }).catch(err => nxt(err))
// })

// blogRouter.post('/', async (req, resp) => {
//   const { title } = req.body
//   const records = await Blog.find({ title })
//   if ( records.length ) resp.status(404).send({ error: 'title must be unique' })
//   else {
//     const savedBlog = await Blog(req.body).save()
//     resp.status(201).json(savedBlog)
//   }
// })

blogRouter.post('/', async (req, resp) => {
  const loggedinUser = req.token
  // Blog.deleteMany({})
  const { title } = req.body
  const records = await Blog.find({ title })
  if (records.length) { resp.status(404).send({ error: 'title must be unique' }) } else {
    const content = { ...req.body, user: loggedinUser.userId } // add user id to a new blog
    const savedBlog = await Blog(content).save()
    const userRecord = await User.findById(loggedinUser.userId)
    userRecord.blogs.push(savedBlog._id) // add saved blog id in the user schema blogs array
    await User.findByIdAndUpdate(loggedinUser.userId, userRecord, { new: true })
    resp.status(201).json(savedBlog)
  }
})

// blogRouter.delete('/:id', (req, resp, next) => {
//   Blog.findByIdAndDelete(req.params.id)
//     .then(record => {
//       record
//         ? resp.status(204).send('record deleted successfully.')
//         : resp.status(404).send('record was not find')
//     })
//     .catch(err => next(err))
// })

// blogRouter.delete('/:id', async (req, resp) => {
//   const deleted = await Blog.findByIdAndDelete(req.params.id)
//       deleted
//         ? resp.status(204).send('record deleted successfully.')
//         : resp.status(404).send('record was not find')
// })

blogRouter.delete('/:id', async (req, resp) => {
  const loggedinUser = req.token
  const found = await Blog.find({ _id: req.params.id, user: loggedinUser.userId })
  if (found.length === 0) {
    resp.status(404).send('record was not find')
    return
  }

  const deleted = await Blog.findByIdAndDelete(found[0]._id)
  if (deleted) {
    const userToUpdate = await User.findById(loggedinUser.userId)
    const index = userToUpdate.blogs.indexOf(found[0]._id) // or req.params.id
    userToUpdate.blogs.splice(index, 1)
    userToUpdate.save()
    resp.status(204).send('record deleted successfully.')
  } else { resp.status(404).send('record was not find') }
})

// blogRouter.put('/:id', (req, resp, next) => {
//   Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(record => {
//       record
//         ? resp.json(record)
//         : resp.status(404).send('record was not find')
//     })
//     .catch(err => next(err))
// })

// blogRouter.put('/:id', async (req, resp) => {
//   const record = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
//   record
//     ? resp.json(record)
//     : resp.status(404).send('record was not find')
// })

blogRouter.put('/:id', async (req, resp) => { // blog id
  const loggedinUser = req.token
  const foundDoc = await Blog.findOne({ _id: req.params.id, user: loggedinUser.userId })
  if (!foundDoc) {
    resp.status(404).send('record was not find')
    return
  }

  const record = await Blog
    .findByIdAndUpdate(foundDoc._id, { ...foundDoc._doc, ...req.body }, { new: true })
  resp.json(record)
})

// function revealObj(obj) {
//   const keys = Object.getOwnPropertyNames(obj)
//   let values=[]
//   keys.forEach(e => values.push(`${e}: ${obj[e]}\n`))
//   info(obj)
// }

// blogRouter.patch('/:id', async (req, resp) => {
//   const found = await Blog.findById(req.params.id)
//   if (!found) resp.status(404).send('record was not find')
//   else {
//     const update = {...found._doc, ...req.body}
//     const record = await Blog.findByIdAndUpdate(req.params.id, update, { new: true })
//     resp.json(record)
//   }
// })

blogRouter.patch('/:id', async (req, resp) => {
  const loggedinUser = req.token
  const foundDoc = await Blog.findOne({ _id: req.params.id, user: loggedinUser.userId })
  if (!foundDoc) {
    resp.status(404).send('record was not find')
    return
  }

  const record = await Blog
    .findByIdAndUpdate(foundDoc._id, { ...foundDoc._doc, ...req.body }, { new: true })
  resp.json(record)
})

module.exports = blogRouter

// middleware.blogs.forEach(blg => {
//   const newBlog = new Blog({title:blg.title, author:blg.author, url:blg.url, likes:blg.likes})
//  newBlog.save().then(x => info(JSON.stringify(x))).catch(err => error(err))
// })
// blog.save().then(x => info(JSON.stringify(x))).catch(err => error(err))
// Blog.find({})
// .then(list => list.forEach(record => info(JSON.stringify(record)))).catch(err => error(err))
// Blog.deleteMany({}).then(()=>info(200)).catch(()=>error(400))
