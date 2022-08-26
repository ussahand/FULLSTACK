const { UserInputError } = require('apollo-server')
const User = require('../models/user')
const { decodeToken } = require('../utils/helper')

const context = async ({ req }) => {

  // in this prj: for all queries(except me query) 
  // and login mutation 
  // and createUser mutatatoin // shign up
  // we dont need Authorization
  if (req.body.query.match(/(query(?![^]*\bme\b))|(mutation[^]*(login|createUser))/)){
    return null
  }
  // throw new UserInputError('these commands do not need authorization')
  //console.log('these commands do not need authorization')

  const auth = req ? req.headers.authorization : null

  if (auth  && auth.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = decodeToken(auth.substring(7))
      return decodedToken
    } catch (err) {
      throw new UserInputError('Token expired, please login again.')
    }
  }else{
    throw new UserInputError('for updating data you must login first')
  }
}

module.exports = context
