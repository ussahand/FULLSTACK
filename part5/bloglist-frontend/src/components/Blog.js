import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan,  faCircleArrowDown, faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Blog = (props) => {
  const [show, setShow] = useState(false)

  return (
    <div id='tagId' className='cssBlog' style={{ border: '1px solid red', marginBottom: '5px', padding: '2px' }}>
      <h3 style={{ textAlign: 'center' }}>
        {props.blog.title}
        &nbsp;
        <FontAwesomeIcon id='toggle' icon={show? faCircleArrowUp : faCircleArrowDown} onClick={() => setShow(!show)} />
      </h3>
      {show && <Detail {...props} />}
      {/* <div style={{ display: show ? 'block' : 'none' }}>
        <h4>by: {blog.author}</h4>
        <p>URL:  <a href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a></p>
        <div style={{ display: 'flex' }}>
          <div style={{ flexGrow: '1' }}>Likes: {blog.likes}</div>
          <FontAwesomeIcon icon={faPencil} onClick={() => editHandle(blog.indx)} />
          &nbsp;
          <FontAwesomeIcon icon={faTrashCan} onClick={() => delBlogHandle(blog)} />
        </div>
      </div> */}
    </div>
  )
}

function Detail({ blog, delBlogHandle, editHandle }){
  return (
    <div >
      <h4>By: {blog.author}</h4>
      <p>URL:  <a href={`${blog.url}`} target="_blank" rel="noreferrer">{blog.url}</a></p>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: '1' }}>Likes: {blog.likes} </div>
        <FontAwesomeIcon id='edit' icon={faPencil} onClick={() => editHandle(blog.indx)} />
        &nbsp;
        <FontAwesomeIcon id='delete' icon={faTrashCan} onClick={() => delBlogHandle(blog)} />
      </div>
    </div>
  )
}

export default Blog