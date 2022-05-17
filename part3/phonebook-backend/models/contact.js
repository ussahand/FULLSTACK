const { default: mongoose } = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then( () => console.log('connected to MongoDB'))
  .catch(err => console.log('error connecting to MongoDB:', err.message)
  )

// const contactSchema = new mongoose.Schema({
//   name: String,
//   number: String
// })

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'must be longer than 3 character'],
    maxLength: [50, 'is too long'],
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(?=.{8,20}$)\d{2,3}-?\d+$/.test(v)
      },
      message: props => `${props.value} has the wrong format. Number min length 8 and first part should has 2 or 3 digits. e.g. 123-45657`
    },
    required: true
  }
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('Person', contactSchema)
