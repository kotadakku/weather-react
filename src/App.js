import './App.css';
import React,{useState, useEffect} from 'react'

const api = {
  key: "d532a179e31b1c77620b6a5530e4efff",
  base: "http://api.openweathermap.org/data/2.5"
}

function App() {

  const [query, setQuery] = useState('London');
  const [weather, setWeather] = useState({})

  const fetchTemp= () =>{
    fetch(`${api.base}/weather?q=${query}&&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);

          console.log(result);
        });
  }
  const search = e =>{
    if(e.key === "Enter"){
      fetchTemp();
      setQuery('');  
    }
  }
  

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") 
    ? ((weather.main.temp-273.15>16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange = {e => setQuery(e.target.value)}
            value={query}
            onKeyPress = {search}
            />
        </div>
        {(typeof weather.main != "undefined")  ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp - 273.15)} oC
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>   
        ) : ('')}
        
      </main>
    </div>
  );
}

export default App;
