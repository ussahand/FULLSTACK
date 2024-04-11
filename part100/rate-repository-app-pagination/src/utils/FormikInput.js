import { Perr, Input } from '../styles'

const FormikInput = ({ name, placeholder, values, errors, handleChange, styles, ...props }) =>
  <>
    <Input
      placeholder={placeholder || name}
      value={values[name]}
      style={[errors[name] && { borderWidth: 2, borderColor: 'red' }, styles]}
      onChangeText={handleChange(name)}
      {...props}
    />
    {errors[name] && <Perr>{errors[name]}</Perr>}
  </>

export default FormikInput