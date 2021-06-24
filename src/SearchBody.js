
import TimeBuilder from "./Time";
import DateBuilder from "./Date";

import { useState } from "react";


const key = "4a0abc706ea965f883535eda89041f74";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;


const SearchBody = () => {

  // States to save the user input and save api data

  const [isFetched, setIsFetched] = useState(false);
  const [userInput, setUserInput] = useState('')
  
  const [city, setCity] = useState();

// Fetching Api data

    const fetchApi = async (search) => {
      const url = new URL(apiUrl);
      url.search = new URLSearchParams({
        appid: key,
        q: search,
        units: "metric",
      });

      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        setCity(jsonData);
        setIsFetched(true)
      } else {
        setIsFetched(false)
        return new Error("API is not available at this moment");
      }
      
    }

// Search handle function
  const handleSubmit = (e, userInput) => {
    e.preventDefault();
    fetchApi(userInput);
  };

  const dateTime = () => {
    <>
      <DateBuilder />
      <TimeBuilder />
    </>;
  }

  dateTime();
  
  return (
    <div
      className={
        typeof city != "undefined"
          ? city.main.temp > 22
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <div className="body-container">
        <main className="main-box">
          <div className="moving-cloud-big">
            <i className="fas fa-cloud"></i>
          </div>

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

          <div className="search-container">
            <div className="search-box wrapper">
              <form onSubmit={(e) => handleSubmit(e, userInput)}>
                <input
                  type="text"
                  className="search-bar"
                  placeholder="Search location..."
                  onChange={(event) => setUserInput(event.target.value)}
                />
              </form>
            </div>

            {isFetched ? (
              <>
                <div className="wrapper">
                  <div className="location-box">
                    <div className="location">
                      <h2>
                        {city.name}, {city.sys.country}
                      </h2>
                    </div>
                    <div className="location-flex">
                      <div className="date">{DateBuilder(new Date())}</div>

                      <div className="time">{TimeBuilder(new Date())}</div>
                    </div>
                  </div>

                  <div className="weather-box">
                    <div className="temp-and-weather">
                      <div className="temperature">
                        <p className="temp">{Math.round(city.main.temp)}°c</p>
                        <p className="feels-like">
                          Feels like:{" "}
                          <span>{Math.round(city.main.feels_like)}°c</span>
                        </p>
                      </div>

                      <div className="weather">
                        <img
                          src="./icons/weather-animation.gif"
                          alt="weather-animation"
                        />
                        <p>{city.weather[0].description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="humidity-wind-container">
                  <div className="min-max">
                    <div className="left-arrow">
                      <i className="fas fa-angle-double-left"></i>
                    </div>
                    <div className="max-temp">
                      <img src="./icons/max.png" alt="max-temp-icon" />
                      <p>Max: </p>
                      {Math.round(city.main.temp_max)}°c
                    </div>
                    <div className="min-temp">
                      <img src="./icons/min.png" alt="min-temp-icon" />
                      <p>Min:</p>
                      {Math.round(city.main.temp_min)}°c
                    </div>
                    <div className="pressure">
                      <img
                        src="./icons/pressure.png"
                        alt="weather-pressure-icon"
                      />
                      <p>Pressure:</p>
                      {Math.round(city.main.pressure)} mb
                    </div>
                    <div className="humidity">
                      <img
                        src="./icons/humidity.png"
                        alt="weather-humidity-icon"
                      />
                      <p>Humidity:</p>
                      {Math.round(city.main.humidity)}%
                    </div>
                    <div className="speed">
                      <img src="./icons/speed.png" alt="weather-speed-icon" />
                      <p>Speed:</p>
                      {Math.round(city.wind.speed)} km/h
                    </div>
                    <div className="deg">
                      <img src="./icons/deg.png" alt="weather-direction-icon" />
                      <p>Direction:</p>
                      {Math.round(city.wind.deg)}°
                    </div>
                    <div className="sunrise">
                      <img src="./icons/sunrise.png" alt="weather-icon" />
                      <p>Sunrise: </p>
                      {window.moment(city.sys.sunrise * 1000).format(`HH:mm a`)}
                    </div>
                    <div className="sunset">
                      <img src="./icons/sunset.png" alt="weather-icon" />
                      <p>Sunset: </p>
                      {window.moment(city.sys.sunset * 1000).format(`HH:mm a`)}
                    </div>
                    <div className="right-arrow">
                      <i className="fas fa-angle-double-right"></i>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bird-flying">
                <img src="./icons/bird-flying.gif" alt="weather-icon" />
              </div>
            )}
          </div>
        </main>
      </div>
      <footer>
        Copyright &copy; <a href="https://royshouvik.com/">Shouvik Roy</a>,{" "}
        <a href="https://junocollege.com/">Juno</a> 2021
      </footer>
    </div>
  );
};

export default SearchBody;
