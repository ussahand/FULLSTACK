const ShowCountry = props =>{
  const {country, wea} = props;
  console.log('ShowCountry:', props)

  return (
    <>
      <h2>{country.name}</h2>
      <span>capital {country.capital}
        <br />area {country.area}
      </span>
      <h3>languages:</h3>
      <ul>
        {country.languages.map(x => <li key={x.name}> {x.name} </li>)}
      </ul>
      <p><img src={country.flag} alt={ country.name } width='100' /></p>
      <h2>Weather in {country.name}</h2>
      <p>temerature  { Math.round(wea.main.temp - 273) } Celcius / { Math.round(( (wea.main.temp-273)*9/5+32) ) } Fahrenheit</p>
      <img src={`http://openweathermap.org/img/wn/${ wea.weather[0].icon }@2x.png`} alt={ wea.weather[0].description } />
      <p>wind {wea.wind.speed} m/s</p>
    </>
  )
}

export default ShowCountry;