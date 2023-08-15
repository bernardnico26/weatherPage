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
              <img src={mapIcon[item.weather[0].icon]} alt='Icono del clima' />
              <p>{convertTemperature(item.main.temp)}</p>
            </div>
            <div className='state'>
              <h4>Estado: </h4>
              <p>{item.weather[0].description}</p>
            </div>
          </div>

          <div className="weather-statistics">
            <div className='otherStatisticsTitleSection otherbackground'>
              <h3>Otras estadísticas</h3>
            </div>
            <div className="DailystatisticsSection">
              <div className="DailyweatherStat">
                <h4>Humedad: </h4>
                <p>{item.main.humidity} %</p>
              </div>
              <div className="DailyweatherStat">
                <h4>Sensación térmica:</h4>
                <p>{temperatureScale === '°C' ? item.main.feels_like : Math.floor((item.main.feels_like * 9/5) + 32)} {temperatureScale}</p>
              </div>
              <div className="DailyweatherStat">
                <h4>Temp max:</h4>
                <p>{temperatureScale === '°C' ? item.main.temp_max : Math.floor((item.main.temp_max * 9/5) + 32)} {temperatureScale}</p>
              </div>
              <div className="DailyweatherStat">
                <h4>Temp min:</h4>
                <p>{temperatureScale === '°C' ? item.main.temp_min : Math.floor((item.main.temp_min * 9/5) + 32)} {temperatureScale}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

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

  return (
    <div className='daily-dates'>
      <div className='day-buttons'>{renderDayButtons()}</div>
      <div className='hourly-weather'>{renderHourlyWeather()}</div>
    </div>
  );
};

export default DailyDates;
