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
  const weatherText = `
  Name: <p>${data.name}</p>

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
