const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v4: uuid} = require('uuid')


let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431"
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: '3d599470-3436-11e9-bc57-8b80ba54c431'
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: '3d599471-3436-11e9-bc57-8b80ba54c431'
  },
]

const typeDefs = gql`
type Address {
  street: String!
  city: String! 
}

type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }


  type Query {
    personCount: Int!
    allPersons: [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    createPerson(name: String!, phone:String, city:String!, street:String! ): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: () => persons,
    findPerson: (root, args) =>
      persons.find(p => p.name === args.name)
  },
  Person: {
    address: (root) => ({
      street : root.street,
      city : root.city,
      country: 'Finland'
    })
  },
  Mutation: {
    createPerson: (root, args) => {
      if ( persons.find( p => p.name === args.name))
       throw new UserInputError('Name must be unique')
      const person = {...args, id: uuid()}
      console.log('root', root)

      persons = persons.concat(person)
      return person
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
