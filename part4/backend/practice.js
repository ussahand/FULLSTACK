const bcrypt = require('bcrypt')
const app = require('../app')
const supertestRequest = require('supertest')

const api = supertestRequest(app)
// const tic = Date.now()

dummy()

async function dummy() {
  loginSignup = {
    userName: 'aaaaaa',
    password: '132132132',
    name: 'AAAAAAAAAaaaa',
  }
  const loginToken = await loginGetToken(loginSignup)
  
  showBlogs(loginToken)
  
  async function loginGetToken(loginInfo) {
    let resp =  await api.get('/api/login/')
    .expect(200)
    console.log('users list: ', resp.body)
  
    resp =  await api.post('/api/login/')
    .send(loginInfo)
    .expect(200)
    // console.log('Token created properly', resp.body)
    return resp.body
  }
  
  async function showBlogs(loginToken) {
    const resp = await api.get('/api/blogs')
      .set('authorization', `Bearer ${loginToken}`)
    // console.log('Blogs list: ', resp.body)
  }  
  async function showBlogs(loginToken) {
    const resp = await api.get('/api/blogs')
      .set('authorization', `Bearer ${loginToken}`)
    // console.log('Blogs list: ', resp.body)
  }  
}

// setTimeout(() => {
//   toc = Date.now()-tic
//   console.log('interval', toc)  
// }, 2000);


// const _ = require('lodash')
// const objs = [
// {name:'Jame', age:20},
// {name: 'ali', age: 5},
// {name:'ali', age:17},
// {name: 'art', age:14}
// ]
// const gobjs = _.groupBy(objs, 'name')
// console.log('gObjs: ', objs, gobjs)
// const map = _.map(gobjs, obj =>({
//     name: obj[0].name,
//     age: _.sumBy(obj, 'age')
//   }))
// console.log('map: ', map)
// const max = _.maxBy(map, 'age')
// console.log('max', max)

// console.log('node_en', process.env.NODE_ENV)
