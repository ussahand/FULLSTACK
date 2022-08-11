import axios from 'axios'
import { notify } from '../reducers/toastReducer'

const baseUrl = process.env.NODE_ENV === 'production'
  ? '/api'
  : 'http://10.0.0.14:3001/api'
const baseBlog = baseUrl + '/blogs'
const baseLogin = baseUrl + '/login'
const baseUsers = baseUrl + '/users'

const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const WARNING = 'WARNING'

//const baseUrl = 'https://tranquil-crag-43959.herokuapp.com/api/persons'


const getAll = () => {
  const request = axios.get(baseBlog)
  return request.then(response => response.data)
}

const getUsers = () =>
  axios.get(baseUsers).then(resp => resp.data)

const getLogin = () =>
  axios.get(baseLogin).then(resp => resp.data)

const authenticate = (user, dispatch) =>
  axios.post(baseLogin, user)
    .then(({data}) => {dispatch(notify(`${data.name} logged in successfully`, 'SUCCESS')); return data})
    .catch(err => dispatch(notify(err.response.data.error, FAILURE)))

const verifyUser = (user, dispatch) =>
  axios.get(`${baseLogin}/verifyUser`, { headers: { Authorization: `Bearer ${user.token}` } })
    .then(resp => {dispatch(notify(('User has been verified', SUCCESS))); return resp.data})
    .catch(err => {dispatch(notify(err.response.data.error , WARNING)); throw err})

// const verifyUser = (user, dispatch) =>
//   axios.get(`${baseLog}/verifyUser`, { headers: { Authorization: `Bearer ${user.token}` } })
//     .then(resp => {dispatch('User has been verified', SUCCESS); return resp.data})

const getBlogs = (user, dispatch) =>
  axios.get(baseBlog, { headers: { Authorization: `Bearer ${user.token}` } })
    .then(resp => {dispatch(notify(`${resp.data.length} blogs are downloaded from the server`, SUCCESS)); return resp.data})
// .catch(err => { console.log('100', 100); return ( err.response.data.error !== 'Session expirded, Please login again'
//     ? dispatch(err.response.data.error, FAILURE)
//     : throw {error: 100}
//   )})

const delBlog = (blogId, user, dispatch) =>
  axios.delete(`${baseBlog}/${blogId}`, { headers: { Authorization: `bearer ${user.token}` } })
    .then(resp => {
      dispatch(notify('The blog deleted successfully', WARNING))
      return resp.data
    })
    .catch(err => dispatch(notify(err.response.data, FAILURE)))

const postBlog = (user, dispatch, newBlog) =>
  axios.post(baseBlog, newBlog, { headers: { Authorization: `bearer ${user.token}` } })
    .then(({ data }) => { dispatch(notify(`A "${data.title}" blog created`, SUCCESS)); return data })
    .catch(err => dispatch(notify(err.response.data.error, FAILURE)))

const editBlog = (blogId, user, dispatch, updatedBlog) =>
  axios.put(`${baseBlog}/${blogId}`, updatedBlog, { headers: { Authorization: `bearer ${user.token}` } })
    .then(resp => { dispatch(notify(`A "${resp.data.title}" <likes> prop updated to ${resp.data.likes}.`, SUCCESS)); return resp.data })
    .catch(err => dispatch(notify(err.response.data.error || err.message, FAILURE)))

const postComment = (dispatch, blogId, comment) =>
  axios.post(`${baseBlog}/${blogId}/comment`, comment)
    .then( resp => {dispatch(notify(`The "${comment.comment}" added successfully`,SUCCESS)); return resp.data})
    .catch( err => dispatch(notify(err.response.data.error, FAILURE)))

export default { getAll, getUsers, getLogin, authenticate, getBlogs,
  delBlog, postBlog, editBlog, verifyUser,
  postComment,
}