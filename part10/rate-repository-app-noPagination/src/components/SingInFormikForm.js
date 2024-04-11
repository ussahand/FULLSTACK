import { Perr, Input, Button } from '../styles';
import { Formik } from 'formik'
import * as yup from 'yup'

const initialValues = {
  username: '',
  password: '',
}

const validationYupSchema = yup.object().shape({
  username: yup.string().min(3, 'user name should be longer').required('user name is required'),
  password: yup.string().min(4,'password should be longer').required('password is required'),
})

const FormikInput = ({name , placeholder, values, errors, handleChange, ...props}) =>
  <>
    <Input placeholder={placeholder || name} 
      value={values[name]} 
      style={errors[name] && {borderWidth:2, borderColor:'red'}}
      onChangeText={handleChange(name)}
      {...props}
    />
    {errors[name] && <Perr>{errors[name]}</Perr>}
  </>

const SigninForm = ({handleSubmit, dirty, isValid, ...props}) =>
    <>
      <FormikInput {...{name:'username', placeholder:'user name', autoFocus:true, ...props}} />
      <FormikInput secureTextEntry {...{name:'password', ...props}} />
      <Button title='Sign in' onPress={handleSubmit} disabled={!dirty || !isValid} />
    </>

const SingInFormikForm = ({callBack}) => 
  <Formik 
    initialValues={initialValues}
    onSubmit={callBack}
    validationSchema={validationYupSchema}
  >
    {(props) => <SigninForm {...props} />}
  </Formik>

export default SingInFormikForm

/**
  const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helperrs] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helperrs.setValue(value)}
        onBlur={() => helperrs.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};
 */
