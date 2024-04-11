import { gql } from '@apollo/client';
import { REPO_DETAIL } from './fragments';

export const GET_REPOSITORIES = gql`
  query($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String)  {
    repositories(first:$first, after:$after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      totalCount
      edges {
        node {
          ...RepoDetail
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPO_DETAIL}
`;

export const ME_INFO = gql`
query ($includeReviews: Boolean = false, $first: Int, $after: String) {
  me {
    id
    username
    reviews(first: $first, after: $after) @include(if: $includeReviews) {
      totalCount
      edges {
        node {
          id
          repository {
            fullName
          }
          text
          rating
          createdAt   
          repositoryId
        }
        cursor
      }
      pageInfo {
                  endCursor
        startCursor
        hasNextPage
      }
    }
  }
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
  query($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
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
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`
