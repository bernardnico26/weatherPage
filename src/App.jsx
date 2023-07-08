import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ClimaDates from './components/ClimaDates';
import DailyDates from './components/DailyDates';
import Loader from './components/Loader';
import CityLocation from './components/CityLocation';

function App() {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState({});
  const [temperatureScale, setTemperatureScale] = useState('°C');
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [showDailyWeather, setShowDailyWeather] = useState(false);
  

  useEffect(() => {
    const getWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lon: longitude });

          const apiKey = '895e467400596c4581be31f04d2ed28d';
          let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          if (searchQuery) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}&units=metric`;
          }
          axios
            .get(apiUrl)
            .then((response) => {
              setWeatherData(response.data);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        });
      } else {
        console.log('No se pudo obtener la ubicación');
      }
    };

    getWeather();
  }, [searchQuery]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handleShowDailyWeather = () => {
    setShowDailyWeather(true);
  };

  const handleHideDailyWeather = () => {
    setShowDailyWeather(false);
  };

  const toggleTemperatureScale = () => {
    setTemperatureScale((prevScale) => (prevScale === '°C' ? '°F' : '°C'));
  };

  return (
    <div className='infoweather'>
      {loading && <Loader />}
      {!loading && (
        <>
          <CityLocation setWeatherData={setWeatherData} handleSearchQuery={handleSearchQuery} />
          <section className='weatherinfo'>
            <ClimaDates weatherData={weatherData} temperatureScale={temperatureScale} />
            <div className='extendedweek'>
              {!showDailyWeather && (
                <button onClick={handleShowDailyWeather} className='diaryweatherbutton'>Ver clima diario</button>
              )}
              {showDailyWeather && (
              <div className='modalinfo'>
                <div className='close'>
                  <button onClick={handleHideDailyWeather}className='closebutton'><i className='bx bx-x'></i></button>
                </div>
                <div className='buttonssection'>
                  <h2>Selecciona una fecha:</h2>
                  <DailyDates lat={coordinates.lat} lon={coordinates.lon} searchQuery={searchQuery} temperatureScale={temperatureScale}/>
                </div>
                
              </div>
              )}
            </div>
          </section>
          <button onClick={toggleTemperatureScale} className='tempchange'>
          Cambiar a {temperatureScale === '°C' ? '°F' : '°C'}
          </button>
          
        </>
      )}
    </div>
  );
}

export default App;
