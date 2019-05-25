function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let userLat = position.coords.latitude.toFixed(4);
      let userLong = position.coords.longitude.toFixed(4);
      fetchMapApi(userLat, userLong);
      fetchApi(userLat, userLong);
    })
  } else {
    console.log('Geolocation not supported by this browser.');
  }
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
}

function fillPage(darkSkyData) {

  // Fill constiables with nodes from DOM
  const currentTemp = document.getElementById('current-temp');
  const feelsLike = document.getElementById('feels-like-data');
  const windSpeed = document.getElementById('wind-speed-data');
  const uvIndex = document.getElementById('uv-index-data');
  const humidity = document.getElementById('humidity-data');
  const dewPoint = document.getElementById('dew-point-data');
  const pressure = document.getElementById('pressure-data');

  const todayHigh = document.getElementById('today-high-data');
  const todayLow = document.getElementById('today-low-data');
  const todaySummary = document.getElementById('today-summary');

  const hour0TempIcon = document.getElementById('hour0-container');
  const hour1TempIcon = document.getElementById('hour1-container');
  const hour2TempIcon = document.getElementById('hour2-container');
  const hour3TempIcon = document.getElementById('hour3-container');
  const hour4TempIcon = document.getElementById('hour4-container');
  const hour5TempIcon = document.getElementById('hour5-container');

  const hour0Temp = document.getElementById('hour0-temp');
  const hour1Temp = document.getElementById('hour1-temp');
  const hour2Temp = document.getElementById('hour2-temp');
  const hour3Temp = document.getElementById('hour3-temp');
  const hour4Temp = document.getElementById('hour4-temp');
  const hour5Temp = document.getElementById('hour5-temp');

  const hour0Icon = document.getElementById('hour0-icon');
  const hour1Icon = document.getElementById('hour1-icon');
  const hour2Icon = document.getElementById('hour2-icon');
  const hour3Icon = document.getElementById('hour3-icon');
  const hour4Icon = document.getElementById('hour4-icon');
  const hour5Icon = document.getElementById('hour5-icon');

  const hour0Time = document.getElementById('hour0-time');
  const hour1Time = document.getElementById('hour1-time');
  const hour2Time = document.getElementById('hour2-time');
  const hour3Time = document.getElementById('hour3-time');
  const hour4Time = document.getElementById('hour4-time');
  const hour5Time = document.getElementById('hour5-time');

  var day0Name = document.getElementById('day0-name');
  var day1Name = document.getElementById('day1-name');
  var day2Name = document.getElementById('day2-name');
  var day3Name = document.getElementById('day3-name');
  var day4Name = document.getElementById('day4-name');

  var day0High = document.getElementById('day0-high');
  var day1High = document.getElementById('day1-high');
  var day2High = document.getElementById('day2-high');
  var day3High = document.getElementById('day3-high');
  var day4High = document.getElementById('day4-high');

  var day0Low = document.getElementById('day0-low');
  var day1Low = document.getElementById('day1-low');
  var day2Low = document.getElementById('day2-low');
  var day3Low = document.getElementById('day3-low');
  var day4Low = document.getElementById('day4-low');

  var day0Icon = document.getElementById('day0-icon');
  var day1Icon = document.getElementById('day1-icon');
  var day2Icon = document.getElementById('day2-icon');
  var day3Icon = document.getElementById('day3-icon');
  var day4Icon = document.getElementById('day4-icon');
  
  

  // Fill data to DOM nodes
  currentTemp.textContent = Math.round(darkSkyData.currently.temperature);
  feelsLike.textContent = Math.round(darkSkyData.currently.apparentTemperature);
  windSpeed.textContent = Math.round(darkSkyData.currently.windSpeed);
  uvIndex.textContent = darkSkyData.currently.uvIndex;
  humidity.textContent = darkSkyData.currently.humidity * 100 + '%';
  dewPoint.textContent = Math.round(darkSkyData.currently.dewPoint);
  pressure.textContent = Math.round(darkSkyData.currently.pressure);

  todayHigh.textContent = Math.round(darkSkyData.daily.data['0'].temperatureHigh);
  todayLow.textContent = Math.round(darkSkyData.daily.data['0'].temperatureLow);
  todaySummary.textContent = darkSkyData.daily.data['0'].summary;

  //////////// NEXT 6 HOURS TEMPS //////////////////
  // Create empty array to hold next 6 hours of temps
  var hours = [];
  var hourIcon = [];
  var hourTimes = [];

  // Loop through array adding temps for each hour
  for (var i = 0; i < 6; i++) {
    // Rounds down to nearest degree, will always be up to date from API
    hours[i] = Math.round(darkSkyData.hourly.data[i].temperature);
    hourIcon[i] = darkSkyData.hourly.data[i].icon;
    hourTimes[i] = new Date(darkSkyData.hourly.data[i].time * 1000).toLocaleString("en-US", {timeZone: darkSkyData.timezone, hour: 'numeric'});
  }

  // Fills list items in HMTL with corresponding temps from array
  hour0TempIcon.style.height = hours[0] * 5 + 'px';
  hour1TempIcon.style.height = hours[1] * 5 + 'px';
  hour2TempIcon.style.height = hours[2] * 5 + 'px';
  hour3TempIcon.style.height = hours[3] * 5 + 'px';
  hour4TempIcon.style.height = hours[4] * 5 + 'px';
  hour5TempIcon.style.height = hours[5] * 5 + 'px';

  hour0Temp.innerHTML = hours[0];
  hour1Temp.innerHTML = hours[1];
  hour2Temp.innerHTML = hours[2];
  hour3Temp.innerHTML = hours[3];
  hour4Temp.innerHTML = hours[4];
  hour5Temp.innerHTML = hours[5];

  // Sets src for hourly images
  
  hour0Icon.src = 'climacons/' + hourIcon[0] + '.svg';
  hour1Icon.src = 'climacons/' + hourIcon[1] + '.svg';
  hour2Icon.src = 'climacons/' + hourIcon[2] + '.svg';
  hour3Icon.src = 'climacons/' + hourIcon[3] + '.svg';
  hour4Icon.src = 'climacons/' + hourIcon[4] + '.svg';
  hour5Icon.src = 'climacons/' + hourIcon[5] + '.svg';
  
  hour0Time.innerHTML = (hourTimes[0].replace(' AM', 'am').replace(' PM', 'pm'));
  hour1Time.innerHTML = (hourTimes[1].replace(' AM', 'am').replace(' PM', 'pm'));
  hour2Time.innerHTML = (hourTimes[2].replace(' AM', 'am').replace(' PM', 'pm'));
  hour3Time.innerHTML = (hourTimes[3].replace(' AM', 'am').replace(' PM', 'pm'));
  hour4Time.innerHTML = (hourTimes[4].replace(' AM', 'am').replace(' PM', 'pm'));
  hour5Time.innerHTML = (hourTimes[5].replace(' AM', 'am').replace(' PM', 'pm'));
  /////////////////////////////////////////////

  //////////// 5 DAY OUTLOOK //////////////////
  // Create empty array to hold next 6 hours of temps
  var highs = [];
  var lows = [];
  var dayNumbers = [];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var dayNames = [];
  var dayIcons = [];
  
  // Loop through array adding temps for each hour
  for (var i = 0; i < 5; i++) {
    // Rounds down to nearest degree, will always be up to date from API
    highs[i] = Math.round(darkSkyData.daily.data[i].temperatureHigh);
    lows[i] = Math.round(darkSkyData.daily.data[i].temperatureLow);
    dayNumbers[i] = new Date(darkSkyData.daily.data[i].time * 1000).getDay();
    dayIcons[i] = darkSkyData.daily.data[i].icon;
  }    
  
  for (var i = 0; i < dayNumbers.length; i++) {
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
