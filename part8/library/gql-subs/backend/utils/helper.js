const jwt = require('jsonwebtoken')
const { TOKEN_SECRET, TOKEN_EXPIRATION_PERIOD } = require('./config')

function createToken(loginInfo) {
  const plainToken = { username: loginInfo.username, id: loginInfo.id }
  return jwt.sign(plainToken, TOKEN_SECRET, { expiresIn: parseInt(TOKEN_EXPIRATION_PERIOD, 10) })
}

function decodeToken(token) {
  return jwt.verify(token, TOKEN_SECRET)
}

module.exports = {
  createToken,
  decodeToken,
}
