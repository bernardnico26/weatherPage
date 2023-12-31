import { useState } from 'react';
import axios from 'axios';

const CityLocation = ({ setWeatherData,handleSearchQuery }) => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGetWeather = () => {
    const [city, country] = location.split(',');

    const apiKey = '895e467400596c4581be31f04d2ed28d';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()},${country.trim()}&appid=${apiKey}&units=metric`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        handleSearchQuery(`${city.trim()},${country.trim()}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='citylocationsection'>
        <div className='citylocation'>
          <input className='inputlocation' type="text" value={location} onChange={handleLocationChange} placeholder="Tipea exactamente: ciudad, codigo de país"/>
          <button className='buttoninput' onClick={handleGetWeather}><i className='bx bx-search-alt lupa'></i></button>
      </div>
    </div>
    
  );
};

export default CityLocation;