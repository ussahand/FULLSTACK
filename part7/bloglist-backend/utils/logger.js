const { printf } = require('./printf')
// import {printf} from './printf'

const info = (...params) => {
  // console.log('logger: ', ...params)
  printf('logger:', ...params)
}

const error = (...params) => {
  // console.log('error: ', ...params)
  printf('#red;error:', ...params)
}

module.exports = { info, error }
