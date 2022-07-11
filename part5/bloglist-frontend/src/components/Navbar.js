import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Navbar = props => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem' }}>
      <div style={{ flex: '1 0 auto', fontSize: '3rem' }} >
        Blogs
      </div>
      {
        props.user &&
        <div>
          {`${props.user.name} logged in `}
          {/* <button onClick={() => props.signOutHandle()} >sign out</button> */}
          <FontAwesomeIcon id='add' icon={faPlus} onClick={ () => props.createHandle(-1) } />
          &nbsp;
          <FontAwesomeIcon id='quit' icon={faRightFromBracket} onClick={() => props.signOutHandle()} />
        </div>
      }
    </div>
  )
}

export default Navbar
