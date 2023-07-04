
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const apiKey = '895e467400596c4581be31f04d2ed28d';
          const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
console.log (apiUrl)
          axios
            .get(apiUrl)
            .then((response) => {
              const weatherData = response.data;
              setWeatherData(weatherData);
            })
            .catch((error) => {
              console.log('Error al obtener los datos del clima:', error);
            });
        });
      } else {
        console.log('Geolocalización no es compatible en este navegador');
      }
    };

    getWeather();
  }, []);

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Información del Clima</h2>
          <p>Temperatura: {weatherData.list[0].main?.temp}°C</p>
          <p>Ciudad: {weatherData.city?.name}</p>
          <p>País: {weatherData.city?.country}</p>
            <div>
              <p>Icono: {weatherData.list[0].weather[0]?.icon}</p>
              <p>Estado: {weatherData.list[0].weather[0]?.description}</p>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
