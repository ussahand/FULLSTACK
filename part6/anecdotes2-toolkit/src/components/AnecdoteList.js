import { useDispatch, useSelector } from 'react-redux'
import { actionVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { putRecord } from '../services/anecdotes'

const Anecdote = ( { data }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(actionVote(data.id))
    dispatch(setNotification(`You voted '${data.content}'`))
    putRecord({ ...data, vote: data.vote + 1 })
  }

  return (
    <div style={{ paddingTop:'0.5rem' }}>
      { data.content}<br />
      has {data.vote} <button onClick={ handleClick }>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter,  anecdote }) => [...anecdote]
    .sort((a, b) => b.vote - a.vote)
    .filter(item => item.content.includes(filter.value))
  )
  const list = anecdotes.map(x => <Anecdote key={x.id} data={x} />)
  return (
    <div style={{ border: 'double yellow', padding: '1rem' }}>
      <u style={{ color: 'white', fontSize: '1.2rem' }}>Anecdotes List:</u>
      {list}
    </div>
  )
}

export default AnecdoteList