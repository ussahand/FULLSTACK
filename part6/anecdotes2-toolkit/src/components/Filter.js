import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filter'

const Filter = () => {
  const dispatch = useDispatch()
  const inputHandler = (e) => {dispatch(setFilter(e.target.value))}

  return (
    <div style={{ padding: '5px' }}>
      filter: <input onChange={ inputHandler } />
    </div>
  )
}

export default Filter