import { useDispatch } from 'react-redux'
import { addRecord } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { postNew } from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const onClick = async (e) => {
    e.preventDefault()

    const savedContent = await postNew({ content: e.target.anecdote.value, vote: 0 })
    e.target.anecdote.value = ''

    console.log('saved', savedContent)
    dispatch( addRecord(savedContent) )
    dispatch( setNotification(`You created a new anecdote '${savedContent}'`))
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
