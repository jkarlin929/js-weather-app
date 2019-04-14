const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = document.querySelector('[name="appid"]').value;
console.log(API_KEY);

//selects the form
const form = document.querySelector('#form');
//selects the button in the form
const button = document.querySelector('#button');
//selects the zipcode value from the input
const zipcode = document.querySelector('#zip');
const weatherDiv = document.createElement('div');


//get weather data through axios call
const getData = async (zip) => {
  const resp = await axios(`${BASE_URL}zip=${zip}&units=imperial&appid=${API_KEY}`)
  console.log(resp.data);
  return resp.data;
};

const renderWeather = data => {
  const weatherDesc = data.weather[0].description;
  const capWeatherDesc = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
  console.log(capWeatherDesc);
  const weatherText = `
  <span>Location:</span> <span>${data.name}</span>
  <span>Current Temp:</span> <span>${parseInt(data.main.temp)}</span>
  <span>Overcast:</span> <span>${data.clouds.all}%</span>
  <span>Humidity:</span> <span>${data.main.humidity}%</span>
  <span>Pressure:</span> <span>${data.main.pressure} millibars</span>
  <p>High Temp:</p> <p>${parseInt(data.main.temp_max)}</p>
  <p>Low Temp:</p> <p>${parseInt(data.main.temp_min)}%</p>
  <p>Description:</p> <p>${capWeatherDesc}</p>

  `
  weatherDiv.innerHTML = weatherText;
  document.body.appendChild(weatherDiv);
}

//add event listener for the button in the form
button.addEventListener('click', async (e) => {
  e.preventDefault();
  const input = zipcode.value;
  console.log(input);
  const weatherData = await getData(input);
  renderWeather(weatherData);
});
