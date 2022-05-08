import { useState } from "react";

const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
};

const StatisticLine = (props) => {
  return (<tr> <td>{props.text}</td> <td>&nbsp; {props.value}</td> </tr>)
}

const Statistics = ({ feedback }) => {
  const { good, bad, neutral } = feedback;
  const total = good + neutral + bad ;
  const avrg = (good - bad) / total;
  const positive = good / total;
  if ( total === 0)
    return (<p>No feedback given</p>)

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={avrg} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clicks = (feedback) => () => feedback === 'good' ? setGood(good + 1)
    : feedback === 'bad' ? setBad(bad + 1)
      : setNeutral(neutral + 1)


  // console.clear();
  // console.log('Hello world');
  return (
    <div style={appCSS}>
      <h1>give feedback</h1>
      <button onClick={clicks('good')} >good</button>
      <button onClick={clicks('neutral')} >neutral</button>
      <button onClick={clicks('bad')} >bad</button>
      <h1>Statistics</h1>
      <Statistics feedback={{ good: good, bad: bad, neutral: neutral }} />
    </div>
  );
}

export default App;
