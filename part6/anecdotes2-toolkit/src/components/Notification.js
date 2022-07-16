import { useSelector, useDispatch } from 'react-redux'
import { resetNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  const dispatch = useDispatch()

  message.length && setTimeout(() => {  // run only there is a message
    dispatch(resetNotification()) // hide after 5 seconds
  }, 5000)

  return (
    <div style={{ border: '2px solid cyan' }}>
      {message}
    </div>
  )
}

export default Notification