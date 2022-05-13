import { useEffect, useState } from "react";
import axios from "axios";
import ShowCountry from "./ShowCountry";
import ShowFilterdList from "./ShowFilterdList";

const appCSS = {
  backgroundColor: '#1b1c25',
  color: 'dimgray',
  height: '100vh',
};

const filterIt = (list, txt) =>  
  list.filter( x => RegExp(`${txt}`,'i').test( x.name ) )

const App = () => {
  document.body.style = 'margin: 0px; padding: 10px; border:1px solid yellow; background: #1b1c25';
  console.clear();
  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('');
  const setSearch = () => (e)=>{
    setFilter( e.target.value );
  }

  const showClickedItem = () => (e) =>
    setFilter(e.target.id)

  const filterd = filterIt( countries, filter );
  const filterdLength = filterd.length;

  const [weather , setWeather] = useState( '' );

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all?fields=name,capital,area,languages,flag')
      .then(resp => setCountries(resp.data))
  }, [])

  useEffect(() => {
    console.log('use Effect for fetch weather');
    
    if (filterd.length === 1) {
      const website_key = process.env.REACT_APP_WEATHER_API_KEY;
      const query = `https://api.openweathermap.org/data/2.5/weather?q=${filterd[0].capital}&appid=${website_key}`;

      axios
        .get(query)
        .then(resp => setWeather( resp.data) )
        .catch(err => console.log(err.message))
    }
  }, [filterdLength]) // two time run from 1 and to 1

  // console.log('bef ret', filterdLength, filter, weather, typeof weather)
  return (
    <div style={appCSS} >
      find countries &nbsp;
      <input onChange={setSearch()} value={filter} placeholder="enter country name"/>
      <div>
      { 
        filterd.length > 10 
        ? 'Too many matches, specify another filter' 
        : filterd.length > 1
        ? <ShowFilterdList list={filterd}  handler={showClickedItem()} />
        : filterd.length === 1 && weather.main !== undefined 
        ? <ShowCountry country={ filterd[0] } wea={ weather } />
        : 'There is no country with such a filter'
        }
      </div>
    </div>
  );
}

export default App;
