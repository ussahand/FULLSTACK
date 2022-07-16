import { connect } from 'react-redux'
// import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  const onClick = async (e) => {
    e.preventDefault()

    const content = e.target.anecdote.value
    e.target.anecdote.value = ''

    // dispatch(createAnecdote(content))
    // dispatch(setNotification(`You created a new anecdote '${content}'`, 5))
    props.createAnecdote(content)
    props.setNotification(`You created a new anecdote '${content}'`, 5)
  }
  return(
    <form style={{ border:'dashed red', padding:'0.4rem' }} onSubmit={ onClick }>
      <h3>Add a new Anecdote</h3>
      <input id='anecdote' type='text' placeholder='Enter a new anecdote' />
      <button>Save</button>
    </form>
  )
}

const mapDispatchToProps = { createAnecdote, setNotification, }
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)


export default ConnectedAnecdoteForm
