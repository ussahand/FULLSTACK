import { useDispatch, useSelector } from 'react-redux/es/exports'
const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  // height: '100vh',
}

const StatisticLine = (props) => {
  return (<tr><td>{props.text}</td><td>&nbsp; {props.value}</td></tr>)
}

const Statistics = () => {

  const data = useSelector(state => state)
  // const p = useSelector(state => state.ok)
  // console.log('data', p)
  const { good, bad, ok } = data
  const total = good + ok + bad
  const avrg = (good - bad) / total
  const positive = good / total
  if (total === 0)
    return (<p>No feedback given</p>)

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="ok" value={ok} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={avrg} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25'
  const dispatch = useDispatch()
  const dispatcher = (actionType) => () => dispatch({ type: actionType })

  return (
    <div style={appCSS}>
      <h1>give feedback</h1>
      <button onClick={dispatcher('GOOD')} >good</button>
      <button onClick={dispatcher('OK')} >ok</button>
      <button onClick={dispatcher('BAD')} >bad</button>
      <button onClick={dispatcher('ZERO')} >reset</button>
      <h1>Statistics</h1>
      <Statistics />
    </div>
  )
}

export default App
