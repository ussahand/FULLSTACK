import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ToastBox from './components/ToastBox'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'

import { useDispatch, useSelector } from 'react-redux'
import { blogsReset, blogsLoad } from './reducers/blogsReducer'
import { login, logout } from './reducers/userReducer'

import { Routes, Route, Navigate, Outlet, Link, useParams } from 'react-router-dom'

const sortFn = (a, b) => b.likes - a.likes

export default function App(props) {
  const [users, setUsers] = useState([])
  const [filters, setFilter] = useState({ userId: null, blogId: null })
  const [addEditMode, toggleAddEditBox] = useState(-2)
  /* addEditMode value:
  == -2: don't display box,
  == -1: add/create a new record
  >= 0 : edit a record, with the index of addEditMode value
  */

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => [...blogs].sort(sortFn))
  const user = useSelector(state => state.user)

  users.length === 0 && blogService.getUsers()
    .then(data => setUsers(data))

  const changeFilter = (newFilter) =>
    setFilter({ ...filters, ...newFilter })
  const resetFilter = () => setFilter({ userId: null, blogId: null })


  useEffect(() => {
    resetFilter()
  },[blogs?.length])

  useEffect(() => { // eslint-disable-next-line
    user && !blogs?.length && // eslint-disable-line
      blogService.getBlogs(user, dispatch)
        // .then(blogs => setBlogs(blogs.sort(blogSort)))
        .then(blogs => dispatch(blogsLoad(blogs)))
        .catch(err => {
          err.response.data.error === 'Session expirded, Please login again' &&
            // setUser(null)
            dispatch(logout())
          dispatch(err.response.data.error, 'FAILURE')
        }
        )
    !user && dispatch(blogsReset)
    !user && resetFilter()
  }, [user?.token, blogs?.length, dispatch, user])

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem('userInfo')
      dispatch(login(JSON.parse(storedUser)))
    } catch (error) {
      console.log('parse token error', error.message)
    }
  }, [dispatch])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <div style={{ height: '15vh', backgroundColor: 'black' }}>
        <ToastBox />
      </div>
      <div style={{ flex: '1 1 auto' }}>
        <Routes>

          <Route path='/' element={
            user ? <Layout {...{ dispatch, user, toggleAddEditBox, blogs, filters, changeFilter, addEditMode }} />
              : <Navigate to='login' />
          } >
            <Route path='users' element={<Users users={users} changeFilter={changeFilter} />} />
            <Route path='users/:selectedUserId' element={<SelectedUserBlogs {...{ users, blogs, changeFilter }} />} />
            <Route path='blogs' element={<p></p>} />
            <Route path='blogs/:selectedBlogId' element={<Blog blogs={blogs} editHandle={toggleAddEditBox} />} />
            <Route path='*' element={<NoMatch />} />
          </Route>

          <Route path='/login' element={
            !user ? <Login user={user} />
              : <Navigate to='/' />
          } />

          <Route path='/*' element={<NoMatch />} />

        </Routes>
      </div>
    </div>
  )
}

function Layout({ dispatch, user, toggleAddEditBox, blogs, filters, changeFilter, addEditMode }) {
  const blogSet = { addEditMode, toggleBox: toggleAddEditBox, blogs }
  return (
    <>
      <Navbar {...{ user, dispatch, createHandle: toggleAddEditBox, changeFilter }} />
      <CreateBlog {...blogSet} />

      <Outlet />

      {blogs.length > 0 && blogs
        .filter(blog => (!filters.userId | blog.user.id === filters.userId)
          && (!filters.blogId | blog.id === filters.blogId)
        )
        .map((blog, indx) =>
          <Link key={blog.id} to={`/blogs/${blog.id}`} onClick={() => changeFilter({ blogId: blog.id })} className='links'>
            <li className='blogList'>{blog.title} <i>added by: {blog.user.name}</i> </li>
          </Link>
        )}
    </>
  )
}

function Users({ users, changeFilter }) {
  return (
    <table>
      <thead>
        <tr><td>Names</td><td>Blogs Created</td></tr>
      </thead>
      <tbody>
        {users.map((user, i) =>
          <tr key={i}>
            <td>
              <Link to={`/users/${user.id}`} onClick={() => changeFilter({ userId: user.id })}> {user.name}</Link>
            </td><td>{user.blogs.length}</td>
          </tr>)}
      </tbody>
    </table>
  )
}

function SelectedUserBlogs({ users }) {
  const selectedUserId = useParams().selectedUserId

  const user = users.find(u => u.id === selectedUserId)
  // const selectedUserBlogs = blogs.filter( b => b.user.id === selectedUserId)
  // changeFilter(selectedUserBlogs)
  // console.log('selected user blogs:', 11)

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
    </>
  )
}

function NoMatch() {

  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}