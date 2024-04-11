import 'dotenv/config'
import appDotJson from './app.json'

if (!appDotJson.expo.extra)
  appDotJson.expo.extra = {};

  
const dotenv = Object.entries(process.env)
  .reduce((p,[k,v]) => k.startsWith('REACT_APP_') ? {...p, [k]:v} : p, {})

const appEnv = {
  ...dotenv,
  // ENV: process.env.ENV, // for inline evnironments such as ENV=test yaran start
}

const extra = appDotJson.expo.extra
appDotJson.expo.extra = { ...extra, ...appEnv }

export default appDotJson

