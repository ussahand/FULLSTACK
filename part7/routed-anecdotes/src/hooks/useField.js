import { useState } from 'react'

const useField = (name) => {
  const [value, setValue] = useState('')
  const onChange = (e) => setValue(e.target.value)
  const onReset = () => setValue('')
  return { name, value, onChange, onReset }
}

export { useField }