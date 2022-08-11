const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { TOKEN_SECRET, TOKEN_EXPIRATION_PERIOD } = require('../utils/config')

function createToken(user) {
  const plainToken = {
    userName: user.userName,
    userId: user._id,
  }
  return jwt.sign(plainToken, TOKEN_SECRET, { expiresIn: parseInt(TOKEN_EXPIRATION_PERIOD, 10) })
  // const dec = jwt.decode(enc,TOKEN_SECRET)
  // info(dec,dec.exp - dec.iat, (dec.exp - dec.iat)/3600)
}

loginRouter.get('/', async (req, resp) => {
  const users = await User.find({})
  resp.json(users)
})

loginRouter.post('/', async (req, resp) => {
  const signin = req.body
  signin.userName = signin.userName.toLowerCase()

  if (signin.password.length < 3 || signin.userName.length < 3) { throw { name: 'PassLen', message: 'The user name or password is incorrect' } }

  const foundUser = await User.find({ userName: signin.userName })

  if (foundUser?.length && foundUser.length > 1) { throw { name: 'Uniqueness', error: 'username must be unique' } } else if (foundUser.length === 0) {
    const hash = await bcrypt.hash(signin.password, 10)
    const newLogin = { userName: signin.userName, name: signin.name, passwordHash: hash }
    const savedUser = await User(newLogin).save()

    const encryptedToken = createToken(savedUser)
    resp.status(200).json({ name: signin.name, token: encryptedToken, userName: signin.userName })
  } else if (foundUser.length === 1) {
    const comparePassword = await bcrypt.compare(signin.password, foundUser[0].passwordHash)
    if (!comparePassword) { throw  { name: 'PassLen', message: 'The user name or password is incorrect' } }

    const encryptedToken = createToken(foundUser[0])
    resp.status(200)
      .json({ name: foundUser[0].name, token: encryptedToken, userName: foundUser[0].userName })
  }
})

loginRouter.get('/verifyUser', async (req, resp) => {
	const authorization = req.get('Authorization')
	const token = authorization && authorization.substring(0, 7).toLocaleLowerCase() === 'bearer '
    ? authorization.slice(7) : null
	
	const decodedUser = jwt.verify(token, TOKEN_SECRET)
	resp.json('verified')
})

module.exports = loginRouter
