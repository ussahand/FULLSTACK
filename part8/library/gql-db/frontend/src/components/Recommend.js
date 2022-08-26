import { useQuery } from "@apollo/client"
import { USER_INFO } from "../queries"
import FilteredBooks from "./FilteredBooks"

export default function Recommend(props) {
  const { loading, data, error } = useQuery(USER_INFO)

  if (!props.show)
    return null

  if (loading)
    return 'Loading...'
  if (error)
    return 'error occured'

  return (
    <div>
      <h2>Recommendations</h2>
      books in your favourite genre <i className='emphasis'>{data.me.favouriteGenre}</i>
      <FilteredBooks genre={{ genre: data.me.favouriteGenre }} />
    </div>
  )
}