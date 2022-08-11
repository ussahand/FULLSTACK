import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan,  faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'
// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { blogDelete, commentCreate } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

const Blog = ({blogs, editHandle}) => {
  // const [show, setShow] = useState(false)
  const selectedBlogId = useParams().selectedBlogId
  const show = !!selectedBlogId

  const index = blogs.findIndex( b => b.id === selectedBlogId )
  const blog = {...blogs[index]} // copy an object element
  blog.index = index
  
  if ( !blog?.user ) 
    return null

  return (
    <div id='tagId' className='cssBlog' style={{ border: '1px solid red', marginBottom: '5px', padding: '2px' }}>
      <h3 style={{ textAlign: 'center', display:'flex' }}>
        {blog.title}
        &nbsp;
        <FontAwesomeIcon id='toggle' icon={show? faCircleArrowUp : faCircleArrowDown} /*onClick={() => setShow(!show)}*/ />
        {/* <FontAwesomeIcon id='toggle' icon={show? faCircleArrowUp : faCircleArrowDown} onClick={() => setShow(!show)} /> */}
        &nbsp;
        <i style={{fontSize: '0.8em', flex:'1 1 auto', textAlign: 'right'}}>added by: {blog.user.name}</i>
      </h3>
      {show && <Detail {...{editHandle, blog}} />}
    </div>
  )
}

function Detail({ blog, editHandle }){
  const dispatch = useDispatch()

  const deleteBlog = (blogId) => {
    const yn = window.confirm(`Do you want to delete <${blog.title}> by ${blog.author} ?`)
    yn && dispatch(blogDelete(blogId))
  }

  const addComment = (e) => {
    e.preventDefault()
    dispatch(commentCreate(blog.id, e.target.comment.value))
    document.getElementById('commentForm').reset()
  }

  return (
    <div >
      <h4>By: {blog.author}</h4>
      <p>URL:  <a href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a></p>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: '1' }}>Likes: {blog.likes} </div>
        <FontAwesomeIcon id='edit' icon={faPencil} onClick={() => editHandle(blog.index)} />
        &nbsp;
        <FontAwesomeIcon id='delete' icon={faTrashCan} onClick={()=> deleteBlog(blog.id)} />
      </div>
      <h2>Comments</h2>
      <form id='commentForm' action='' onSubmit={ addComment }>
        <input type='text' id='comment' placeholder='Enter a comment here' />
        <button> add comment </button> 
      </form>
      <ul>
        {blog?.comments?.map( (cmnt,i) => <li key={i}> {cmnt} </li>)}
      </ul>
    </div>
  )
}

export default Blog