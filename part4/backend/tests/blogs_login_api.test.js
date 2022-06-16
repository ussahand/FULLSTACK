const mongoose = require('mongoose')
const app = require('../app')
const supertestRequest = require('supertest')
const Blog = require('../models/blog')
const Login = require('../models/user')
const jwt = require('jsonwebtoken')
const {TOKEN_SECRET} = require('../utils/config')

// jest.setTimeout(5000)
const api = supertestRequest(app)
// setTimeout(() => {}, 3000);

loginSignup = [{
  userName: 'gfloyd',
  password: '123123',
  name: 'Gorge Floyed',
},{
  userName: 'helen0',
  name: 'Helen Andolosi',
  password: 'helen123',
},{
  userName: 'edward',
  name: 'Edward Shevardnadzeh',
  password: '3dS3d@w',
}]

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

beforeAll( async () => {
  // jest.setTimeout(60000)
  await Login.deleteMany({})
  await Blog.deleteMany({})
})

describe('Test user login', () => {
  test('signup users',  async () => {
    let resp
    resp = await api.post('/api/login').send(loginSignup[0]).expect(200)
    loginSignup[0]['token'] = resp.body
  
    resp = await api.post('/api/login').send(loginSignup[1]).expect(200)
    loginSignup[1]['token'] = resp.body
    
    resp = await api.get('/api/login')
    .set('Accept', 'application/json')
    .expect(200)
    .expect('content-type', /json/)

    expect(resp.body).toHaveLength(2)      
  })

  test('login a user after first sign up', async () => {
    const user = {...loginSignup[0], token: null}
    const resp = await api.post('/api/login').send(user).expect(200)
    
    const signedUpUser = tokenExtractor(loginSignup[0].token).userId
    const loggedInUser = tokenExtractor(resp.body).userId
    expect(signedUpUser).toBe(loggedInUser)
  })
})

describe("Test create tokenized blog API's with first user", () => {
  test('create two blogs', async () => {
    resp = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginSignup[0].token}`)
      .send(blogs[0]).expect(201)
    blogs[0].id = resp.body.id

    resp = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginSignup[0].token}`)
      .send(blogs[1]).expect(201)
    blogs[1].id = resp.body.id
    
    resp = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${loginSignup[0].token}`)
      .send(blogs[2]).expect(201)
    blogs[2].id = resp.body.id
  })
  
  test('create a blog with wrong token', async () => {
    resp = await api.post('/api/blogs')
      .set('Authorization', `Bearer ${455555}`)
      .send(blogs[3]).expect(401)
  })
  
  test('create a blog with missed bearer header', async () => {
    resp = await api.post('/api/blogs')
      .set('Authorization', `${455555}`)
      .send(blogs[3]).expect(401)
  })
  
  test('create a blog with missed authorization header', async () => {
    resp = await api.post('/api/blogs')
      .send(blogs[3]).expect(401)
  })
  
  test('create a blog with expired token', async () => {
    resp = await api.post('/api/blogs')
      .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFsaSIsInVzZXJJZCI6IjYyYTg3NTFjNTg3YjNkNmE2MDc3ZThhNyIsImlhdCI6MTY1NTMyNzEwMSwiZXhwIjoxNjU1MzI3MTEwfQ.FWFMad6CJuMNk6u0mBrGo5lWOIP4dr9fC_wyljdImeQ')
      .send(blogs[3]).expect(401)
  })
})

describe('Test other tokenized API\'s', () => {
  test('Get all blogs for first user', async () => {
    resp = await api.get('/api/blogs')
      .set('Authorization', `Bearer ${loginSignup[0].token}`)
      .expect(200)
    
      expect( resp.body.length).toBe(3)
  })

  // test('Second user does not have any blog', async () => {
  //   resp = await api.get('/api/blogs')
  //     .set('Authorization', `Bearer ${loginSignup[1].token}`)
  //     .expect(200)
    
  //     expect( resp.body.length).toBe(0)
  // })

  test('Get a first blog', async () => {
    resp = await api.get(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `Bearer ${loginSignup[0].token}`)
      .expect(200)
    
    expect(resp.body.title).toBe(blogs[0].title)
  })

  test('Get a first blog with unauthorized user', async () => {
    resp = await api.get(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `Bearer ${loginSignup[1].token}`)
      .expect(404)    
  })

  test('try to delete others blog', async () => {
    resp = await api.delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `Bearer ${loginSignup[1].token}`)
      .expect(404)
  })

})


afterAll(  () => {
   mongoose.connection.close()
  // done()
})

function tokenExtractor (token) {
  const decodedUser = jwt.verify(token, TOKEN_SECRET)
  if (!decodedUser.userId)
    throw { name: 'jwtToken', error: 'token missing or invalid' }
  
  return decodedUser
}
