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
//// function to switch for the current temperatures and data
function search(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let search_input = search_value();
  // conditional to update the API link according to the current city.
  if (search_input === true) {
    city = document.querySelector("h1").innerHTML = `${search_input}`;
    metricTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${metricUnits}`;
    //function to get the data from the Axios/API
    function displayTemp(response) {
      let temp = Math.round(response.data.main.temp);
      let actual_temperature = document.querySelector("p");
      actual_temperature.innerHTML = `${temp}°`;
      spec(response);
    }
    // functions to update the temperature according of user choice
    //celcius
    let celcius_temp = document.querySelector("#celcius-temp");
    celcius_temp.addEventListener("click", function (event) {
      event.preventDefault();
      axios.get(metricTemp).then(function (response) {
        console.log(response.data.main.temp);
        let temp = Math.round(response.data.main.temp);
        let temp_met = document.querySelector("p");
        temp_met.innerHTML = `${temp}°`;
      });
    });
    //farenheit
    let faren_temp = document.querySelector("#farenheit-temp");
    faren_temp.addEventListener("click", function (event) {
      let imperialTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${imperialUnits}`;
      event.preventDefault();
      axios.get(imperialTemp).then(function (response) {
        console.log(response.data.main.temp);
        let temp = Math.round(response.data.main.temp);
        let temp_imp = document.querySelector("p");
        temp_imp.innerHTML = `${temp}°`;
      });
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
    axios.get(metricTemp).then(function (response) {
      console.log(response.data.main.temp);
      let temp = Math.round(response.data.main.temp);
      let temp_met = document.querySelector("p");
      temp_met.innerHTML = `${temp}°`;
    });
  });
  // functions to update the temperature according of user choice
  //farenheit
  let faren_temp = document.querySelector("#farenheit-temp");
  faren_temp.addEventListener("click", function (event) {
    let imperialTemp = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=${imperialUnits}`;
    event.preventDefault();
    axios.get(imperialTemp).then(function (response) {
      console.log(response.data.main.temp);
      let temp = Math.round(response.data.main.temp);
      let temp_imp = document.querySelector("p");
      temp_imp.innerHTML = `${temp}°`;
    });
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

//////CURRENT TEMPERATURE//////////////////
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
  axios.get(metricTemp).then(function (response) {
    console.log(response.data.main.temp);
    let temp = Math.round(response.data.main.temp);
    let temp_met = document.querySelector("p");
    temp_met.innerHTML = `${temp}°`;
  });
});

let faren_temp = document.querySelector("#farenheit-temp");
faren_temp.addEventListener("click", function (event) {
  event.preventDefault();
  axios.get(imperialTemp).then(function (response) {
    console.log(response.data.main.temp);
    let temp = Math.round(response.data.main.temp);
    let temp_imp = document.querySelector("p");
    temp_imp.innerHTML = `${temp}°`;
  });
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
