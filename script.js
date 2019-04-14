const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = document.querySelector('[name="appid"]');

//selects the form
const form = document.querySelector('#form');
//selects the button in the form
const button = document.querySelector('#button');
//selects the zipcode value from the input
const zipcode = document.querySelector('#zip');

//add event listener for the button in the form
button.addEventListener('click', (e) => {
  e.preventDefault();
  const input = zipcode.value;
  console.log(input);
});



// const getData = async (zip) => {
//   const resp = await axios(`${BASE_URL}zip=${zip}&units=imperial&appid=${API_KEY}`)
//   console.log(resp);
//   return resp;
// };
