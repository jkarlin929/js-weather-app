const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const API_KEY = document.querySelector('[name="appid"]').value;

//selects the form
const form = document.querySelector('#form');
//selects the button in the form
const button = document.querySelector('#button');
//selects the zipcode value from the input
const zipcode = document.querySelector('#zip');
const weatherDiv = document.createElement('main');

//get weather data through axios call
const getData = async (zip) => {
  const resp = await axios(`${BASE_URL}zip=${zip}&units=imperial&appid=${API_KEY}`)
  return resp.data;
};

//render weather data
const renderWeather = data => {
  const weatherDesc = data.weather[0].description;
  const capWeatherDesc = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
  //get sunrise data from axios call
  const sunriseData = data.sys.sunrise;
  //get sunset data from axios call
  const sunsetData = data.sys.sunset;
  //add data in seconds to utc time
  const sunsetTzOffset = moment.utc("1970-01-01T00:00:00").add(sunsetData, 'seconds').format();
  const sunriseTzOffset = moment.utc("1970-01-01T00:00:00").add(sunriseData, 'seconds').format();
  //format sunet and sunrise times to
  const sunset = moment(sunsetTzOffset).format("h:mm a");
  const sunrise = moment(sunriseTzOffset).format("h:mm a");
  //render template string and append to body
  const weatherText = `
  <div class="weather">
    <span>Location: ${data.name}</span>
    <span>Current Temp: ${parseInt(data.main.temp)}°F</span>
    <span>Overcast: ${data.clouds.all}%</span>
    <span>Humidity: ${data.main.humidity}%</span>
    <span>Pressure: ${data.main.pressure} millibars</span>
    <p>Description: ${capWeatherDesc}</p>
    <p><i class="fas fa-temperature-high"></i>  High Temp: ${parseInt(data.main.temp_max)}°F</p>
    <p><i class="fas fa-temperature-low"></i>  Low Temp: ${parseInt(data.main.temp_min)}°F</p>
    <p><i class="fas fa-sun"></i>  Sunrise: ${sunrise}</p>
    <p><i class="far fa-sun"></i>  Sunset: ${sunset}</p>
  </div>
  `
  weatherDiv.innerHTML = weatherText;
  document.body.appendChild(weatherDiv);
};

//add event listener for the button in the form
button.addEventListener('click', async (e) => {
  e.preventDefault();
  const input = zipcode.value;
  const weatherData = await getData(input);
  renderWeather(weatherData);
});
