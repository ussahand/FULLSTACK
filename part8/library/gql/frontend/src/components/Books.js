import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries"


const Books = (props) => {
  const { loading, error, data } = useQuery(GET_BOOKS)

  if (!props.show) {
    return null
  }

  if (loading)
    return 'Loading...'
  if (error)
    return 'error occured'

  const books = data.allBooks


  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
