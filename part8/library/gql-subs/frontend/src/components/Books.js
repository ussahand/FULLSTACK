import { useState } from "react"
import { useQuery } from "@apollo/client"
import { GENRES_LIST } from "../queries"
import FilteredBooks from "./FilteredBooks"

const Books = (props) => {
  const [choice, setChoice] = useState({})

  const genres = useQuery(GENRES_LIST)

  const select = (e) => {
    if (e.target.id === 'All Genres')
      return setChoice({})
    
    setChoice({genre: e.target.id})
  }

  if (!props.show) {
    return null
  }

  if (genres.loading)
    return 'Loading...'
  if (genres.error)
    return 'error occured'

  const genList = genres.data.allGenres.concat('All Genres')

  return (
    <div>
      <h2>books</h2>
      <p>Filter books based on genrie</p>
      <p>Your selection is: <i className='emphasis' >{choice.genre}</i></p>
      {genList.map((g,i) => <button key={i} id={g} onClick={select}>{g}</button>)}

      <FilteredBooks genre={choice}/>
    </div>
  )
}

export default Books
