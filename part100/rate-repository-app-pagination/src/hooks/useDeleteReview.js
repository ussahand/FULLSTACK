import { useMutation, useApolloClient } from "@apollo/client"
import { DELETE_REVIEW } from "../graphql/mutations"
import { useEffect } from "react"
// import { useNavigate } from "react-router-native"

const useDeleteReview = () => {
  const [delReviewMutation, result] = useMutation(DELETE_REVIEW, { onError: (e) => console.log('Delete Review mutation error: ', e.message) })
  // const nav = useNavigate()
  const apolloClient = useApolloClient()

  const deleteReview = (reviewId) => {
    // console.log('onpress', reviewId)
    delReviewMutation({ variables: { deleteReviewId: reviewId } })
  }

  useEffect(() => {
    if (!result.error && !result.loading && result.data) {
      console.log('reviews: ', result.data)
      apolloClient.resetStore()
      // nav('/repositories')
    }
  })

  return { deleteReview }
}

export default useDeleteReview