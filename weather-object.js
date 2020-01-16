function getUserLocation() {
  if (navigator.geolocation) { // If browser has geolocation enabled
    navigator.geolocation.getCurrentPosition(function (position) {
      let userLat = position.coords.latitude.toFixed(4); // Set userLat to object values, round to 4 decimals
      let userLong = position.coords.longitude.toFixed(4); // Set userLat to object values, round to 4 decimals
      fetchMapApi(userLat, userLong); // Pass userLat and user Long to MapApi to get MapBox object
      fetchApi(userLat, userLong); // Pass userLat and user Long to DarkSky to get weather object
    })
  } else {
    console.log('Geolocation not supported by this browser.');
  }
}

// User can enter a city name into the search field to find city
function userInput() {
  // Set city to search bar from HTML
  let city = document.getElementById('user-input-field').value.toLowerCase();
  // Turn search bar value all lowercase and replace spaces with dashes
  city = city.replace(/\s+/g, '-');
  // Pass value to function to get MapBox object from city name
  fetchMapApiForCity(city);
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
  const cityLat = data.features['0'].center[1];
  const cityLong = data.features['0'].center[0];
  
  // Set userCityName to correct city
  const userCityName = document.getElementById('user-location');
  userCityName.innerHTML = data.features['0'].text;

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
  const response = await fetch(apiUrl + userLongitude + ',' + userLatitude + apiKey);
  const data = await response.json();

  //console.log(data);
  const userCityName = document.getElementById('user-location');
  userCityName.innerHTML = data.features['0'].text;
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
  const currentTemp = document.getElementById('current-temp');
  const currentIcon = document.querySelector('#right-now-climacon-svg');
  const currentCondition = document.getElementById('current-condition')
  const feelsLike = document.getElementById('feels-like-data');
  const windSpeed = document.getElementById('wind-speed-data');
  const humidity = document.getElementById('humidity-data');
  const dewPoint = document.getElementById('dew-point-data');

  const hour0Temp = document.getElementById('hour0-temp');
  const hour1Temp = document.getElementById('hour1-temp');
  const hour2Temp = document.getElementById('hour2-temp');
  const hour3Temp = document.getElementById('hour3-temp');
  const hour4Temp = document.getElementById('hour4-temp');
  const hour5Temp = document.getElementById('hour5-temp');

  const hour0Time = document.getElementById('hour0');
  const hour1Time = document.getElementById('hour1');
  const hour2Time = document.getElementById('hour2');
  const hour3Time = document.getElementById('hour3');
  const hour4Time = document.getElementById('hour4');
  const hour5Time = document.getElementById('hour5');

  const hour0condition = document.getElementById('hour0-condition');
  const hour1condition = document.getElementById('hour1-condition');
  const hour2condition = document.getElementById('hour2-condition');
  const hour3condition = document.getElementById('hour3-condition');
  const hour4condition = document.getElementById('hour4-condition');
  const hour5condition = document.getElementById('hour5-condition');

  const day0Name = document.getElementById('day0-name');
  const day1Name = document.getElementById('day1-name');
  const day2Name = document.getElementById('day2-name');
  const day3Name = document.getElementById('day3-name');
  const day4Name = document.getElementById('day4-name');

  const day0High = document.getElementById('day0-high');
  const day1High = document.getElementById('day1-high');
  const day2High = document.getElementById('day2-high');
  const day3High = document.getElementById('day3-high');
  const day4High = document.getElementById('day4-high');

  const day0Low = document.getElementById('day0-low');
  const day1Low = document.getElementById('day1-low');
  const day2Low = document.getElementById('day2-low');
  const day3Low = document.getElementById('day3-low');
  const day4Low = document.getElementById('day4-low');

  const day0Icon = document.getElementById('day0-icon');
  const day1Icon = document.getElementById('day1-icon');
  const day2Icon = document.getElementById('day2-icon');
  const day3Icon = document.getElementById('day3-icon');
  const day4Icon = document.getElementById('day4-icon');

  const day0Precip = document.getElementById('day0-precip');
  const day1Precip = document.getElementById('day1-precip');
  const day2Precip = document.getElementById('day2-precip');
  const day3Precip = document.getElementById('day3-precip');
  const day4Precip = document.getElementById('day4-precip');
  
  
  // Fill data to DOM nodes
  currentTemp.textContent = Math.round(darkSkyData.currently.temperature);
  currentIcon.src = "climacons/" + darkSkyData.currently.icon + ".svg"
  currentCondition.textContent = darkSkyData.currently.summary;
  feelsLike.textContent = Math.round(darkSkyData.currently.apparentTemperature);
  windSpeed.textContent = Math.round(darkSkyData.currently.windSpeed) + ' mph';
  humidity.textContent = Math.round(darkSkyData.currently.humidity * 100) + '%';
  dewPoint.textContent = Math.round(darkSkyData.currently.dewPoint);

  //////////// NEXT 6 HOURS TEMPS //////////////////
  /*
  // Create empty array to hold next 6 hours of temps
  const hours = [];
  const hourTimes = [];
  const hourConditions = [];

  // Loop through array adding temps for each hour
  for (let i = 0; i < 6; i++) {
    // Rounds down to nearest degree, will always be up to date from API
    hours[i] = Math.round(darkSkyData.hourly.data[i].temperature);
    hourTimes[i] = new Date(darkSkyData.hourly.data[i].time * 1000).toLocaleString("en-US", {timeZone: darkSkyData.timezone, hour: 'numeric'});
    hourConditions[i] = darkSkyData.hourly.data[i].summary;
  }

  hour0Temp.innerHTML = hours[0];
  hour1Temp.innerHTML = hours[1];
  hour2Temp.innerHTML = hours[2];
  hour3Temp.innerHTML = hours[3];
  hour4Temp.innerHTML = hours[4];
  hour5Temp.innerHTML = hours[5];

  hour0condition.innerHTML = hourConditions[0];
  hour1condition.innerHTML = hourConditions[1];
  hour2condition.innerHTML = hourConditions[2];
  hour3condition.innerHTML = hourConditions[3];
  hour4condition.innerHTML = hourConditions[4];
  hour5condition.innerHTML = hourConditions[5];

  hour0Time.innerHTML = (hourTimes[0].replace(' AM', 'am').replace(' PM', 'pm'));
  hour1Time.innerHTML = (hourTimes[1].replace(' AM', 'am').replace(' PM', 'pm'));
  hour2Time.innerHTML = (hourTimes[2].replace(' AM', 'am').replace(' PM', 'pm'));
  hour3Time.innerHTML = (hourTimes[3].replace(' AM', 'am').replace(' PM', 'pm'));
  hour4Time.innerHTML = (hourTimes[4].replace(' AM', 'am').replace(' PM', 'pm'));
  hour5Time.innerHTML = (hourTimes[5].replace(' AM', 'am').replace(' PM', 'pm'));
  /////////////////////////////////////////////
*/
  //////////// 5 DAY OUTLOOK //////////////////
  // Create empty arrays to hold next 5 days info
  const highs = [];
  const lows = [];
  const precips= [];
  const dayNumbers = [];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayNames = [];
  const dayIcons = [];
  
  // Loop through array adding temps for each hour
  for (let i = 0; i < 5; i++) {
    // Rounds down to nearest degree, will always be up to date from API
    highs[i] = Math.round(darkSkyData.daily.data[i].temperatureHigh);
    lows[i] = Math.round(darkSkyData.daily.data[i].temperatureLow);
    precips[i] = Math.round((darkSkyData.daily.data[i].precipProbability) * 100);
    dayNumbers[i] = new Date(darkSkyData.daily.data[i].time * 1000).getDay();
    dayIcons[i] = darkSkyData.daily.data[i].icon;
  }    
  
  for (let i = 0; i < dayNumbers.length; i++) {
    dayNames[i] = days[dayNumbers[i]];
  }


  // Fills daily highs from array
  day0High.innerHTML = 'High: ' + highs[0] + '&deg;';
  day1High.innerHTML = 'High: ' + highs[1] + '&deg;';
  day2High.innerHTML = 'High: ' + highs[2] + '&deg;';
  day3High.innerHTML = 'High: ' + highs[3] + '&deg;';
  day4High.innerHTML = 'High: ' + highs[4] + '&deg;';
  
  // Fill daily lows from array
  day0Low.innerHTML = 'Low: ' + lows[0] + '&deg;';
  day1Low.innerHTML = 'Low: ' + lows[1] + '&deg;';
  day2Low.innerHTML = 'Low: ' + lows[2] + '&deg;';
  day3Low.innerHTML = 'Low: ' + lows[3] + '&deg;';
  day4Low.innerHTML = 'Low: ' + lows[4] + '&deg;';

  day0Precip.innerHTML = 'Precip: ' + precips[0] + '%';
  day1Precip.innerHTML = 'Precip: ' + precips[1] + '%';
  day2Precip.innerHTML = 'Precip: ' + precips[2] + '%';
  day3Precip.innerHTML = 'Precip: ' + precips[3] + '%';
  day4Precip.innerHTML = 'Precip: ' + precips[4] + '%';

  day0Name.innerHTML = dayNames[0];
  day1Name.innerHTML = dayNames[1];
  day2Name.innerHTML = dayNames[2];
  day3Name.innerHTML = dayNames[3];
  day4Name.innerHTML = dayNames[4];

  day0Icon.src = 'climacons/' + dayIcons[0] + '.svg';
  day1Icon.src = 'climacons/' + dayIcons[1] + '.svg';
  day2Icon.src = 'climacons/' + dayIcons[2] + '.svg';
  day3Icon.src = 'climacons/' + dayIcons[3] + '.svg';
  day4Icon.src = 'climacons/' + dayIcons[4] + '.svg';
}

addEventListener('load', getUserLocation);


const otherConditions = document.getElementById('other-conditions');
const hourlySection = document.getElementById('hourly-forecast');
const dailySection = document.getElementById('five-day-outlook');

function createAlert(data) {
  if (data.alerts) {
    const alertBox = document.createElement('span');
    const currentConditions = document.getElementById('current-conditions');
    alertBox.textContent = data.alerts['0'].title;
    currentConditions.insertBefore(alertBox, document.getElementById('climacon-temp-condition'));
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

function test(x) {
  let windBearingNumber = x//darkSkyData.currently.windBearing;
  switch (true) {
    case (windBearingNumber >= 350 || windBearingNumber <= 010):
      console.log("N");
      break;
    case (windBearingNumber <= 39):
      console.log("NNE");
      break;
    case (windBearingNumber <= 050):
      console.log("NE");
      break;
    case (windBearingNumber <= 79):
      console.log("ENE");
      break;
    case (windBearingNumber <= 100):
      console.log("E");
      break;
    case (windBearingNumber <= 129):
      console.log("ESE");
      break;
    case (windBearingNumber <= 140):
      console.log("SE");
      break;
    case (windBearingNumber <= 169):
      console.log("SSE");
      break;
    case (windBearingNumber <= 190):
      console.log("S");
      break;
    case (windBearingNumber <= 219):
      console.log("SSW");
      break;
    case (windBearingNumber <= 230):
      console.log("SW");
      break;
    case (windBearingNumber <= 259):
      console.log("WSW");
      break;
    case (windBearingNumber <= 280):
      console.log("W");
      break;
    case (windBearingNumber <= 309):
      console.log("WNW");
      break;
    case (windBearingNumber <= 320):
      console.log("NW");
      break;
    case (windBearingNumber <= 349):
      console.log("NNW");
      break;
  }
}



