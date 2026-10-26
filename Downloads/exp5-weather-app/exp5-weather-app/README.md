# Experiment 5 - Weather App

A weather app made with HTML, CSS and JavaScript for Web Development Lab (Week 5).
It uses the Fetch API to get real-time weather data of the city typed by the user.

## How it works
1. The user types a city name and clicks Search (or presses Enter)
2. The Open-Meteo Geocoding API gives the latitude and longitude of the city
3. The Open-Meteo Weather API gives the current weather for that location
4. The temperature, feels like, humidity, wind speed and weather condition are shown on the page

Open-Meteo is free and does not need an API key.

## Features
- Fetch API with async/await
- Error messages for empty input, wrong city name and network problems
- Search with button or Enter key

## Files
- `index.html` - the page
- `style.css` - styling
- `script.js` - JavaScript code that fetches and shows the data

## Live site
https://tanavs1.github.io/exp5-weather-app/
