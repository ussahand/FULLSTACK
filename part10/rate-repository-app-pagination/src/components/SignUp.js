import { Formik } from "formik"
import * as yup from 'yup'
import { Button } from "../styles"
import FormikInput from '../utils/FormikInput'
import useSignupRedirect from "../hooks/useSignupRedirect"

const SignUp = () => {
  const submitData = useSignupRedirect()

  return <Formik
    initialValues={{
      username: '',
      password: '',
      confirm: '',
    }}
    validationSchema={yup.object().shape({
      username: yup.string().min(2).max(30).required('User name is required'),
      password: yup.string().min(5).max(50).required('Password is required'),
      confirm: yup.string().oneOf([yup.ref('password'),], 'password do not match').required('Password confirmation is required'),
    })}
    onSubmit={v => submitData({username: v.username, password: v.password})}
  >
    {(props) =>
      <>
        <FormikInput {...{ name: 'username', autoFocus: true, ...props }} />
        <FormikInput {...{ name: 'password', secureTextEntry: true, ...props }} />
        <FormikInput {...{ name: 'confirm', secureTextEntry: true, ...props }} />
        <Button title='Signup' onPress={props.handleSubmit} disabled={!props.dirty || !props.isValid} />
      </>
    }
  </Formik>

}

export default SignUp
