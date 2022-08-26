import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import updateCacheFn from './utils/updateCacheFn'

import { BOOK_ADDED } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from  './components/Login'
import Notify from './components/Notify'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [message, setMessage] = useState({message:'', status:null})
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (x) => {
      const addedBook = x.subscriptionData.data.bookAdded
      setMessage({message: `${addedBook.title} added`, status: 1})
      updateCacheFn(client.cache, addedBook)      
    }
  })

  return (
    <div >

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button> }
        { token && <button onClick={() => setPage('add')}>add book</button> }
        { token && <button onClick={() => setPage('recommend')}>recommend</button> }
        { token && <button onClick={() => {
          console.log('bye bye') 
          localStorage.clear()
          setToken(null)
          setPage('login')
          client.resetStore()
        }}>logout</button> }
      </div>


      <Authors show={page === 'authors'} {...{setMessage}} />

      <Books show={page === 'books'} />
      
      {!token && <Login show={page === 'login'} {...{setMessage, setToken, setPage}} />}
      
      {token && <NewBook show={page === 'add'} {...{setMessage}} />}
      
      {token && <Recommend show={page === 'recommend'} />}

      <Notify {...{message}} />
    </div>
  )
}

export default App
