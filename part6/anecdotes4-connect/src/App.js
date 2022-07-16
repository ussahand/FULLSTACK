import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'

const App = (props) => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25'

  // const dispatch = useDispatch()
  useEffect(() => {
    // load data from server
    // dispatch(initializeAnecdotes())
    props.initializeAnecdotes()
  }, [])

  return (
    <div style={{ backgroundColor: '#1b1c25', color: 'dimgray' }}>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapStateToProps = null
const mapDispatchToProps = { initializeAnecdotes }

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)


export default ConnectedApp
