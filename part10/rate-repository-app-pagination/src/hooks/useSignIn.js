import { useEffect, useState } from "react";
import { useMutation, useApolloClient  } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import storage from "../utils/storage";


const useSignIn = () => {
  const [authorization, setAuthorization] = useState(null)
  const [authenticate, result] = useMutation(AUTHENTICATE, {onError: (e) => console.log('mutation error: ', e.message )})
  const apolloClient = useApolloClient ()

  useEffect(() => {
    storage().getItem('authorization')
      .then(savedAuth => setAuthorization(savedAuth))
  }, [])

  const signIn = credentials => {
    authenticate({ variables: { credentials } })
  }

  if (authorization)  // exists in storage
    result.data = authorization
  else if (result.data) {       // result of onSubmit:signIn mutation
    const authorization = {
      username: result.data.authenticate.user.username,
      token: result.data.authenticate.accessToken
    }
    result.data = authorization
    storage().setItem('authorization', authorization)
  }

  useEffect(()=>{
    apolloClient.resetStore()
  },[result.data])
  
  return [signIn, result]
}

export default useSignIn
