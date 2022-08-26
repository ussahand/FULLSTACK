const { gql } = require('apollo-server')

const typeDefs = gql`
  type Book {
    title: String! 
    published: Int! 
    author: Author! 
    genres: [String!]! 
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    books: [Book]
    id: ID!
    bookCount: Int
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query  {
    allBooks(author: String, genre: String): [Book]!
    bookCount: Int!
    allAuthors: [Author!]!
    authorCount: Int!
    me: User
    allGenres: [String!]!
  }

  type Mutation {
    addBook( title: String!, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, password: String!, favouriteGenre: String!) : User
    login(username: String!, password: String!): Token
  }
`
module.exports = typeDefs