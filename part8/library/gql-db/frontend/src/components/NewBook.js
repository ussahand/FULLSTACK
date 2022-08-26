import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries'
import updateCacheFn from '../utils/updateCacheFn'

export default function NewBook(props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  // const [newBook, {loading, error, data}] = useMutation(CREATE_BOOK,{refetchQueries: [GET_BOOKS, GET_AUTHORS]})
  const [newBook, { loading, error }] = useMutation(CREATE_BOOK, {
    // refetchQueries: [GET_AUTHORS],
    onError: (error) => props.setMessage({ message: error.message, status: 0 })
  })
  // const [newBook, {loading, error, data}] = useMutation(CREATE_BOOK)

  if (!props.show) {
    return null
  }
  if (loading)
    return 'Loading...'
  if (error)
    return 'error occured'

  const submit = async (event) => {
    event.preventDefault()

    // console.log('add book...')
    newBook({
      variables: { title: title, published: parseInt(published), genres: genres, author: author },
      update: (cache, data) => updateCacheFn(cache, data, genres)
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div className='add-book' >
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}
