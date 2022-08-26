const colors = {
  0: 'red',
  1: 'green'
}
const getColor = ({status}) => colors[status]

export default function Notify({message}) {
  return (
    <div className='notification-box'>
      <div>Messages:</div>
      <em style={{color: getColor(message)}}>{message.message}</em>
    </div>
  )
}