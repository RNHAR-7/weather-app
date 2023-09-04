import React, { useState } from 'react';
import './style.css'

const apikey = "46f80a02ecae410460d59960ded6e1c6";

function WeatherApp() {
  const [cityValue, setCityValue] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const temperature = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;
      const details = [
        `Feels like: ${Math.round(data.main.feels_like)}`,
        `Humidity: ${data.main.humidity}%`,
        `Wind speed: ${data.wind.speed} m/s`,
      ];

      setWeatherData({
        temperature,
        description,
        icon,
        details,
      });

      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError("City not Found!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={cityValue}
          onChange={handleInputChange}
        /><br></br>
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div id="weather-data">
          <div className="icon">
            <img src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" />
          </div>
          <div className="temperature">{`${weatherData.temperature}°C`}</div>
          <div className="description">{weatherData.description}</div>
          <div className="details">
            {weatherData.details.map((detail, index) => (
              <div key={index}>{detail}</div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default WeatherApp;
