import { useEffect } from 'react';
import axios from 'axios';

function ClimaDates() {
  useEffect(() => {
    const apiKey = '895e467400596c4581be31f04d2ed28d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        console.log(weatherData);
        // Aquí puedes utilizar los datos de la API para mostrarlos en pantalla
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Datos del clima</h2>
      {/* Ejemplo de cómo mostrar algunos valores */}
      <p>Temperatura: {weatherData?.main.temp} K</p>
      <p>Humedad: {weatherData?.main.humidity}%</p>
      <p>Descripción: {weatherData?.weather[0].description}</p>
    </div>
  );
}

export default ClimaDates;
