import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Navbar from './components/Navbar'
import MessageBox from './components/MessageBox'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'

const blogSort = (a, b) => a.likes - b.likes

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; background: #1b1c25; height: 90vh; color: white'
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState({ text: '', status: 'NONE' })
  // const [showCreateRecord, toggleCreateBox] = useState(false)
  // const [recordIndexForEdit, toggleEditBox] = useState(-1)
  const [addEditMode, toggleAddEditBox] = useState(-2)
  /* addEditMode value:
  == -2: don't display box,
  == -1: add/create a new record
  >= 0 : edit a record, with the index of addEditMode value
  */
  blogService.getUsers()

  // blogService.getLogin()
  const appMsg = () => (msg, status) => {
    setMsg({ text: msg, status: status })
    clearMessage(setMsg, status) // this will run because react setState is not a realtime
  }

  const signOut = () => () => {
    window.localStorage.removeItem('userInfo')
    setBlogs([])
    setUser(null)
    toggleAddEditBox(-2)
  }

  const addBlog = () => async (newBlogInfo) => {
    const createdBlog = await blogService.postBlog(user, appMsg(), newBlogInfo)
    // if there is an exception then createdBlog value will be true so we need to prevent of setBlogs execution
    createdBlog && setBlogs([...blogs, createdBlog].sort(blogSort))
    // document.getElementById('newBlogForm').reset()
    // document.getElementById('title').focus()
  }

  const editBlog = () => async (updatedBlog) => {
    const blogIndex = addEditMode
    const oldBlog = { ...blogs[blogIndex] }
    const editedBlog = await blogService.editBlog(oldBlog.id, user, appMsg(), updatedBlog)
    // if there is an exception then createdBlog value will be true so we need to prevent of setBlogs execution
    editedBlog && setBlogs([...blogs.slice(0, blogIndex), editedBlog, ...blogs.slice(blogIndex + 1)].sort(blogSort))
    editedBlog && toggleAddEditBox(-2)
  }

  const deleteBlog = () => async (blog) => {
    const yn = window.confirm(`Do you want to delete <${blog.title}> by ${blog.author} ?`)
    yn && await blogService.delBlog(blog.id, user, appMsg())
    yn && setBlogs([...blogs.slice(0, blog.indx), ...blogs.slice(blog.indx + 1)])
  }

  // useEffect(() => {
  //   if (addEditMode >= 0) {
  //     document.getElementById('newBlogForm').reset()
  //     document.getElementById('likes').focus()
  //   }
  // }, [addEditMode])

  // const [dummy, setDummy] = useState({x:1})
  // setDummy({x:2})
  // setDummy({x:3})

  // useEffect(()=>{
  //   console.log('in the dummy', dummy)
  // },[dummy.x])


  useEffect(() => { // eslint-disable-next-line
    user && !blogs?.length && // eslint-disable-line
      blogService.getBlogs(user, appMsg())
        .then(blogs => setBlogs(blogs.sort(blogSort)))
        .catch(err => {
          err.response.data.error === 'Session expirded, Please login again' &&
            setUser(null)
          appMsg()(err.response.data.error, 'FAILURE')
        }
        )
    !user && setBlogs([])
  }, [user?.token, blogs?.length])

  const loginSignup = () => async (e) => {
    e.preventDefault()
    const loginSignupInfo = {
      name: e.target['name'].value,
      userName: e.target['userName'].value,
      password: e.target['password'].value,
    }

    try {
      const loggedinUser = await blogService.authenticate(loginSignupInfo, appMsg())
      appMsg()(`${loggedinUser.name} logged in successfully`, 'SUCCESS')
      window.localStorage.setItem('userInfo', JSON.stringify(loggedinUser))
      setUser(loggedinUser)
    } catch (err) {
      console.log('Authentication error')
    }
  }

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem('userInfo')
      setUser(JSON.parse(storedUser))
    } catch (error) {
      console.log('parse token error', error.message)
    }
  }, [])

  // useEffect(()=>
  //   clearMessage(setMsg, 5000)
  // , [msg?.status])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <div style={{ height: '15vh', backgroundColor: 'black' }}>
        <MessageBox msg={msg} />
      </div>
      <div style={{ flex: '1 1 auto' }}>
        <Navbar user={user} signOutHandle={signOut()} createHandle={toggleAddEditBox} />
        {
          !user
            ? <Login handler={loginSignup()} user={user} />
            : <>
              {addEditMode === -1 && <CreateBlog addUpdate={addBlog()} toggleBox={toggleAddEditBox} />}
              {addEditMode >= 0 && <CreateBlog addUpdate={editBlog()} toggleBox={toggleAddEditBox} blog={blogs[addEditMode]} />}

              {blogs?.length > 0 && blogs.map((blog, indx) =>
                <Blog key={blog.id} blog={{ ...blog, indx }} delBlogHandle={deleteBlog()} editHandle={toggleAddEditBox} />)}
            </>
        }
      </div>
    </div>
  )
}

function clearMessage(resetMsgHandler, status) { // resetMsgHandlet is pointer to setMsg
  const timeOut = {
    SUCCESS: 3000, //mili second
    FAILURE: 5000,
    WARNING: 3500,
  }

  setTimeout(() => {
    resetMsgHandler({ text: '', status: 'NONE' })
  }, timeOut[status])
}

export default App
