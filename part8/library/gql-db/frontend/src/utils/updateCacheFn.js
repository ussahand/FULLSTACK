import { GET_AUTHORS, GET_BOOKS_BY_GENRE, GENRES_LIST } from '../queries'

export default function updateCacheFn(cache, { data: { addBook }}, genres) {
  // 1st solution with updateQuery

  // add new genries to genries list state and throw render related component
  cache.updateQuery({ query: GENRES_LIST }, ({ allGenres }) =>
    ({ allGenres: [...new Set(allGenres.concat(genres))] }))

  // update allBooks with different and not parameter
  genres
    .concat(null) // for query without a parameter
    .forEach(g => {
      try {
        cache.updateQuery({
          query: GET_BOOKS_BY_GENRE,
          variables: g ? { genre: g } : {},

        },
          ({ allBooks }) => ({ allBooks: allBooks.concat(addBook) }))
      } catch (e) { } // if query non exist, do not crash, keep continue
    })

  // 2nd solution with {read and write} query:
  let allAuthors = [...cache.readQuery({ query: GET_AUTHORS }).allAuthors]
  const index = allAuthors.findIndex(aut => aut.name === addBook.author)
  if (index === -1)
    allAuthors.push({ __typename: "Author", name: addBook.author.name, born: null, bookCount: 1 })
  else {
    const author = { ...allAuthors[index] }
    author.bookCount++
    allAuthors[index] = author
  }

  try {
    cache.writeQuery({
      query: GET_AUTHORS,
      data: { allAuthors }
    })
  } catch (e) { console.log('Author cache write error: ', e) }

  /*
  const { allBooks } = cache.readQuery({ query: GET_BOOKS_BY_GENRE })
    cache.writeQuery({
      query: GET_BOOKS_BY_GENRE,
      data: { allBooks: [...allBooks, addBook] }
    })
    */
}
