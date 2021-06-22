
import TimeBuilder from "./Time";
import DateBuilder from "./Date";

import { useState, useEffect } from "react";


const key = "4a0abc706ea965f883535eda89041f74";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

// "https://api.openweathermap.org/data/2.5/weather?q=Dhaka&appid=4a0abc706ea965f883535eda89041f74

const SearchBody = () => {
  
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('');

  useEffect ( () => {

    const fetchApi = async () => {

        const url = new URL(apiUrl);
        url.search = new URLSearchParams({
        appid: key,
        q: search,
        units: 'metric'
      })

      const response = await fetch(url);
      // console.log(response);
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        setCity(jsonData);
        // return jsonData; 
      } 
      else {
         return new Error('API is not available at this moment');
      } 

    }

    fetchApi();

  }, [search]);


  const dateTime = () => {

    <>
      <DateBuilder />
      <TimeBuilder />
    </>;

  }

  dateTime();
  

  return (
    <main className="main-box">
      <div className="moving-cloud-top">
        <i className="fas fa-cloud"></i>
      </div>

      <div className="moving-cloud">
        <i className="fas fa-cloud"></i>
        <i className="fas fa-cloud"></i>
      </div>

      <div className="header">
        <h1>
          The Weather<i className="fas fa-cloud"></i>
        </h1>
      </div>

      
        <div className="wrapper search-container">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>

          {!city ? (

            <p className="error-msg">No data found!</p>

          ) : (
            <div>
              <div className="location-box">
                <div className="location">
                  <h2>{search}</h2>
                </div>
                <div className="location-flex">
                  <div className="date">{DateBuilder(new Date())}</div>
                  <div className="time">{TimeBuilder(new Date())}</div>
                </div>
              </div>

              <div className="weather-box">
                <div className="temp-and-weather">
                  <div className="temparature">
                    <p className="temp">{city.main.temp}°c</p>
                    <p className="feels-like">
                      Feels like:{city.main.feels_like}°c
                    </p>
                  </div>

                  <div className="weather">{city.weather[0].description}</div>
                </div>
              </div>

              <div className="humidity-wind-container">
                <div className="min-max">
                  <div className="max-temp">Max: {city.main.temp_max}°c</div>
                  <div className="min-temp">Min: {city.main.temp_min}°c</div>
                  <div className="pressure">Pressure: {city.main.pressure}</div>
                  <div className="humidity">
                    Humidity: {city.main.humidity}%
                  </div>
                </div>

                <div className="wind">
                  <div className="speed">Speed:{city.wind.speed} km/h</div>
                  <div className="deg">Deg:{city.wind.deg}</div>
                  <div className="sunrise">
                    <p>
                      Sunrise:{" "}
                      {window.moment(city.sys.sunrise * 1000).format(`HH:mm a`)}
                    </p>
                  </div>
                  <div className="sunset">
                    <p>
                      Sunset:{" "}
                      {window.moment(city.sys.sunset * 1000).format(`HH:mm a`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </main>
  );
};

export default SearchBody;
