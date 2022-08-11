import { useState } from 'react'
import { useField } from './hooks/useField'
import { Route, Routes, Link,
  // useParams,
  useMatch,
  useNavigate } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/anecdotes' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`} >{anecdote.content}</Link>

        </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  // const id = useParams().id
  // const anecdote = anecdotes.find( x => x.id === Number(id))
  return(
    <div>
      <h2>{ anecdote.content }</h2>
      <p>author: { anecdote.author }</p>
      has {anecdote.votes} vote
      info: <a href={ anecdote.info } target='blank' >{ anecdote.info }</a>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is Link brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal Link truth more general than the brief tale itself,
      such as to characterize Link person by delineating Link specific quirk or trait, to communicate an abstract idea about Link person, place, or thing through the concrete details of Link short narrative.
      An anecdote is &quot;Link story with Link point.&quot;</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <footer>
    <hr />
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://ussahand.github.io/#info'>https://ussahand.github.io/#info</a> for my other projects.
  </footer>
)


const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: content.author,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create Link new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input { ...content } />
        </div>
        <div>
          author
          <input { ...author } />
        </div>
        <div>
          url for more info
          <input { ...info } />
        </div>
        <button >create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({ message }) => `A new anecdote "${message}" created.`

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 5,
      id: 0
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 1
    }
  ])

  const match = useMatch('/anecdotes/:id') // return a record from a list of records based on id
  const anecdote = match
    ? anecdotes.find( x => x.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = anecdotes.length
    setAnecdotes(anecdotes.concat(anecdote))
    showNotification(anecdote.content)
  }

  const [notification, setNotification] = useState('')
  const [timeId, setTimeId] = useState(null)

  const showNotification = (msg) => {
    setNotification(msg)  //show new notification

    timeId && clearTimeout(timeId)  // clear previous reset notification timeout id
    setTimeId(
      setTimeout( () => setNotification(''), 5000) //reset notification
    )
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(Link => Link.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(Link => Link.id === id ? voted : Link))
  // }
  return (
    // <Router>
    <div>
      <Menu />
      {notification && <Notification message={ notification } />}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        {/* <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} /> */}
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
    // </Router>
  )
}

export default App
