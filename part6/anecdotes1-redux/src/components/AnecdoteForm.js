import { useDispatch } from 'react-redux'
import { actionNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const onClick = (e) => {
    e.preventDefault()
    dispatch( actionNew(e.target.anecdote.value) )
    e.target.anecdote.value = ''
  }
  return(
    <form style={{ border:'dashed red', padding:'0.4rem' }} onSubmit={ onClick }>
      <h3>Add a new Anecdote</h3>
      <input id='anecdote' type='text' placeholder='Enter a new anecdote' />
      <button>Save</button>
    </form>
  )
}

export default AnecdoteForm