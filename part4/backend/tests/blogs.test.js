const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, mostLikes2, mostLikes3, mostLikes4 } = require('../utils/list_helper')
const { info } = require('../utils/logger')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

describe('<<first test sets for blogs>>', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = dummy(blogs)
    expect(result).toBe(1)
  })
  
  test('when list has only one blog, equals the like of that',() => {
    // console.log('in the tester: ', blogs.length)
    const tot = totalLikes(blogs[1])
    expect(tot).toBe(5)
  })

  test('favorite blog', () => {
    const fav = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    expect(favoriteBlog(blogs)).toEqual(fav)
  })
  

  test('The Top blogger', () => {
    const topMost = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(mostBlogs(blogs)).toEqual(topMost)
  })

  test('most Likes by coding', ()=> {
    const mostly = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(mostLikes(blogs)).toEqual(mostly)
  })

  test('most Likes by coding 2', ()=> {
    const mostly = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(mostLikes2(blogs)).toEqual(mostly)
  })

  test('most Likes by lodash', ()=> {
    const mostly = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(mostLikes3(blogs)).toEqual(mostly)
  })

  test('most Likes by lodash chain', ()=> {
    const mostly = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    expect(mostLikes4(blogs)).toEqual(mostly)
  })

})
