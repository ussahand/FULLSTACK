const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
  title: { type: String, minLength: 3, required: true, unique: true, trim: true,},
  published: { type: Number, min: 1000, max: 2100,},
  genres: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author',
    required: true,}
})

const BookModel = mongoose.model('Book', bookSchema)

module.exports = BookModel

