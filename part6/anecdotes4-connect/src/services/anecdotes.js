import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = () =>
  axios.get(baseUrl)
    .then(resp => resp.data)
    .catch(er => console.log('error', er))

const postNew = (newRecord) =>
  axios.post(baseUrl, newRecord)
    .then(resp => resp.data)
    .catch(err => console.log('http post error', err.message))

const putRecord = (updated) =>
  axios.put(`${baseUrl}/${updated.id}`, updated)
    .then(resp => console.log('http put', resp.data))
    .catch(er => console.log('Error in put:', er.message))

export default { getAll, postNew, putRecord, }
