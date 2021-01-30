function getUserLocation() {
  if (navigator.geolocation) {
    // If browser has geolocation enabled
    navigator.geolocation.getCurrentPosition(function (position) {
      let userLat = position.coords.latitude.toFixed(4); // Set userLat to object values, round to 4 decimals
      let userLong = position.coords.longitude.toFixed(4); // Set userLat to object values, round to 4 decimals
      fetchMapApi(userLat, userLong); // Pass userLat and user Long to MapApi to get MapBox object
      fetchApi(userLat, userLong); // Pass userLat and user Long to DarkSky to get weather object
    });
  } else {
    console.log("Geolocation not supported by this browser.");
  }
}

const userInputField = document.getElementById("user-input-field");
userInputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    userInput();
  }
});

// User can enter a city name into the search field to find city
function userInput() {
  // Set city to search bar from HTML
  let city = document.getElementById("user-input-field").value.toLowerCase();
  // Turn search bar value all lowercase and replace spaces with dashes
  city = city.replace(/\s+/g, "-");
  // Pass value to function to get MapBox object from city name
  fetchMapApiForCity(city);

  document.getElementById("user-input-field").value = "";
}

// Use the MapBox API to fetch the user's latitude and longitude from city name input
async function fetchMapApiForCity(userInputCity) {
  // API Key and URL
  const apiKey =
    ".json?types=place&access_token=pk.eyJ1IjoiYnJhZHl2b3NzbGVyIiwiYSI6ImNqdjRncnFxeTA1ZzIzeW8ydW5tcWd5eTkifQ.PxozC03Ll04Dd-17nZwJ_g";
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

  //Fetch API
  const response = await fetch(apiUrl + userInputCity + apiKey);
  const data = await response.json();

  // Set latitude and longitude of user based on return object for city
  const cityLat = data.features["0"].center[1];
  const cityLong = data.features["0"].center[0];

  // Set userCityName to correct city
  const userCityName = document.getElementById("user-location");
  userCityName.innerHTML = data.features["0"].text;

  console.log(data);
  // Pass cityLat and cityLong to DarkSky API
  fetchApi(cityLat, cityLong);
}

// Use the MapBox API to fetch the user's city from latitude and longitude
async function fetchMapApi(userLatitude, userLongitude) {
  // API Key and URL
  const apiKey =
    ".json?types=place&access_token=pk.eyJ1IjoiYnJhZHl2b3NzbGVyIiwiYSI6ImNqdjRncnFxeTA1ZzIzeW8ydW5tcWd5eTkifQ.PxozC03Ll04Dd-17nZwJ_g";
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

  //Fetch API
  const response = await fetch(
    apiUrl + userLongitude + "," + userLatitude + apiKey
  );
  const data = await response.json();

  //console.log(data);
  const userCityName = document.getElementById("user-location");
  userCityName.innerHTML = data.features["0"].text;
}

// Use the DarkSky API to fetch weather object and convert to JSON
async function fetchApi(lat, long) {
  //console.log(lat, long);

  // API Key and URL
  const apiKey = "4100d18e844539e13bb8bb6570b7629f/";
  const apiUrl =
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";

  //Fetch API
  const response = await fetch(apiUrl + apiKey + lat + "," + long);

  //Wait for API to fetch, then parse as JSON
  const data = await response.json();
  console.log(data);

  // Log the JSON data from response
  fillPage(data);
  createAlert(data);
}

// Fill all elements on the page with correct data from DarkSky object
function fillPage(darkSkyData) {
  // Fill constants with nodes from DOM
  const currentTemp = document.getElementById("current-temp");
  const currentIcon = document.querySelector("#right-now-climacon-svg");
  const feelsLike = document.getElementById("feels-like-data");
  const windSpeed = document.getElementById("wind-speed-data");
  const humidity = document.getElementById("humidity-data");
  const dewPoint = document.getElementById("dew-point-data");
  const windDirection = document.getElementById("wind-bearing-data");

  // Fill data to DOM nodes
  currentTemp.textContent = Math.round(darkSkyData.currently.temperature);
  currentIcon.src = "climacons/" + darkSkyData.currently.icon + ".svg";
  feelsLike.textContent =
    "Feels like: " + Math.round(darkSkyData.currently.apparentTemperature);
  windSpeed.textContent = Math.round(darkSkyData.currently.windSpeed) + " mph";
  humidity.textContent = Math.round(darkSkyData.currently.humidity * 100) + "%";
  dewPoint.textContent = Math.round(darkSkyData.currently.dewPoint);
  windDirection.textContent = setWindBearing(darkSkyData.currently.windBearing);

  const day0Name = document.getElementById("day0-name");
  const day1Name = document.getElementById("day1-name");
  const day2Name = document.getElementById("day2-name");
  const day3Name = document.getElementById("day3-name");
  const day4Name = document.getElementById("day4-name");

  const day0High = document.getElementById("day0-high");
  const day1High = document.getElementById("day1-high");
  const day2High = document.getElementById("day2-high");
  const day3High = document.getElementById("day3-high");
  const day4High = document.getElementById("day4-high");

  const day0Low = document.getElementById("day0-low");
  const day1Low = document.getElementById("day1-low");
  const day2Low = document.getElementById("day2-low");
  const day3Low = document.getElementById("day3-low");
  const day4Low = document.getElementById("day4-low");

  const day0Icon = document.getElementById("day0-icon");
  const day1Icon = document.getElementById("day1-icon");
  const day2Icon = document.getElementById("day2-icon");
  const day3Icon = document.getElementById("day3-icon");
  const day4Icon = document.getElementById("day4-icon");

  //////////// 5 DAY OUTLOOK //////////////////
  // Create empty arrays to hold next 5 days info
  const highs = [];
  const lows = [];

  const dayNumbers = [];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayNames = [];
  const dayIcons = [];

  // Loop through array adding temps for each hour
  for (let i = 0; i < 5; i++) {
    // Rounds down to nearest degree, will always be up to date from API
    highs[i] = Math.round(darkSkyData.daily.data[i].temperatureHigh);
    lows[i] = Math.round(darkSkyData.daily.data[i].temperatureLow);

    dayNumbers[i] = new Date(darkSkyData.daily.data[i].time * 1000).getDay();
    dayIcons[i] = darkSkyData.daily.data[i].icon;
  }

  for (let i = 0; i < dayNumbers.length; i++) {
    dayNames[i] = days[dayNumbers[i]];
  }

  // Fills daily highs from array
  day0High.innerHTML = highs[0];
  day1High.innerHTML = highs[1];
  day2High.innerHTML = highs[2];
  day3High.innerHTML = highs[3];
  day4High.innerHTML = highs[4];

  // Fill daily lows from array
  day0Low.innerHTML = lows[0];
  day1Low.innerHTML = lows[1];
  day2Low.innerHTML = lows[2];
  day3Low.innerHTML = lows[3];
  day4Low.innerHTML = lows[4];

  day0Name.innerHTML = dayNames[0];
  day1Name.innerHTML = dayNames[1];
  day2Name.innerHTML = dayNames[2];
  day3Name.innerHTML = dayNames[3];
  day4Name.innerHTML = dayNames[4];

  day0Icon.src = "climacons/" + dayIcons[0] + ".svg";
  day1Icon.src = "climacons/" + dayIcons[1] + ".svg";
  day2Icon.src = "climacons/" + dayIcons[2] + ".svg";
  day3Icon.src = "climacons/" + dayIcons[3] + ".svg";
  day4Icon.src = "climacons/" + dayIcons[4] + ".svg";
}

addEventListener("load", getUserLocation);

const otherConditions = document.getElementById("other-conditions");
const hourlySection = document.getElementById("hourly-forecast");
const dailySection = document.getElementById("five-day-outlook");

function createAlert(data) {
  if (data.alerts) {
    const alertBox = document.createElement("span");
    const main = document.getElementById("main");
    alertBox.textContent = data.alerts["0"].title;
    main.insertBefore(alertBox, document.getElementById("current-conditions"));
  }
}

/*

Wind bearing:
350 to 010 - North
011 to 039 - NNE
040 to 050 - NE
051 to 079 - ENE

80 to 100 - East
101 to 129 - ESE
130 to 140 - SE
141 to 169 - SSE

170 to 190 - South
191 to 219 - SSW
220 to 230 - SW
231 to 259 - WSW

260 to 280 - West
281 to 309 - WNW
310 to 320 - NW
321 to 349 - NNW

Write a switch statement:
*/

const setWindBearing = (x) => {
  let windBearingNumber = x; //darkSkyData.currently.windBearing;
  switch (true) {
    case windBearingNumber >= 350 || windBearingNumber <= 010:
      return "N";
    case windBearingNumber <= 39:
      return "NNE";
    case windBearingNumber <= 050:
      return "NE";
    case windBearingNumber <= 79:
      return "ENE";
    case windBearingNumber <= 100:
      return "E";
    case windBearingNumber <= 129:
      return "ESE";
    case windBearingNumber <= 140:
      return "SE";
    case windBearingNumber <= 169:
      return "SSE";
    case windBearingNumber <= 190:
      return "S";
    case windBearingNumber <= 219:
      return "SSW";
    case windBearingNumber <= 230:
      return "SW";
    case windBearingNumber <= 259:
      return "WSW";
    case windBearingNumber <= 280:
      return "W";
    case windBearingNumber <= 309:
      return "WNW";
    case windBearingNumber <= 320:
      return "NW";
    case windBearingNumber <= 349:
      return "NNW";
    default:
      return "--";
  }
};
