import { gql } from "@apollo/client"

export const GET_AUTHORS = gql`
query getAuthors {
  allAuthors {
    name, born, bookCount, id
  }
}
`
export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $birthYear: Int!) {
    editAuthor(name: $name, setBornTo: $birthYear) {name born bookCount id}
  }
`

export const GET_BOOKS = gql`
  query getBooks {
    allBooks { title, author, published, id }
  }
`


export const GET_DATA = gql`
  query getData {
    allBooks { title, author, published, id }
    allAuthors { name, born, bookCount  }
  }
`
export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title, author, published, id
    }
  }
`