const mongoose = require('mongoose')

const authorSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, minLength: 3 },
  born: { type: Number, min: 1000, maxLength: 2100},
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

function transform (doc, ret) {
  ret.id = ret._id.toString()
  ret.bookCount = ret.__v
  delete ret._id
  delete ret.__v
  return ret
}

authorSchema.options.toObject = {trnsform : transform}
authorSchema.options.toJSON = {transform}
// authorSchema.set('toJSON',{transform})

const authorModel = mongoose.model('Author', authorSchema)

module.exports = authorModel
