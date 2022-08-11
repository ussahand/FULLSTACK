import { useSelector } from 'react-redux'


const symbols={
  SUCCESS: <span>&#x2713;</span>,
  FAILURE: <span>&#x2BBF;</span>,
  WARNING: <span>&#x26A0;</span>
}
const colors={
  SUCCESS: 'green',
  FAILURE: 'red',
  WARNING: 'yellow'
}

const style= ( status  ) => {
  return({
    border: `2px solid ${colors[status]}`,
    color:  colors[status],
    padding: '1em',
    fontSize: '1.2em'
  })
}

const ToastBox = () => {
  const msg = useSelector(({toast}) => toast.message)

  if( msg.status === 'NONE' ) return null
  return(
    <div style={ style(msg.status) } >
      <strong>{msg.text}</strong>
      <span> {symbols[msg.status] }</span>
    </div>
  )
}

export default ToastBox