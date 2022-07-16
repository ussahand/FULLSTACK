import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ data }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(voteAnecdote(data))
    dispatch(setNotification(`You voted '${data.content}'`, 5))
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