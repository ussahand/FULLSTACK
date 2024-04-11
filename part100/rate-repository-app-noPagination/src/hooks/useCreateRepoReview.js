import { useMutation, useApolloClient } from "@apollo/client"
import { CREATE_REPOSITORY_VIEW } from "../graphql/mutations"
import { useEffect } from "react"
import { useNavigate } from "react-router-native"

const useCreateRepoReview = () => {
  const [repoReviewMutation, result] = useMutation(CREATE_REPOSITORY_VIEW, { onError: (e) => console.log('create repo review mutation error: ', e.message) })
  const nav = useNavigate()
  const apolloClient = useApolloClient()

  const submitReview = (values) => {
    values.rating = Number(values.rating)
    // console.log('onpress', values)
    repoReviewMutation({ variables: { review: values } })
  }
  useEffect(() => {
    if (!result.error && !result.loading && result.data) {
      // console.log('new review', result.data)
      apolloClient.resetStore()
      nav('/repositories')
    }
  })

  return { submitReview }
}

export default useCreateRepoReview