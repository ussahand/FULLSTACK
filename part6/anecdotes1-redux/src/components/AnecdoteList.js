import { useDispatch, useSelector } from 'react-redux'
import { actionVote } from '../reducers/anecdoteReducer'

const Anecdote = ( { data }) => {
  const dispatch = useDispatch()
  return (
    <div style={{ paddingTop:'0.5rem' }}>
      { data.content}<br />
      has {data.vote} <button onClick={() => dispatch(actionVote(data)) }>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => b.vote - a.vote))
  const list = anecdotes.map( x => <Anecdote key={x.id} data={x} />)
  return(
    <div style={{ border:'double yellow', padding: '1rem' }}>
      <u style={{ color:'white', fontSize:'1.2rem' }}>Anecdotes List:</u>
      {list}
    </div>
  )
}

export default AnecdoteList