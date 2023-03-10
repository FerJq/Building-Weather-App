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

function currentCity(response) {
  console.log(response.data);
  let city = document.querySelector("h1");
  city.innerHTML = response.data.name;
}
currentCity;
//// KNOW YOU COORDS BUTTON

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = `${position.coords.latitude}`;
    let longitude = `${position.coords.longitude}`;
    alert(`These are you coords! Lat: ${latitude} and Long: ${longitude} ✈️`);
  });
}

//Current hour and day
function dayHour() {
  let today = new Date();
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

  time = `${days[day]}, ${hour}:${min} `;
  return time;
}

function nameDays(formatday) {
  let date = new Date(formatday * 1000);
  let day = date.getDay();
  let array_days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return array_days[day];
}
//Weather Forecast HTML
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastItem = document.querySelector("#forecast-container");
  let forecastHTML = `<div class="row">`;
  //Forecast Units funtion

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let max = Math.round(forecastDay.temp.max);
      let min = Math.round(forecastDay.temp.min);
      forecastHTML += `
            <div class="col-2">
              <div class="weather-day">${nameDays(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="50"
              />
              <div class="degrees-date-forecast">
                <span class="max-temperature-day">${max}°</span>
                <span class="min-temperature-day">${min}°</span>
              </div>
            </div>`;
    }
  });
  forecastHTML += `</div>`;
  forecastItem.innerHTML = forecastHTML;
}

//Forecast Coordinates
function getCoord(coordinates) {
  let apiKey = "97bed167ec49bff56e6c1b63daef9c86";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  let celcius_temp = document.querySelector("#celcius-temp");
  celcius_temp.addEventListener("click", function (event) {
    faren_temp.classList.remove("active");
    celcius_temp.classList.add("active");
    event.preventDefault();
    apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showForecast);
  });
  let faren_temp = document.querySelector("#farenheit-temp");
  faren_temp.addEventListener("click", function (event) {
    faren_temp.classList.add("active");
    celcius_temp.classList.remove("active");
    event.preventDefault();
    apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(showForecast);
  });

  axios.get(apiURL).then(showForecast);
}

//Function temperatures and specifications
function showTemp_showSpec(response) {
  //current temperature
  let actualTemp = document.querySelector(".temperature");
  let temp = Math.round(response.data.main.temp);
  temperature_unit = temp;
  actualTemp.innerHTML = `${temperature_unit}°`;
  // Faren and celcius temperatures options
  //Celsius
  let celcius_temp = document.querySelector("#celcius-temp");
  celcius_temp.addEventListener("click", function (event) {
    faren_temp.classList.remove("active");
    celcius_temp.classList.add("active");
    event.preventDefault();
    let temp_met = document.querySelector("p");
    temp_met.innerHTML = `${temperature_unit}°`;
  });

  let faren_temp = document.querySelector("#farenheit-temp");
  faren_temp.addEventListener("click", function (event) {
    faren_temp.classList.add("active");
    celcius_temp.classList.remove("active");
    event.preventDefault();
    temp = (temperature_unit * 9) / 5 + 32;
    let temp_faren = document.querySelector("p");
    temp_faren.innerHTML = `${Math.round(temp)}°`;
  });
  // Current Day, hour and minutes
  let time = document.querySelector("#time");
  time.innerHTML = dayHour();
  // Weather description
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

  getCoord(response.data.coord);
}

//search city input
function search(city_input) {
  let apiKey = "1de91703be71c0068e825d28f2c28d4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_input}&appid=${apiKey}&units=metric`;
  //calling the temperature
  axios.get(apiUrl).then(showTemp_showSpec);
}
//submit form fuction
function Submit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#location-value");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${cityInputElement.value}`;
  search(cityInputElement.value);
}

let temperature_unit = null;

search("New York");
// form submit
let form = document.querySelector("#search-form");
form.addEventListener("submit", Submit);

//coords button
let coords = document.querySelector("#coords");
coords.addEventListener("click", getCurrentPosition);

// Theme button
let night_button = document.querySelector("#mode_bt");
night_button.addEventListener("click", darkMode);

//condition for day and night tme
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
