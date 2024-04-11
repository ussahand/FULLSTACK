import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user { username }
    }
  }
`
export const CREATE_REPOSITORY_VIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      rating
      createdAt
      text
      id
    }
  }
`

export const SIGNUP = gql`
  mutation signup($credentials: CreateUserInput){
    createUser(user: $credentials) {
      username, createdAt
    }
  }

`