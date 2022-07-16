// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const message = useSelector(state => state.notification.message)
  const message = props.notification

  return (
    <div style={{ border: '2px solid cyan' }}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => ({ notification: state.notification.message })
const ConnectedNotification = connect (mapStateToProps, null)(Notification)

// export default Notification
export default ConnectedNotification