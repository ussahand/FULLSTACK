
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()
const Person = require('./models/contact')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
console.clear()
//const logger1 = morgan('tiny')
morgan.token('body', function (req) { return  Object.keys(req.body).length === 0 ? '' : JSON.stringify(req.body) })
const logger2 = morgan(':method :url :status :res[content-length] - :response-time ms type: :res[content-type] content: :body')
app.use ( logger2 )

// const myRequestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use( myRequestLogger );

// const persons=[
//     {
//       "name": "Arto Hellas",
//       "number": "040-123456",
//       "id": 1
//     },
//     {
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523",
//       "id": 2
//     },
//     {
//       "name": "Dan Abramov",
//       "number": "12-43-234345",
//       "id": 3
//     },
//     {
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122",
//       "id": 4
//     },
//     {
//       "name": "Jane Cemaron",
//       "number": "+3(542)654-5214",
//       "id": 5
//     }
// ]

/* upload Persons into mongo db
const people = persons.map(x=>{
  people = new Person({name: x.name, number: x.number})
  people
    .save()
    .then( rslt=> console.log('succeed...'))
})
*/

//Person.find({}).then( rslt=> console.log('content', JSON.parse(JSON.stringify(rslt)) ))

app.get('/info', (request, response) => {
  Person.countDocuments({}).then( cnt => {
    let content = `<h2>Phonebook has info for ${cnt} people</h2>`
    content += new Date()
    response.send(content)
  })
})

//get all contacts
app.get('/api/persons', (request, response) => {
  Person.find({}).then( contacts => {
    response.json( contacts )
  })
  console.log('download from db...' )
})

app.get('/api/persons/:id', (req, resp, nxt) => {
  Person.findById(req.params.id)
    .then(contact => {
      contact
        ? resp.json(contact)  //record find

        //id format is correct but record was not find
        : resp.status(404).end('Record was not find')
    })
    .catch(err => nxt(err))
})

app.delete('/api/persons/:id', (req, resp, nxt) => {
  Person.findByIdAndDelete( req.params.id)
    .then( contact => {
      contact
        ? resp.status(204).end('Record deleted successfully.')
        : resp.status(404).end('Record was not find')
    })
    .catch(err => nxt(err))
})
// app.delete('/api/persons/:id',(req,resp)=>{
//   const id = Number( req.params.id )
//   const index = persons.findIndex( x=> x.id ===id  )
//   persons.splice(index , 1);
//   index > -1
//     ? resp.status(204).end(`Record deleted successfully.`)
//     : resp.status(404).end('Record was not exist')
// })

app.post('/api/persons', (req, resp, nxt) => {
  Person.find({ name: req.body.name })
    .then(contact => {
      if (contact.length)
        resp.status(404).end(JSON.stringify({ error: 'name must be unique' }))
      else {
        const newPeople = Person(req.body)

        newPeople.save()
          .then(saved => resp.json(saved).end() )
          .catch(err => nxt(err))
      }
    })
    .catch(err => nxt(err))
})

// app.post('/api/persons',(req,resp)=>{
//   //console.log('header: ', req.headers )
//   if( req.body && req.body.name && req.body.number){

//     const duplicate = persons.findIndex( x=> x.name == req.body.name )

//     if( duplicate > -1 )
//       resp.status(404).end( JSON.stringify({error: 'name must be unique'}))
//     else{
//       contact ={
//         name: req.body.name,
//         number: req.body.number, // || '+1-415-916-2244',
//         date: new Date(),
//         id: persons.length + 1
//       }
//       persons.push( contact )
//       console.log('post: ', contact, req.body.name, typeof req.body )
//       resp.json(contact)
//     }

//   }else
//     resp.status(400).json({error: 'The name or number is missing'})
// })

app.put('/api/persons/:id', (req, resp, nxt) => {
  const updateContact = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate(req.params.id, updateContact, { new: true, runValidators: true, context: 'query' })
    .then(contact => {
      contact
        ? resp.json(contact)
        : resp.status(404).end('Record was not find')
    })
    .catch(err => nxt(err))
})

// app.put('/api/persons/:id', (req, resp)=>{
//  // console.log('headers ', req.headers)
//   const id = Number(req.params.id)
//   const id2 = req.body.id
//   const indx = persons.findIndex(x=> x.id === id)
//   const contact = {
//     name: req.body.name,
//     number: req.body.number,
//     date: new Date(),
//     id: id
//   }
//   if(indx > -1 && id && req.body.name){
//     persons.splice(indx, 1, contact)
//     resp.json(contact)
//   }else
//     resp.status(404).end('content missing')
// })

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorhandler = (err, req, resp, next) => {
  console.log('catched error: ', err.message )
  if( err.name === 'CastError')
    return resp.status(400).send({ error: 'malformatted id' })
  else if( err.name === 'ValidationError')
    return resp.status(400).json({ error: err.message })

  next( err )
}

app.use(errorhandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
