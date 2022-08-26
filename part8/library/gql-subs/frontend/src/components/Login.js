import { useState, useRef } from 'react'
import { LOGIN, SIGN_UP } from '../queries'
import { useMutation } from '@apollo/client'

export default function Login(props) {

  const [inputs, setInput] = useState({
    username: '',
    password: '',
    userFavGenre: '',
  })

  const favRef = useRef(null)

  const [loginMutate, loginResp] = useMutation(LOGIN, { onError: (error) => props.setMessage({message: error.message, status:0}) })
  const [signupMutate, signupResp] = useMutation(SIGN_UP, { onError: (error) => props.setMessage({message: error.message, status:0})})

  if (!props.show)
    return null

  const updateInputs = (e) =>
    setInput({ ...inputs, [e.target.id]: e.target.value })

  let choice = null // login or signup
  const signupClick = (e) => {
    choice = 'signup'
    favRef.current.required = true // it let to validation before onSubmit
  }
  const loginClick = (e) => {
    choice = 'login'
    favRef.current.required = false
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (choice === 'login')
      loginMutate({
        variables: { ...inputs },
        onCompleted: (data) => {
          props.setMessage({message: `${inputs.username} logged in successfully`, status: 1})
          localStorage.setItem('loggedin-user-token', data.login.value)
          props.setToken(data.login.value)
          props.setPage('authors')
        }
      })
    else
      signupMutate({
        variables: { ...inputs },
        onCompleted: (data) => {
          props.setMessage({message: `${inputs.username} signed up successfully. try to login...`, status:1})
          console.log(data)
        }
      })
  }

  if (loginResp.loading || signupResp.loading)
    return 'Loading...'

  return (
    <div>
      <form id='sign-form' onSubmit={onSubmit} >
        <div>
          <div>
            <label htmlFor="username">username</label>
            <input id="username" onChange={updateInputs} value={inputs.username} required autoFocus />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input id='password' onChange={updateInputs} value={inputs.password} required />
          </div>
          <button onClick={loginClick}>login</button>
        </div>
        <div>
          <div>for sign up, enter username, pssaword and bottom fields</div>
          <div >
            <label htmlFor="userFavGenre" >your favourite genre</label>
            <input id="userFavGenre" ref={favRef} onChange={updateInputs} value={inputs.userFavGenre} />
          </div>
          <button onClick={signupClick}>sign up</button>
        </div>
      </form>
    </div>
  )
}
