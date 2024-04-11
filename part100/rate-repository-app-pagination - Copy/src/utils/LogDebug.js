import { useState, useEffect } from 'react'
import { P } from '../styles'

let logStore = '';
function customizeConsoleLog() {
  const _originConsoleLog = console.log
  console.log = (...args) => {
    _originConsoleLog.apply(null, args)

    const newLog = args.reduce((p, c) => typeof c !== 'object'
      ? p + ' ' + c
      : p + ' ' + JSON.stringify(c)
      , '');

    logStore += '\n' + newLog
  }
}

const LogDebug = () => {
  const [ , setLog] = useState(false)

  if (process.env.NODE_ENV === 'production') //other values: test development   
    return null;

  useEffect(() => {
    customizeConsoleLog();

    const intervalId = setInterval(() => {
      setLog(log => !log)
    }, 1000);

    return () => clearInterval(intervalId)
  }, [])

  return <P color='c5th'>{new Date().toLocaleString()} <P>{logStore}</P> </P>
}

export default LogDebug