
# mutation($name: String!,$phone:String, $city: String!, $street: String!){
#   createPerson(name: $name,  city: $city, street: $street, phone: "123") {name, address {
#     city
#   }}
# }

query Books {
  findAuthor: allBooks(author: "Robert Martin") {
    title author genres
  }

  findGenre: allBooks(genre: "refactoring") {
    title author genres
  }
  intersectFind: allBooks(genre: "refactoring", author: "Robert Martin") {
    author genres
  }
}

query Books {
  allBooks {
    title author id
  }
  bookCount
  authorCount
}

query Author {
  allAuthors {
    name
    born
    bookCount
  }
}

mutation {
  existAuthor: addBook(
    title: "NoSQL Distilled",
    author: "Martin Fowler",
    published: 2012,
    genres: ["database", "nosql"]
  ) {
    title,
    author
  }

  noExistAuthor: addBook(
    title: "Pimeyden tango",
    author: "Reijo Mäki",
    published: 1997,
    genres: ["crime"]
  ) {
    title,
    author
  }
}

mutation {
  one: editAuthor(name: "Reijo Mäki", setBornTo: 1958) {
    name
    born
  }

  two: editAuthor(name:"", setBornTo: 1000){ name born}
}