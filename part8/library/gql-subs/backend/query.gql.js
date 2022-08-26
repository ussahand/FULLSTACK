
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
  
  query Books{
    allBooks {
      title, author {
        name
      }
    }
  }
  
  query Books {
    findAuthor: allBooks(author: "Robert Martin") {
      title author{name, born} genres
    }
  
    findGenre: allBooks(genre: "refactoring") {
      title author{name} genres
    }
    intersectFind: allBooks(genre: "refactoring", author: "Robert Martin") {
      author{name} genres
    }
  }
  
  query Books {
    allBooks {
      title id
    }
    bookCount
    authorCount
  }
  
  query Bookv2{
    allBooks{
      title, published, author {
        name
      }
    }
  }
  
  query Author {
    allAuthors {
      name  born bookCount books { title, genres }
    }
    authorCount
    bookCount
  }
  
  #only 2 levev Depth is valid
  query Author {
    allAuthors {
      name books{
        title, author {
          name, born, books {
            genres
          }
        }
      }
    }
  }
  
  mutation {
    existAuthor: addBook(
      title: "NoSQL Distilled3",
      author: "Martin Fowler",
      published: 2012,
      genres: ["database", "nosql"]
    ) {
      title,
      author{name, born}
    }
  
    noExistAuthor: addBook(
      title: "Pimeyden tango2",
      author: "Reijo Mäki",
      published: 1997,
      genres: ["crime"]
    ) {
      title,
      author{name,born}
    }
  }
  
  mutation {
    one: editAuthor(name: "Sandi Metz", setBornTo: 1958) {
      name  born bookCount }
  
    two: editAuthor(name:"", setBornTo: 1000){ name born}
  }
  
  mutation {
    createUser(username: "ali4", password: "123456", favouriteGenre: "action") {
      username, favouriteGenre
    }
  }
  mutation{
    login(username: "ali3", password: "123456"){ value}
  }
  
  query{
    me{username, favouriteGenre, id}
  }
  
  query {
    allGenres
  }
  
  mutation {
     addBook(
      title: "lst rrrrrr",
      author: "hari ggg",
      published: 1977,
      genres: ["revolution","pet2", "ffff"]
    ) {
      title,
      author{name,born}
    }
  }
  subscription {
    bookAdded {
      title, published,
      author {
        name,born
      }
    }
  }
  
  