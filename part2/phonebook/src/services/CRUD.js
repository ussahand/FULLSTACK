import axios from "axios";

const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const baseUrl = 'http://localhost:3001/persons';
const dbGetAll = (msgHandler) =>
  axios
    .get( baseUrl )
    .then( resp => { 
      msgHandler('contacts fetched sussessfully', SUCCESS);
       return resp.data
    })
    .catch(err => {
      console.log('GET: fetch err ', err.message)
      msgHandler('Error in loading data', FAILURE)
    })

const dbAdd = (newObject, msgHandler) => 
  axios
    .post( baseUrl, newObject)  //object without ID
    .then( ({data}) =>{
      msgHandler('Record created properly' ,SUCCESS)
      return( data )
    })  
    .catch( err =>{
      console.log('POST: error in add new data', err.message )
      msgHandler(`Creating ${newObject.name} contact failed.`,FAILURE)
    }) 

const dbDelete = (obj, msgHandler) =>
  axios
    .delete( baseUrl + '/' + obj.id )
    .then( resp => {
      console.log('A record deleted from DB: ',obj.name);
      msgHandler(`Note: ${obj.name} deleted successfully`, SUCCESS) 
    })
    .catch( err => {
      console.log('axios DELETE err', err.message) 
      msgHandler(`'Note "This contact ${obj.name} is not saved to server" was already removed from server'`, FAILURE)
    })

const dbUpdate = ( changeObj, msgHandler ) =>
  axios
    .put(baseUrl+ '/' + changeObj.id , changeObj) //object with ID
    .then( resp =>{
      console.log('A record updated in th db ', resp.data) 
      msgHandler(`Note: ${changeObj.name} record updated properly`, SUCCESS)
    })
    .catch( err =>{
      console.log('axios PUT err: ', err.message)
      msgHandler(`'Note "This contact ${changeObj.name} is not saved to server" was already removed from server'`, FAILURE)
    })    
    // .catch(err => {
      //   if (err.res)
      //     console.log('err.rest:', err.rest.status)
      //   else if (err.request)
      //     console.log('err.request:', err.request, err.message)
      //   else
      //     console.log('err.msg:', err.message)

const crud =  {dbGetAll, dbAdd, dbUpdate, dbDelete};
export default crud;