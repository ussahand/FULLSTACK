import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket, faUsers, faBlog } from '@fortawesome/free-solid-svg-icons'
import { blogsReset } from '../reducers/blogsReducer'
import { logout } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Navbar = ({dispatch, user, createHandle, changeFilter}) => {

  const signOut = () => () => {
    window.localStorage.removeItem('userInfo')
    dispatch(blogsReset())  //  setBlogs([])
    dispatch(logout())
    createHandle(-2)
  }

  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
      <div style={{ flex: '1 0 auto', fontSize: '3rem' }} >
        Blogs
      </div>
      {
        user &&
        <div>
          <FontAwesomeIcon className='icons' id='blogs' icon={faBlog} onClick={ () => {navigate('/blogs'); changeFilter({userId:null, blogId:null})} } />
          &nbsp;&nbsp;
          <FontAwesomeIcon className='icons' id='users' icon={faUsers} onClick={ () => {navigate('/users'); changeFilter({userId:null, blogId:null})} } />
          &nbsp;&nbsp;
          {`${user.name} logged in `}
          {/* <button onClick={() => props.signOutHandle()} >sign out</button> */}
          <FontAwesomeIcon className='icons' id='add' icon={faPlus} onClick={ () => createHandle(-1) } />
          &nbsp;
          <FontAwesomeIcon className='icons' id='quit' icon={faRightFromBracket} onClick={signOut()} />
        </div>
      }
    </div>
  )
}

export default Navbar
