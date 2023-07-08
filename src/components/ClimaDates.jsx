import React from 'react';

const ClimaDates = ({ weatherData, temperatureScale }) => {
  const { main, weather, name, sys } = weatherData;

  const mapIcon = {
    '01d': '/icons/01d.png',
    '01n': '/icons/01n.png',
    '02d': '/icons/02d.png',
    '02n': '/icons/02n.png',
    '03d': '/icons/03d.png',
    '03n': '/icons/03n.png',
    '04d': '/icons/04d.png',
    '04n': '/icons/04n.png',
    '09d': '/icons/09d.png',
    '09n': '/icons/09n.png',
    '10d': '/icons/10d.png',
    '10n': '/icons/10n.png',
    '11d': '/icons/11d.png',
    '11n': '/icons/11n.png',
    '13d': '/icons/13d.png',
    '13n': '/icons/13n.png',
    '50d': '/icons/50d.png',
    '50n': '/icons/50n.png',
  };

  const weatherIcon = mapIcon[weather[0].icon] || '';
  const roundedTemp = Math.floor(main.temp);

  const convertTemperature = (temp) => {
    if (temperatureScale === '°C') {
      return `${temp} °C`;
    } else {
      const fahrenheit = Math.floor((temp * 9) / 5 + 32);
      return `${fahrenheit} °F`;
    }
  };

  return (
    <div className="weather-section">
      <div className="weather-card">
        <h3>Clima Actual</h3>
        <div className="ubi-dates">
          <span>{name}, </span>
          <p>{sys.country}</p>
        </div>
  
        <div className="actual-weather">
          <h1>{convertTemperature(roundedTemp)}</h1>
          <div className="weatherState">
            <img src={weatherIcon} alt="Icono del clima" />
            <div>
              <h4>Estado: </h4>
              <p>{weather[0].description}</p>
            </div>
          </div>
        </div>
  
        <div className="weather-statistics">
          <h3>Otras estadísticas</h3>
          <div className="statisticsSection">
            <div className="weatherStats">
              <h4>Humedad: </h4>
              <p>{main.humidity} %</p>
            </div>
            <div className="weatherStats">
              <h4>Sensación térmica: </h4>
              <p>{temperatureScale === '°C' ? main.feels_like : Math.floor((main.feels_like * 9/5) + 32)} {temperatureScale}</p>
            </div>
            <div className="weatherStats">
              <h4>Temperatura máxima: </h4>
              <p>{temperatureScale === '°C' ? main.temp_max : Math.floor((main.temp_max * 9/5) + 32)} {temperatureScale}</p>
            </div>
            <div className="weatherStats">
              <h4>Temperatura mínima: </h4>
              <p>{temperatureScale === '°C' ? main.temp_min : Math.floor((main.temp_min * 9/5) + 32)} {temperatureScale}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimaDates;
