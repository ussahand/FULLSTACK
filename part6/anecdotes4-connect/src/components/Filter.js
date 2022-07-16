// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filter'

const Filter = (props) => {
  // const dispatch = useDispatch()
  // const inputHandler = (e) => {dispatch(setFilter(e.target.value))}
  const inputHandler = (e) => {props.setFilter(e.target.value)}

  return (
    <div style={{ padding: '5px' }}>
      filter: <input onChange={ inputHandler } />
    </div>
  )
}

const mapDispatchToProps = { setFilter }
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

// export default Filter
export default ConnectedFilter
