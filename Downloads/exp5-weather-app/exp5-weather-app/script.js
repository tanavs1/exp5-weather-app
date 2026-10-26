// getting elements from the page
var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var message = document.getElementById("message");
var weatherBox = document.getElementById("weatherBox");

var cityName = document.getElementById("cityName");
var description = document.getElementById("description");
var temperature = document.getElementById("temperature");
var feelsLike = document.getElementById("feelsLike");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");

// weather codes given by the API and what they mean
var weatherCodes = {
  0: "Clear sky",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Cloudy",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail"
};

// function to show a message (normal or error)
function showMessage(text, isError) {
  message.textContent = text;
  if (isError) {
    message.className = "error";
  } else {
    message.className = "";
  }
}

// main function: gets the weather of the city typed by the user
async function getWeather() {
  var city = cityInput.value.trim();

  // check for empty input
  if (city === "") {
    showMessage("Please enter a city name", true);
    weatherBox.classList.add("hidden");
    return;
  }

  showMessage("Loading...", false);
  weatherBox.classList.add("hidden");

  try {
    // Step 1: find the latitude and longitude of the city
    var geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" +
                 encodeURIComponent(city) + "&count=1";
    var geoResponse = await fetch(geoUrl);
    var geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      showMessage("City not found. Please check the spelling.", true);
      return;
    }

    var place = geoData.results[0];

    // Step 2: get the current weather for that location
    var weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
                     "&longitude=" + place.longitude +
                     "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m";
    var weatherResponse = await fetch(weatherUrl);
    var weatherData = await weatherResponse.json();

    var current = weatherData.current;

    // Step 3: show the data on the page
    cityName.textContent = place.name + ", " + place.country;
    description.textContent = weatherCodes[current.weather_code] || "Weather data";
    temperature.textContent = Math.round(current.temperature_2m) + "°C";
    feelsLike.textContent = Math.round(current.apparent_temperature) + "°C";
    humidity.textContent = current.relative_humidity_2m + "%";
    wind.textContent = current.wind_speed_10m + " km/h";

    showMessage("", false);
    weatherBox.classList.remove("hidden");

  } catch (error) {
    // runs if there is no internet or the API fails
    showMessage("Could not get weather data. Check your internet and try again.", true);
    console.log(error);
  }
}

// search when button is clicked
searchBtn.addEventListener("click", getWeather);

// search when Enter key is pressed
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    getWeather();
  }
});
