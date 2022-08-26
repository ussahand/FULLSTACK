// const mongoose = require('mongoose')
const Books = require('../models/book')
const Authors = require('../models/author')
// require('dotenv').config()

// mongoose.connect( process.env.MONGODB_URI)
//   .then( res => console.log('DB connected properly...'))
//   .catch( err => console.log('error occured', err))

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    // id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    // id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    // id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    // id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    // id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    // id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    // id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

const initDb = async () => {
  console.log('initializer...')
  const promise1 = Books.deleteMany({})
  const promise2 = Authors.deleteMany({})

  await Promise.all([promise1, promise2])
    .then(values => console.log('collection(s) delete summary: ', values))
    .catch(err => console.log('error in collection dropping: ', err))


  await Promise.all(authors.map(async (a, index) => await Authors(a)
    .save()
    .then(r => authors[index].id = r._id)
  ))
    .then(r => console.log('authors loaded to DB...'))

    
  Promise.all(
    books.map(async (book, index) => {
      const author = await Authors.findOne({ name: book.author })

      const savedBook = await Books({ ...book, author: author._id }).save()
      books[index].id = savedBook._id
      books[index].author = author._id

      author.books.push(savedBook._id)
      await author.save() // .then(r => console.log('saved')  )
    })
  ).then(values => console.log('books inserted...'))
}

// const initDb = async () => {
//   await deleteDb()
//   await insertAuthors()
//   await setDb()
//   console.log(77777777)
// newAuthors = await Authors.find({})
// newBooks = await Books.find({})
// console.log('authors: ',newAuthors, newBooks)
// }

module.exports = initDb