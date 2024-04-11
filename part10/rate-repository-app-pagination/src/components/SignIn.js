import { Navigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import SingInFormikForm from './SingInFormikForm';
import { Div, P, Perr } from '../styles';

const SignIn = () => {
  const [signIn, result] = useSignIn()
  // const navigate = useNavigate()

  const submitForm = values => {signIn(values)}
  
  // useEffect(()=>{
  //   if (result.data?.token)
  //   navigate('/', { replace: true })
  // },[result.data])

  return (
    <Div color='bg3rd' style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
      <P fontSize='h2' >Sign in</P>
      <SingInFormikForm callBack={submitForm} />
      {result.error && <Perr>{result.error.message}</Perr>}
      {result.data?.token && <P>{result.data.username} logged in </P>}
      {result.data?.token &&  <Navigate to="/repositories" replace={true} />}
    </Div>
  )
}

export default SignIn;
