import { useQuery } from "@apollo/client"
import { GET_BOOKS_BY_GENRE } from "../queries"

export default function FilteredBooks({ genre }) {
  const { loading, error, data } = useQuery(GET_BOOKS_BY_GENRE, {
    variables: genre
  })
  
  if (loading )
    return 'Loading...'
  if (error)
    return 'error occured'

  const books = data.allBooks

  return (
    <table>
    <tbody>
      <tr>
        <th></th>
        <th>author</th>
        <th>published</th>
      </tr>
      {books.map((a,i) => (
        <tr key={i}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
