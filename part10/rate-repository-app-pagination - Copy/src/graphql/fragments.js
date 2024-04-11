import { gql } from "@apollo/client";

export const REPO_DETAIL = gql`
  fragment RepoDetail on Repository {
    id
    fullName
    description
    language
    forksCount
    ratingAverage
    reviewCount
    stargazersCount
    ownerAvatarUrl
    url
  }
`