import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags'

export const useCountries = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    let db = JSON.parse(window.localStorage.getItem('db'))
    db && setCountries(db)

    !db && axios.get(baseUrl).then(resp => {
      db = resp.data.map(x => ({
        common: x.name.common,
        official: x.name.official,
        capital: x.capital,
        population: x.population,
        flag: x.flags.svg,
      }))
      window.localStorage.setItem('db', JSON.stringify(db))
      console.log('data downloaded from the server')
      setCountries(db)
    })
  }, [])

  return countries
}
