import { useState, useEffect } from 'react';
import axios from 'axios';

const DailyDates = ({ lat, lon, searchQuery, temperatureScale }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const getWeather = () => {
      const apiKey = '895e467400596c4581be31f04d2ed28d';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData(response.data.list);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    if (searchQuery) {
      const apiKey = '895e467400596c4581be31f04d2ed28d';
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}&units=metric`;
console.log(apiUrl)
      axios
        .get(apiUrl)
        .then((response) => {
          setWeatherData(response.data.list);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      getWeather();
    }
  }, [lat, lon, searchQuery]);

  const handleDateSelection = (date) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
  };

  const renderDayButtons = () => {
    const uniqueDates = Array.from(new Set(weatherData.map((item) => item.dt_txt.split(' ')[0])));

    return uniqueDates.map((date) => (
      <button key={date} onClick={() => handleDateSelection(date)} className='daybutton'>
        {date}
      </button>
    ));
  };

  const convertTemperature = (temp) => {
    if (temperatureScale === '°C') {
      return `${temp} °C`;
    } else {
      const fahrenheit = Math.floor((temp * 9) / 5 + 32);
      return `${fahrenheit} °F`;
    }
  };

  const renderHourlyWeather = () => {
    if (!selectedDate) return null;

    const filteredData = weatherData.filter((item) => item.dt_txt.includes(selectedDate));

    return filteredData.map((item) => (
      <div key={item.dt} className='weatherhours'>
        <div className='datahours'>
          <h4>{item.dt_txt.split(' ')[1]}</h4>
          <div className='principaldateshours'>
            <div className='tempandicon'>
              <img src={`/public/icons/${item.weather[0].icon}.png`} alt="Weather Icon" />
              <p>{convertTemperature(item.main.temp)}</p>
            </div>
            <p>estado: {item.weather[0].description}</p>
          </div>
          <p>Humedad: {item.main.humidity} %</p>
          <p>Sensacion termica: {temperatureScale === '°C' ? item.main.feels_like : Math.floor((item.main.feels_like * 9/5) + 32)} {temperatureScale}</p>
          <p>Temperatura max: {temperatureScale === '°C' ? item.main.temp_max : Math.floor((item.main.temp_max * 9/5) + 32)} {temperatureScale}</p>
          <p>Temperatura min: {temperatureScale === '°C' ? item.main.temp_min : Math.floor((item.main.temp_min * 9/5) + 32)} {temperatureScale}</p>
        </div>
        
      </div>
    ));
  };

  return (
    <div className="daily-dates">
      <div className="day-buttons">{renderDayButtons()}</div>
      <div className="hourly-weather">{renderHourlyWeather()}</div>
    </div>
  );
};

export default DailyDates;
