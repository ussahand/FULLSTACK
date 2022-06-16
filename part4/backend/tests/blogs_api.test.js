const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

const api = supertest(app)
let deletedID

beforeAll(async () => {
  await Blog.deleteMany({})

  let newObj = new Blog(blogs[0])
  blogs[0] = (await newObj.save()).toJSON()

  newObj = new Blog(blogs[1])
  blogs[1] = (await newObj.save()).toJSON()

  newObj = new Blog(blogs[2])
  const saved = await newObj.save()
  deletedID = saved._id
  await Blog.findByIdAndDelete(deletedID)
})

describe('Test Get Api', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('check first blog title', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].title).toBe('React patterns')
  }, 2000)

  test('check the content', async () => {
    const response = await api.get('/api/blogs')
    expect(JSON.stringify(response.body)).toMatch(/React patterns/)
  }, 2000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  }, 2000)

  test('get second record with malformed id', async () => {
    await api.get('/api/blogs/2').expect(400)
  })

  test('get second record with deleted id', async () => {
    await api.get('/api/blogs/' + deletedID).expect(404)
  })

  test('get second record', async () => {
    const resp = await api.get('/api/blogs/' + blogs[1].id).expect(200)
    // expect(resp.body).toHaveLength(1)
    expect(resp.body).toEqual(blogs[1])
  })
})

describe('Test post api', () => {
  test('a valid blogs added with correct id and not _id', async () => {
    await api.post('/api/blogs')
      .send(blogs[3])
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
    expect(response.body[0].id).toBeDefined()
  })

  test('blog without title and url is not added', async () => {
    await api.post('/api/blogs/')
      .send({ url: 'www' })
      .expect(400)

    await api.post('/api/blogs/')
      .send({ title: 'titleeee' })
      .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
  }, 1000)

  test('test default likes', async () => {
    const resp = await api.post('/api/blogs/')
      .send({ title: 'hulu', url: 'www.hulu.com' })

    expect(resp.body.likes).toBe(0)
  })
})

// test delete api
describe('Test delete restful API', () => {
  test('delete with wrong ID format', async () => {
    await api.delete('/api/blogs/2')
      .expect(400)
  })

  test('delete already deleted record', async () => {
    await api.delete('/api/blogs/' + deletedID)
      .expect(404)
  })

  test('delete an existing record', async () => {
    await api.delete('/api/blogs/' + blogs[1].id).expect(204)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(3)
  })
})

describe('Test patch api', () => {
  test('update a field with wrong ID format', async () => {
    await api.patch('/api/blogs/2')
      .send({ likes: 99 })
      .expect(400)

  })

  test('update a field with already deleted record', async () => {
    await api.patch('/api/blogs/' + deletedID)
      .send({ likes: 99 })
      .expect(404)
  })

  test('update a field with an existing record', async () => {
    const resp = await api.patch('/api/blogs/' + blogs[0].id)
      .send({ likes: 99 })
      .expect(200)
    expect(resp.body.likes).toBe(99)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
