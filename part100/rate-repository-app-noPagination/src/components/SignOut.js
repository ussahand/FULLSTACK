import { Navigate } from "react-router-native"
import { useApolloClient } from "@apollo/client"
import storage from "../utils/storage"

const SignOut = () => {
  const apolloClient = useApolloClient()

  storage()
    .removeItem('authorization')
    .then(apolloClient.resetStore())

  return <Navigate to="/repositories" replace={true} />
}

export {SignOut as default}
