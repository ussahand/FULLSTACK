const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true, minLength: 3},
  passwordHash: {type: String, required: true, minLength: 20},
  favouriteGenre: {type: String, required: true}
})

const transform = (doc, ret) => {
  ret.id = ret._id.toString()
  delete ret.passwordHash
  delete ret._id
  delete ret.__v
  return ret
}

userSchema.options.toJSON = {transform} 
userSchema.options.toObject = {transform} 

module.exports = mongoose.model('User', userSchema)