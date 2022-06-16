const {info} = require('./logger')
const _ = require('lodash')

const dummy = blogsList => 1

const totalLikes = (blogsList) => {
  const blogs = [].concat(blogsList)
  return blogs.reduce((sum,itm) => sum += itm.likes, 0)
}

const favoriteBlog = blogsList => {
  const blogs = [].concat(blogsList)
  const sample = {title: '', author: '', likes: -100000}
  
  return blogs.reduce( (x, prev) => x.likes > prev.likes 
  ? {title: x.title, author: x.author, likes: x.likes} 
  : prev ,sample)
}

const mostBlogs = blogsList => {
  const blogs = [].concat(blogsList)
  const count = _.countBy(blogs, 'author')
  const ary = _.toPairs(count)
  const max = _.maxBy(ary, i => i[1])
  topMost = {author: max[0], blogs: max[1]}
  return topMost
}

const mostLikes = blogsList => {

  const map = {
    add([key, val]){
      oldVal = this[key] ? this[key] : 0
      this[key] = oldVal + val
    },
    
    max(){
      const keys = Object.keys(this)
      const vals = Object.values(this)
      const [indx, ] = vals.reduce((p, c, indx) => typeof c ==='number' && c > p[1] ? [indx, c] : p, [0, -1])
      
      return indx == -1 ? {author: '', likes: 0} : {author: keys[indx], likes: vals[indx]}
    }
  }
  
  const blogs = [].concat(blogsList)
  blogs.forEach(x => map.add([x.author, x.likes]))
  return map.max()
}

const mostLikes2 = blogsList => {
  const blogs = [].concat(blogsList)
  const {maxAuthor, maxLikes} = blogs.reduce((acc, crnt) =>{
    accLikes = acc[crnt.author] ? acc[crnt.author] : 0
    acc[crnt.author] = accLikes + crnt.likes // create key/author: value/likes

    if(acc[crnt.author] >  acc.maxLikes){
      acc.maxLikes = acc[crnt.author]
      acc.maxAuthor = crnt.author
    } 
    return acc
  } ,{maxAuthor: '', maxLikes: -1})
  return {author: maxAuthor, likes: maxLikes}
}

const mostLikes3 = blogsList => {
  const blogs = [].concat(blogsList)
  const group = _.groupBy(blogs, 'author')
  const map = _.map(group, it => ({
    author: it[0].author,
    likes: _.sumBy(it, 'likes')
  }))
  return _.maxBy(map, 'likes')
}

const mostLikes4 = blogsList => {
  const blogs = [].concat(blogsList)
  return _(blogs)
    .groupBy('author')
    .map((it, key) => ({
      author: key,
      likes: _.sumBy(it, 'likes')
    }))
    .maxBy('likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, mostLikes2, mostLikes3, mostLikes4 }
