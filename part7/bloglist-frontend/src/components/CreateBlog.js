import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { blogCreate, blogUpdate } from '../reducers/blogsReducer'

const formStyles = {
  paddingBottom: '0.5rem',
  display: 'flex',
}

const CreateBlog = ({ blogs, toggleBox, addEditMode }) => {

  const blog = addEditMode < 0 ? null : blogs[addEditMode]

  const TF = blog ? true : false
  const inputBox2 = {
    flex: '1 0 auto',
    marginLeft: '10px',
    borderRadius: '10px',
    backgroundColor: blog ? 'tan' : 'white',
  }
  const caption = blog ? 'Update' : 'Create'

  const constructNotNullObj = (obj) => ({
    title: obj?.title || '',
    author: obj?.author || '',
    url: obj?.url || '',
    likes: obj?.likes || 0,
  })

  const [inputs, setInput] = useState(constructNotNullObj(null))
  const changeInput = ({ target }) => setInput({ ...inputs, [target.id]: target.value })
  const changeLikes = () => setInput({ ...inputs, likes: inputs.likes + 1 })

  // if state is in update mode (inputs has filled already with previous blog info)
  // and user clicked other blog (blog isn't null)
  // so initial useState wont work, so change the state
  // if (blog?.title && blog.title !== inputs.title)
  
  useEffect(()=>{
    // const defaultValue = addEditMode < 0 ? null: blog
    const defaultValue = (blog?.title && inputs.title.length === 0) || blog?.title !== inputs.title ? blog : null
    setInput(constructNotNullObj(defaultValue))
  },[addEditMode, blog])


  const dispatch = useDispatch()

  const addBlog = () => (blogInfo) =>
    dispatch(blogCreate(blogInfo))

  const editBlog = () => async (updateInfo) => {
    const editedBlog = dispatch(blogUpdate(updateInfo, blogs[addEditMode].id))
    editedBlog && toggleBox(-2)
  }
  
  const addUpdate = blog ? editBlog() : addBlog()

  if ( addEditMode === -2 ) return null
  return (
    <form action='' id='newBlogForm' onSubmit={(event) => {
      event.preventDefault()
      addUpdate(inputs)
      setInput(constructNotNullObj(null))
    }}
    >
      <p>{caption} a Blog information:</p>
      <div style={formStyles} >
        <label htmlFor='title' >Title: </label>
        <input id='title' style={inputBox2} value={inputs.title} onChange={changeInput} required readOnly={TF} />
        {/* <input id='title' style={inputBox2} defaultValue={blog?.title || ''} required readOnly={TF} /> */}
      </div>
      <div style={formStyles}>
        <label htmlFor='author'>Author: </label>
        <input id='author' style={inputBox2} value={inputs.author} onChange={changeInput} readOnly={TF} />
        {/* <input id='author' style={inputBox2} defaultValue={blog?.author || null} readOnly={TF} /> */}
      </div>

      <div style={formStyles}>
        <label htmlFor='url'>URL: </label>
        <input id='url' style={inputBox2} value={inputs.url} onChange={changeInput} readOnly={TF} />
        {/* <input id='url' style={inputBox2} defaultValue={blog?.url || null} readOnly={TF} /> */}
      </div>

      <div style={formStyles}>
        Likes: {inputs.likes} &nbsp;
        {/* <AnimateHeart changeLikes={changeLikes} /> */}
        <FontAwesomeIcon icon={faHeart} id='likes' style={{ color: 'red', height: '1.5em' }} beat={true} onClick={changeLikes} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <input type='submit' id='submit' style={{ borderRadius: '10px' }} value={caption} />

        <input type='reset' id='cancel' onClick={() => toggleBox(-2)} style={{ borderRadius: '10px' }} value='Cancel' />
      </div>
    </form>
  )
}

/*
function AnimateHeart({ changeLikes }) {
  const [deg, setDeg] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDeg(t => t+3)
    }, 100)
    return () => clearTimeout(intervalId)
  },[])

  const f1 = Math.floor(deg / 30)
  const f2 = f1 % 2
  const f3 = f2 ? deg % 30 : 30-deg % 30
  const f4 = f3 - 15

  const anim = {
    color: 'red',
    // transition: 'transform .1s',
    transform: `rotate(${f4*2}deg)scale(${1 + f3/30})`
  }
  return <FontAwesomeIcon icon={faHeart} id='likes' fade={true} style={anim}  onClick={changeLikes} />
}
*/
export default CreateBlog