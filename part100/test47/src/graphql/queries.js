import { gql } from '@apollo/client';
import { REPO_DETAIL } from './fragments';

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String)  {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...RepoDetail
        }
      }
    }
  }
  ${REPO_DETAIL}
`;

export const ME_INFO = gql`
  query {
    me{ username }
}
`

export const GET_REPOSITORY = gql`
  query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepoDetail
    }
  }
  ${REPO_DETAIL}
`

export const GET_REVIEWS = gql`
  query($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`