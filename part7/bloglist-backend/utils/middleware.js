const jwt = require('jsonwebtoken')
const { info, error } = require('./logger')
const { TOKEN_SECRET } = require('./config')

const requestLogger = (req, resp, next) => {
  info('Method: %-7s Path: %-40s Body: %s', req.method, req.path, JSON.stringify(req.body))
  next()
}

const unknownEndpoint = (request, respond) => {
  respond.status(404).send({ error: 'unknown endpoints' })
}

const tokenExtractor = (req, resp, next) => {
  const authorization = `${req.get('authorization')}` // if there is not authorization it will return undefined string
  const token = authorization.substring(0, 7).toLocaleLowerCase() === 'bearer '
    ? authorization.slice(7) : null

  const decodedUser = jwt.verify(token, TOKEN_SECRET)
  // if (!decodedUser.userId)
  //   throw { name: 'jwtToken', error: 'token missing or invalid' }

  // return decodedUser
  req.token = decodedUser
  next()
}

const errorhandler = (err, req, resp, next) => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') { error('catched error: ', err) } else { error('catched error: ', err.message) }

// const k = Object.keys(err)
// const k2 = Object.getOwnPropertyNames(err)
// console.log('eeeeeeeeeee',  k2, err.stack,err.message.message, err[k2[0]], 'eeee')

  if (err.name === 'CastError') {
    resp.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    resp.status(400).json({ error: err.message })

    // login error
  } else if (err.name === 'PassLen') {
    resp.status(403).json({ error: err.message })
  } else if (err.name === 'uniqueness') {
    resp.status(403).json({ error: err.message })
  } else if (err.name === 'jwtToken') {
    resp.status(401).json({ error: err.message })
  } else if (err.name === 'TokenExpiredError') {
    resp.status(401).json({ error: 'Session expirded, Please login again' })
  } else if (err.name === 'JsonWebTokenError') {
    resp.status(401).json({ error: 'Token is malformed/ or is not provided' })
  } else {
    next(err)
  }
}

module.exports = {
  requestLogger, unknownEndpoint, errorhandler, tokenExtractor,
}
