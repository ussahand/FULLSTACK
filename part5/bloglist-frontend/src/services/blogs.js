import axios from 'axios'
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
  axios.get(baseUsers).then(resp => console.log('users list: ', resp.data))

const getLogin = () =>
  axios.get(baseLogin).then(resp => console.log('users list: ', resp.data))

const authenticate = (user, msgHandler) =>
  axios.post(baseLogin, user)
    .then(resp => resp.data)
    .catch(err => msgHandler(err.response.data.error, FAILURE))

const getBlogs = (user, msgHandler) =>
  axios.get(baseBlog, { headers: { Authorization: `Bearer ${user.token}` } })
    .then(resp => {msgHandler(`${resp.data.length} blogs are downloaded from the server`, SUCCESS); return resp.data})
// .catch(err => { console.log('100', 100); return ( err.response.data.error !== 'Session expirded, Please login again'
//     ? msgHandler(err.response.data.error, FAILURE)
//     : throw {error: 100}
//   )})

const delBlog = (blogId, user, msgHandler) =>
  axios.delete(`${baseBlog}/${blogId}`, { headers: { Authorization: `bearer ${user.token}` } })
    .then(resp => {
      msgHandler('The blog deleted successfully', WARNING)
      return resp.data
    })
    .catch(err => msgHandler(err.response.data.error, FAILURE))

const postBlog = (user, msgHandler, newBlog) =>
  axios.post(baseBlog, newBlog, { headers: { Authorization: `bearer ${user.token}` } })
    .then(({ data }) => { msgHandler(`A "${data.title}" blog created`, SUCCESS); return data })
    .catch(err => msgHandler(err.response.data.error, FAILURE))

const editBlog = (blogId, user, msgHandler, updatedBlog) =>
  axios.put(`${baseBlog}/${blogId}`, updatedBlog, { headers: { Authorization: `bearer ${user.token}` } })
    .then(resp => { msgHandler(`A "${resp.data.title}" <likes> prop updated to ${resp.data.likes}.`, SUCCESS); return resp.data })
    .catch(err => msgHandler(err.response.data.error || err.message, FAILURE))

export default { getAll, getUsers, getLogin, authenticate, getBlogs, delBlog, postBlog, editBlog }