import { useField } from './hooks/useField'
import { useCountries } from './hooks/useCountry'
import { Countries } from './components/Countries'
import './App.css'

function App() {
  const filter = useField('text')
  const countries = useCountries()

  const regxp = new RegExp(filter.value, 'i')
  const filterd = countries.filter(c => (c.common + '.' + c.official).match(regxp))

  return (
    <div>
      Filter: <input {...filter} />
      {filterd.length === 0
        ? 'Not found...'
        : <Countries filterd={filterd} />
      }
    </div>
  )
}

export default App
