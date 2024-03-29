const { ApolloServer, gql } = require('apollo-server')
const {v4: uuid} = require('uuid')

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

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type Book {
    title: String! published: Int! author: String! genres: [String!]! id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Query  {
    allBooks(author: String, genre: String): [Book]!
    bookCount: Int!
    allAuthors: [Author!]!
    authorCount: Int!
  }

  type Mutation {
    addBook( title: String!, published: Int!, author: String!, genres: [String!]!): Book

    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    allBooks: (root, args) => 
		books.filter(b => (!args?.author ||  b.author === args.author)
                                        && (!args?.genre || b.genres.find(g => g === args.genre))
                                ),
    
	bookCount: () => books.length,
    
	allAuthors: () => authors.map( a => ({...a, bookCount: books.filter(b => b.author === a.name).length})),
    
	authorCount: () => authors.length,
  },
  
  Mutation: {
    editAuthor: (root, args) => {
      const index = authors.findIndex( a => a.name === args.name)
      if( index === -1 )
        return null
	
      authors[index].born = args.setBornTo
      return {...authors[index], bookCount: getBookCount(args)}
    },

    addBook: (root, args) => {
      createAuthor(args)
      const newBook = {...args, id: uuid()}
      books.push(newBook)
      return newBook
    }
  }
}

function createAuthor(args) {
  const index = authors.findIndex( a => a.name === args.author)
  if ( index > -1 ) 
    return null
  
  const newAuthor = {name: args.author, id: uuid()}
  authors.push(newAuthor)
  return newAuthor
}

function getBookCount(args) {
	return books.filter( b => b.author === args.name ).length
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
