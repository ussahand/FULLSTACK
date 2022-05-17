import axios from "axios";

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const baseUrl = process.env.NODE_ENV === 'production'
  ? '/api/persons'
  : 'http://localhost:3001/api/persons';

//const baseUrl = 'https://tranquil-crag-43959.herokuapp.com/api/persons'
const dbGetAll = (msgHandler) =>
  axios
    .get(baseUrl)
    .then(resp => {
      msgHandler('contacts fetched sussessfully', SUCCESS);
      return resp.data
    })
    .catch(err => {
      console.log('GET: fetch err ', err.message)
      msgHandler('Error in loading data', FAILURE)
    })

const dbAdd = (newObject, msgHandler) =>
  axios
    .post(baseUrl, newObject)  //object without ID
    .then(resp => {
      msgHandler('Record created properly', SUCCESS)
      return (resp.data)
    })
    .catch(err => {
      console.log('POST: error in add new data', err.message)
      console.log('err.resp.data: ', err.response.data);
      // console.log('err.resp.status:',err.response.status);
      // console.log('err.resp.header',err.response.headers);
      // console.log('err.req', err.request)
      msgHandler(err.response.data.error ?? err.message, FAILURE)
    })

const dbDelete = (obj, msgHandler) =>
  axios
    .delete(baseUrl + '/' + obj.id)
    .then(resp => {
      console.log('A record deleted from DB: ', obj.name);
      msgHandler(`Note: ${obj.name} deleted successfully`, SUCCESS)
    })
    .catch(err => {
      console.log('axios DELETE err', err.message, err.response.data)
      msgHandler(`'Note "This contact ${obj.name} is not saved to server" was already removed from server'`, FAILURE)
    })

const dbUpdate = (changeObj, msgHandler) =>
  axios
    .put(baseUrl + '/' + changeObj.id, changeObj) //object with ID
    .then(resp => {
      console.log('A record updated in th db ', resp.data)
      msgHandler(`Note: ${changeObj.name} record updated properly`, SUCCESS)
      return resp.data
    })
    .catch(err => {
      console.log('axios PUT err: ', err.message)
      console.log('err.resp.data: ', err.response.data);

      err.response.data.error.includes('Validation failed')
      ?  msgHandler(err.response.data.error, FAILURE)
      :  msgHandler(`'Note "This contact ${changeObj.name} is not saved to server" was already removed from server'`, FAILURE)
    })

const crud = { dbGetAll, dbAdd, dbUpdate, dbDelete };
export default crud;