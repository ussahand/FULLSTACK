import { gql } from "@apollo/client"

const BOOK_DETAIL_FRG = gql`
  fragment BookDetails on Book {
    id
    title
    author{
      name
    }
    published
  }
`

export const GET_AUTHORS = gql`
query getAuthors {
  allAuthors {
    name, born, bookCount
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
    allBooks { ...BookDetails }
  }
  ${BOOK_DETAIL_FRG}
`

export const GET_BOOKS_BY_GENRE = gql`
  query getBooks($genre: String) {
    allBooks(genre: $genre) { ...BookDetails }
  }
  ${BOOK_DETAIL_FRG}
`

export const GENRES_LIST = gql`
  query genresList {
    allGenres
  }
`

export const USER_INFO = gql`
  query userInfo {
    me{favouriteGenre, id}
  }
`


export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      ...BookDetails
    }
  }
  ${BOOK_DETAIL_FRG}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const SIGN_UP = gql`
  mutation signup($username: String!, $password: String!, $userFavGenre: String!) {
    createUser(username: $username, password: $password, favouriteGenre: $userFavGenre) {
      username, favouriteGenre
    }
  }
`
