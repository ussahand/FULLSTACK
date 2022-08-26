const { UserInputError } = require('apollo-server')

const bcrypt = require('bcrypt')
const { createToken } = require('../utils/helper')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Authors = require('../models/author')
const Books = require('../models/book')
const User = require('../models/user')
// const { v4: uuid } = require('uuid')

const resolvers = {
  Query: {
    allBooks: async (root, args) => {
      const author = await Authors.findOne({name: args.author})

      let query = args.author ? {author: author._id} : {}
      query = args.genre ? {...query, genres: {$in: [args.genre]}} : query
      return await Books.find(query) // .populate('author')
    },

    bookCount: async () => (await Books.find({})).length,

    allAuthors: async () => {
      const authors = await Authors.find({})
      return authors.map(a => ({ ...a._doc, bookCount: a.books.length, id: a.id }))
    },

    authorCount: async () => (await Authors.find({})).length,
    
    me: async (root, args, dcToken) => await User.findById(dcToken.id),
    
    allGenres: async (root) =>
      (await Books.find({}))
        .reduce((p, c) => [...new Set(p.concat(c.genres))], [])
        
  },//----- End or query
  
  Book: {
    author: async (root) => {
      found = await Authors.findOne({_id: root.author})
      return found._doc
    }
  },
  
  Author: {
    books: async (root) => await Books.find({_id: {$in: root.books}}) 
    
  },

  Mutation: {
    editAuthor: async (root, args) => {
      const found = await Authors.findOne({name: args.name})
      if (!found)
        return null

      found.born = args.setBornTo
      found.save()
        .catch(er => { throw new UserInputError(er.message, { invalidArgs: args }) })

      return found
    },

    addBook: async (root, args) => {
      await createAuthor(args)
      const author = await Authors.findOne({name: args.author})
      const found = await Books.findOne({title: args.title})
      if (found)
        return found

      const newBook = {...args, author: author._id}
      const savedBook = await Books(newBook).save()
        .catch(er => { throw new UserInputError(er.message, { invalidArgs: args, }) })

      author.books.push(savedBook._id)
      author.save()

      pubsub.publish('BOOK_ADDED',{ bookAdded: savedBook }) // for notify subscriber

      return savedBook
    },

    createUser : async(root, args) => {
      let user = await User.findOne({ username: args.username })

      if (user)
        throw new UserInputError(`the username: <${args.username}> is not available`)
      
      return await signup(args)
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user)
        throw new UserInputError("wrong credentials")

      const checkPassword = await bcrypt.compare(args.password, user.passwordHash)
    
      if (!checkPassword)
        throw new UserInputError("wrong credentials")
      
      const token = {value: createToken({...args, id: user._id.toString()})}
      return token
    }
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },  
}

async function createAuthor(args) {
  const found = await Authors.findOne({name: args.author})
  if (found)
    return null

  const newAuthor = await Authors({ name: args.author }).save()
    .catch(er => { throw new UserInputError(er.message, { invalidArgs: args }) })

  return newAuthor
}

async function signup(args) {
  const passwordHash = await bcrypt.hash(args.password, 10)
  
  const newUser = {...args, passwordHash}
  delete newUser.password
  
  const saved = await User(newUser).save()
  return saved
}

module.exports = resolvers