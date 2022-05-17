const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const dbName = 'phonebook'
const url =
  `mongodb+srv://MongoAdmin:${password}@cluster0.zieco.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})


contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', contactSchema)


if( process.argv.length === 3){
  console.log('phonebook:'  )
  Person.find({}).then( result => {
    result.forEach( x => console.log( x.name, x.number) )
    mongoose.connection.close()
  })

}else{
  const people = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  people.save().then( () => {
    console.log(`added ${people.name} number ${people.number} to phonebook`)
    mongoose.connection.close()
  })
}

