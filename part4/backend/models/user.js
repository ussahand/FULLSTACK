const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  userName: {type: String, minlength: 3, required: true},
  passwordHash: {type: String, minlength: 20, required: true},
  blogs:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  },  
})

module.exports = mongoose.model('User', userSchema)
