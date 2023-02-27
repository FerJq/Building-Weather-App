//Description about it Weather information
function spec(response) {
  //description
  let description = document.querySelector("#weather-type");
  let type = `${response.data.weather[0].description}`;
  let climate = type.charAt(0).toUpperCase() + type.slice(1);
  description.innerHTML = `Weather: ${climate}`;

  let precipitation = document.querySelector("#prec");
  let clouds = `Precip: ${response.data.clouds.all}%`;
  precipitation.innerHTML = `${clouds}`;

  let humidity = document.querySelector("#hum");
  let hum = `Humidity: ${response.data.main.humidity}%`;
  humidity.innerHTML = `${hum}`;

  let wind = document.querySelector("#wind");
  let air = `Wind: ${response.data.wind.speed}mph`;
  wind.innerHTML = `${air}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

///Show Forecast Temperature
function showForecast() {
  let forecastItem = document.querySelector("#forecast-container");
  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML += `
            <div class="col-2">
              <div class="weather-day">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/11d@2x.png"
                alt=""
                width="36"
              />
              <div class="degrees-date-forecast">
                <span class="max-temperature-day">18°</span>
                <span class="min-temperature-day">12°</span>
              </div>
            </div>`;
  });
  forecastHTML += `</div>`;
  forecastItem.innerHTML = forecastHTML;
}

/// function to alert a null input and update the city.
function search_value() {
  let search_input = document.querySelector("#location-value");
  let heading = document.querySelector("h1");
  let value = `${search_input.value}`;
  let search_value = value.charAt(0).toUpperCase() + value.slice(1);

  console.log(search_value);
  if (search_value === "") {
    alert("Type something");
  } else {
    return (heading.innerHTML = `${search_value}`);
  }
}

function displayTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let actual_temperature = document.querySelector("p");
  actual_temperature.innerHTML = `${temp}°`;
  spec(response);
}
//// function to switch for the current temperatures and data
function search(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let search_input = search_value();
  // conditional to update the API link according to the current city.
  if (search_input === true) {
    city = document.querySelector("h1").innerHTML = `${search_input}`;
    metricTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${metricUnits}`;
    // functions to update the temperature according of user choice
    //celcius
    let celcius_temp = document.querySelector("#celcius-temp");
    celcius_temp.addEventListener("click", function (event) {
      event.preventDefault();
      axios.get(metricTemp).then(displayTemp);
    });
    //farenheit
    let faren_temp = document.querySelector("#farenheit-temp");
    faren_temp.addEventListener("click", function (event) {
      let imperialTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${imperialUnits}`;
      event.preventDefault();
      axios.get(imperialTemp).then(displayTemp);
    });
  } else {
    //function to keep the default data.
    metricTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${metricUnits}`;
    function displayTemp(response) {
      let temp = Math.round(response.data.main.temp);
      let actual_temperature = document.querySelector("p");
      actual_temperature.innerHTML = `${temp}°`;
      spec(response);
    }
  }
  // functions to update the temperature according of user choice
  //celcius
  let celcius_temp = document.querySelector("#celcius-temp");
  celcius_temp.addEventListener("click", function (event) {
    event.preventDefault();
    axios.get(metricTemp).then(displayTemp);
  });
  // functions to update the temperature according of user choice
  //farenheit
  let faren_temp = document.querySelector("#farenheit-temp");
  faren_temp.addEventListener("click", function (event) {
    let imperialTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${imperialUnits}`;
    event.preventDefault();
    axios.get(imperialTemp).then(displayTemp);
  });
  // calling the AXIOS function
  axios.get(metricTemp).then(displayTemp);
}
//API DATA
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

city = document.querySelector("h1");
let apiKey = "1de91703be71c0068e825d28f2c28d4b";
let metricUnits = "metric";
let imperialUnits = "imperial";
let metricTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${metricUnits}`;
let imperialTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${imperialUnits}`;

//////CURRENT TEMPERATURE///////////
if (search_value === "") {
  function displayTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let actual_temperature = document.querySelector("p");
    actual_temperature.innerHTML = `${temp}°`;
    spec(response);
  }
} else {
  metricTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${metricUnits}`;
  function displayTemp(response) {
    let temp = Math.round(response.data.main.temp);
    let actual_temperature = document.querySelector("p");
    actual_temperature.innerHTML = `${temp}°`;
    spec(response);
  }
}

axios.get(metricTemp).then(displayTemp);

///////////////GET TEMP METRIC OR IMPERIAL//////////////////////////
let celcius_temp = document.querySelector("#celcius-temp");
celcius_temp.addEventListener("click", function (event) {
  event.preventDefault();
  axios.get(metricTemp).then(displayTemp);
});

let faren_temp = document.querySelector("#farenheit-temp");
faren_temp.addEventListener("click", function (event) {
  event.preventDefault();
  axios.get(imperialTemp).then(displayTemp);
});

/// DISPLAY CURRENT HOUR AND DAY
let today = new Date();
let timing = document.querySelector("#time");
let hour = today.getHours();
let min = today.getMinutes();
let day = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuesday",
  "Friday",
  "Saturday",
];

timing.innerHTML = `${days[day]}, ${hour}:${min} `;
//// KNOW YOU COORDS BUTTON

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = `${position.coords.latitude}`;
    let longitude = `${position.coords.longitude}`;
    alert(`These are you coords! Lat: ${latitude} and Long: ${longitude} ✈️`);
  });
}

let coords = document.querySelector("#coords");
coords.addEventListener("click", getCurrentPosition);
/////////Night Mode//////////////
function darkMode() {
  alert(
    "The Day or Night preview will be visualized, once Current button is pressed, it will return as default time!"
  );
  let theme_bt = document.querySelector("#modeContainer");

  if (theme_bt.classList.contains("weather-app")) {
    theme_bt.classList.remove("weather-app");
    theme_bt.classList.add("darkmode");
  } else {
    theme_bt.classList.remove("darkmode");
    theme_bt.classList.add("weather-app");
  }
}

let night_button = document.querySelector("#mode_bt");
night_button.addEventListener("click", darkMode);
////MODE TIME PREVIEW ACCORDING THE TIME////
let theme_bt = document.querySelector("#modeContainer");
let hour_mode = new Date();
let night_hour = hour_mode.getHours();
if (night_hour >= 18 || night_hour <= 6) {
  theme_bt.classList.contains("weather-app");
  theme_bt.classList.remove("weather-app");
  theme_bt.classList.add("darkmode");
} else {
  theme_bt.classList.remove("darkmode");
  theme_bt.classList.add("weather-app");
}

////Forecast Weather///////////
showForecast();
