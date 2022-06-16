require('dotenv').config()

const { PORT } = process.env

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

// console.log('env:', process.env.NODE_ENV+'----',process.env.NODE_ENV.length)
// console.log('test URI ', process.env.TEST_MONGODB_URI)
// console.log('regular URI ',  process.env.MONGODB_URI)
// console.log(' URI: ',MONGODB_URI )

const TOKEN_SECRET = process.env.TOKEN_SECRET
const TOKEN_EXPIRATION_PERIOD = process.env.TOKEN_EXPIRATION_PERIOD

module.exports = {
  MONGODB_URI,
  PORT,
  TOKEN_SECRET,
  TOKEN_EXPIRATION_PERIOD,
}
