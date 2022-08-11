import { useDispatch } from 'react-redux'
import { loginSignup } from '../reducers/userReducer'

function Login() {

  const divStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.5em',
  }

  const dispatch = useDispatch()
  const loginSignupUser = () => async (e) => {
    e.preventDefault()
    const loginSignupInfo = {
      name: e.target['name'].value,
      userName: e.target['userName'].value,
      password: e.target['password'].value,
    }
    dispatch(loginSignup(loginSignupInfo))
  }

  const flexItemStyle = { flexGrow: 1, marginLeft: '10px', borderRadius: '10px' }
  
  return (
    <form action='' onSubmit={loginSignupUser()} style={{ width: 330 }}>

      <div style={divStyle}>
        <label htmlFor='name' >Name:</label>
        <input id='name' name='name9' placeholder='if it is first time enter your name for sign up' style={ flexItemStyle} />
      </div>

      <div style={divStyle}>
        <label htmlFor='userName' >User Name:</label>
        <input id='userName' name='userName' style={flexItemStyle} minLength='3' required />
      </div>

      <div style={divStyle}>
        <label htmlFor='password'> Password: </label>
        <input type='password' id='password' name='password' style={flexItemStyle} minLength='3' required />
      </div>

      <div style={divStyle}>
        <button type = 'submit' style={{ borderRadius: '10px' }} >login/signup</button>
      </div>
    </form>
  )
}

export default Login