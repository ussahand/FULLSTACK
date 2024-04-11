import { useEffect, useState } from "react"
import { useNavigate } from "react-router-native"

import useSignUp from "./useSignUp";
import useSignIn from "./useSignIn";

const useSignupRedirect = () => {
  const [credentials, setCredentials] = useState(null) // save credentials for singIn
  const nav = useNavigate() // after signup then signin then navigate
  const [submitSignup, result] = useSignUp()
  const [signIn, result2] = useSignIn()

  const onSignup = (values) => {
    submitSignup(values)
    setCredentials(values)
  }

  // if signup is successfull then signin
  useEffect(() => { 
    if (result.data)
      signIn(credentials)
  }, [result.data])

  // if signin is successfull then navigate
  useEffect(() => {
    if (result2.data)
      nav('/repositories')
  },[result2.data])

  return onSignup
}


export default useSignupRedirect
