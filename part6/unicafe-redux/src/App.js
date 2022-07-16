
const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
}

const StatisticLine = (props) => {
  return (<tr><td>{props.text}</td><td>&nbsp; {props.value}</td></tr>)
}

const Statistics = ({ store }) => {
  const { good, bad, ok } = store.getState()
  const total = good + ok + bad
  const avrg = (good - bad) / total
  const positive = good / total
  if ( total === 0)
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

const App = ({ store }) => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25'

  return (
    <div style={appCSS}>
      <h1>give feedback</h1>
      <button onClick={store.dispatcher('GOOD')} >good</button>
      <button onClick={store.dispatcher('OK')} >ok</button>
      <button onClick={store.dispatcher('BAD')} >bad</button>
      <button onClick={store.dispatcher('ZERO')} >reset</button>
      <h1>Statistics</h1>
      <Statistics store={store} />
    </div>
  )
}

export default App
