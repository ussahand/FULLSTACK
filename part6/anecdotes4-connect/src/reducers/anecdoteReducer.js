import { createSlice } from '@reduxjs/toolkit'
import service from '../services/anecdotes'

/* const defaultAnecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
]


const initialState = defaultAnecdotes
  .map((element, index) =>
    ({ id: index, content: element, vote: Math.floor(Math.random() * 10) })
  )
console.log(JSON.stringify(initialState))
 */
const initialState = []
const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    actionNew(state, action) { // don't use this, because server will create
      state.push({ content: action.payload, vote: 0, id: state.length  })
    },
    actionVote(state, action) {
      const id = action.payload
      const foundIndex = state.findIndex( x => x.id === id )
      state[foundIndex].vote += 1
    },
    addRecord(state, action) {
      state.push(action.payload)
    },
    addList(state, action) {
      return action.payload
    }
  }
})

const { actionVote, addList, addRecord } = anecdoteSlice.actions

//use thunk
export const initializeAnecdotes = () => {
  return async paramDispatch => {
    const dbList = await service.getAll()
    paramDispatch(addList(dbList))
  }
}

export const createAnecdote = (content) =>
  async paramDispatch => {
    const saved = await service.postNew({ content, vote: 0 })
    paramDispatch(addRecord(saved))
  }

export const voteAnecdote = (data) =>
  async dispatch => {
    dispatch(actionVote(data.id))
    service.putRecord({ ...data, vote: data.vote + 1 })
  }

export default anecdoteSlice.reducer

/* old scholl format
const initial = []
const anecdoteReducer = (state = initial, { type, data }) => {
  console.log('type and data', type, data)
  switch (type) {
  case 'VOTE':
    return state.map(x => x.id !== data.id ? x : { id: x.id, content: x.content, vote: x.vote + 1 })
  case 'NEW':
    return state.concat({ ...data, vote: 0, id: state.length })
  default:
    return state
  }
}

export const actionNew = (content) => ({ type:'NEW', data:{ content } })
export const actionVote = (data) => ({ type:'VOTE', data })
export default anecdoteReducer
*/
