import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import { addList } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { getAll } from './services/anecdotes'
import { useEffect } from 'react'

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25'
  const dispatch = useDispatch()

  useEffect(() => {
    // load data from server
    getAll().then(resp => dispatch(addList(resp)))

  }, [dispatch])

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

export default App
