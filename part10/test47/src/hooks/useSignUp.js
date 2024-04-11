import { useMutation } from "@apollo/client"
import { SIGNUP } from "../graphql/mutations"

const useSignUp = () => {
  const [mutation, result] = useMutation(SIGNUP, { onError: (e) => console.log('create new user mutation error: ', e.message) })

  const submitData = (values) => {
    mutation({ variables: { credentials: values } })
  }

  return [ submitData, result ]
}

export default useSignUp