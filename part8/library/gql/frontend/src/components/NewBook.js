import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries'



const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  // const [newBook, {loading, error, data}] = useMutation(CREATE_BOOK,{refetchQueries: [GET_BOOKS, GET_AUTHORS]})
  const [newBook, {loading, error}] = useMutation(CREATE_BOOK,{refetchQueries: [ GET_AUTHORS]})
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

    console.log('add book...')
    newBook({
      variables: {title: title, published: parseInt(published), genres: genres, author: author},
      update: (cache, {data: {addBook}}) => {
        const { allBooks } = cache.readQuery({ query: GET_BOOKS })
        try {
          cache.writeQuery({
            query: GET_BOOKS,
            data: { allBooks: [...allBooks, addBook] }
          })

        //   let allAuthors = [...cache.readQuery({ query: GET_AUTHORS }).allAuthors]
        //   const index = allAuthors.findIndex(i => i.name === addBook.author)
        //   if (index === -1)
        //     allAuthors.concat({ __typename: "Author", name: addBook.author, born: null, bookCount: 1 })
        //   else {
        //     const author = { ...allAuthors[index] }
        //     author.bookCount++
        //     allAuthors[index] = author
        //   }

        //   cache.writeQuery({
        //     query: GET_AUTHORS,
        //     data: { allAuthors }
        //   })
        } catch (e) { console.log(e) }
      }  
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
    <div>
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

export default NewBook
