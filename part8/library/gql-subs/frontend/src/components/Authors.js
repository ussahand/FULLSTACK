import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_AUTHORS, UPDATE_AUTHOR } from '../queries'


export default function Authors(props) {  
  const { loading, error, data } = useQuery(GET_AUTHORS)
  
  const [mutate, dbResp] = useMutation(UPDATE_AUTHOR, { 
    onError: (error,data) => props.setMessage({message: error.message, status:0}),
    update: (cache, {data: {editAuthor}}) => 
      cache.updateQuery({query: GET_AUTHORS}, ({allAuthors}) => {
        const updatedAuthors = allAuthors.map( x => x.name === editAuthor.name ? {...x, born: editAuthor.born} : x)
        return ({ allAuthors: updatedAuthors })
      })
  })
  const [selected, select] = useState(null)

  const updateAuthor = (name, birthYear) => 
    mutate({variables: { name, birthYear },}) // Author will return ID so it will update cache directly

  // console.log('selected', selected)

  if (!props.show) {
    return null
  }

  if (loading || dbResp.loading)
    return 'Loading...'
  if (error || dbResp.loading)
    return 'error occured'

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
              <td><button onClick={() => select(a)}>update</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {selected && <SetBirth {...{ select, selected, updateAuthor }} />}
    </div>
  )
}

function SetBirth({ select, selected, updateAuthor }) {
  const update = (e) => {
    e.preventDefault()
    // console.log('form data',e.target.birthYear.value, e.target.authorName.value, selected)
    updateAuthor(e.target.authorName.value, Number(e.target.birthYear.value))
    select(null) //reset
  }

  return (
    <div>
      <h2>Set birth year</h2>
      <form onSubmit={update}>
        <div>
          <label htmlFor='authorName'>name </label>
          <input id='authorName' value={selected.name} onChange={()=>{}} readOnly />
        </div>
        <div>
          <label htmlFor='birthYear'>birth year </label>
          <input id='birthYear' />
        </div>
        <button>update</button>
      </form>
    </div>
  )
}
