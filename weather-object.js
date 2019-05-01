addEventListener('load', init());

function init() {


  var mapRequest = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  // uses lat and long variables from above
  mapRequest.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/seattle.json?access_token=pk.eyJ1IjoiYnJhZHl2b3NzbGVyIiwiYSI6ImNqdjRncnFxeTA1ZzIzeW8ydW5tcWd5eTkifQ.PxozC03Ll04Dd-17nZwJ_g');
  
  mapRequest.onload = function () {
    // Begin accessing JSON data here
  var mapObject = JSON.parse(this.response);
  
  
  var lat = mapObject.features['0'].center['1'];
  var long = mapObject.features['0'].center['0'];
  
        // Create a request variable and assign a new XMLHttpRequest object to it.
      var request = new XMLHttpRequest();
  
      // Open a new connection, using the GET request on the URL endpoint
      // uses lat and long variables from above
      request.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/4100d18e844539e13bb8bb6570b7629f/' + lat + ',' + long, true);
  
      request.onload = function () {
        // Begin accessing JSON data here
      var data = JSON.parse(this.response);
  
  
  
    // Logs 'data' variable to console (this is the objects from DarkSky API)
      console.log(data);
    
  
   
  
    // Variables to hold nodes from DOM
    var userLocation = document.querySelector('#user-location');
  
    var currentTemperature = document.querySelector('#currentTemp');
    var feelsLike = document.querySelector('#feelsLike');
    var currentIcon = document.querySelector('#right-now-climacon-svg');
  
  
    var windSpeed = document.querySelector('#windSpeed');
    var UVindex = document.querySelector('#UVindex');
    var humidity = document.querySelector('#humidity');
    var dewPoint = document.querySelector('#dewPoint');
    var pressure = document.querySelector('#pressure');
    var highToday = document.querySelector('#todayHigh');
    var lowToday = document.querySelector('#todayLow');
    var todaySummary = document.querySelector('#todaySummary');
  
  
    var hour0Temp = document.querySelector('#hour0-temp');
    var hour1Temp = document.querySelector('#hour1-temp');
    var hour2Temp = document.querySelector('#hour2-temp');
    var hour3Temp = document.querySelector('#hour3-temp');
    var hour4Temp = document.querySelector('#hour4-temp');
    var hour5Temp = document.querySelector('#hour5-temp');
  
    var hour0Icon = document.querySelector('#hour0-icon');
    var hour1Icon = document.querySelector('#hour1-icon');
    var hour2Icon = document.querySelector('#hour2-icon');
    var hour3Icon = document.querySelector('#hour3-icon');
    var hour4Icon = document.querySelector('#hour4-icon');
    var hour5Icon = document.querySelector('#hour5-icon');
  
    var hour0Time = document.querySelector('#hour0-time');
    var hour1Time = document.querySelector('#hour1-time');
    var hour2Time = document.querySelector('#hour2-time');
    var hour3Time = document.querySelector('#hour3-time');
    var hour4Time = document.querySelector('#hour4-time');
    var hour5Time = document.querySelector('#hour5-time');
  
  
    var day0Name = document.querySelector('#day0-name');
    var day1Name = document.querySelector('#day1-name');
    var day2Name = document.querySelector('#day2-name');
    var day3Name = document.querySelector('#day3-name');
    var day4Name = document.querySelector('#day4-name');
  
    var day0High = document.querySelector('#day0-high');
    var day1High = document.querySelector('#day1-high');
    var day2High = document.querySelector('#day2-high');
    var day3High = document.querySelector('#day3-high');
    var day4High = document.querySelector('#day4-high');
  
    var day0Low = document.querySelector('#day0-low');
    var day1Low = document.querySelector('#day1-low');
    var day2Low = document.querySelector('#day2-low');
    var day3Low = document.querySelector('#day3-low');
    var day4Low = document.querySelector('#day4-low');
  
    var day0Icon = document.querySelector('#day0-icon');
    var day1Icon = document.querySelector('#day1-icon');
    var day2Icon = document.querySelector('#day2-icon');
    var day3Icon = document.querySelector('#day3-icon');
    var day4Icon = document.querySelector('#day4-icon');
  
  
  
  
    // Set values to elements on page
    userLocation.innerHTML = lat + ', ' + long;
  
    currentIcon.src = "climacons/" + data.currently.icon + ".svg"
    currentTemperature.innerHTML = Math.floor(data.currently.temperature) + '&deg;';
    feelsLike.innerHTML = 'Feels like: ' + Math.floor(data.currently.apparentTemperature) + '&deg;';
    windSpeed.innerHTML = 'Wind: ' + Math.floor(data.currently.windSpeed) + 'mph';
  
    UVindex.innerHTML = 'UV Index: ' + data.currently.uvIndex;
    humidity.innerHTML = 'Humidity: ' + data.currently.humidity * 100 + '&percnt;';
    dewPoint.innerHTML = 'Dew Point: ' + Math.floor(data.currently.dewPoint) + '&deg;';
    pressure.innerHTML = 'Pressure: ' + Math.floor(data.currently.pressure) + ' mb';
  
  
    highToday.innerHTML = 'High: ' + Math.floor(data.daily.data["0"].temperatureHigh) + '&deg;';
    lowToday.innerHTML = 'Low: ' + Math.floor(data.daily.data["0"].temperatureLow) + '&deg;';
    todaySummary.innerHTML = data.daily.data["0"].summary;
  
    
  
    //////////// NEXT 6 HOURS TEMPS //////////////////
    // Create empty array to hold next 6 hours of temps
    var hours = [];
    var hourIcon = [];
    var hourTimes = [];
  
    
    // Loop through array adding temps for each hour
    for (var i = 0; i < 6; i++) {
      // Rounds down to nearest degree, will always be up to date from API
      hours[i] = Math.floor(data.hourly.data[i].temperature);
      hourIcon[i] = data.hourly.data[i].icon;
      hourTimes[i] = new Date(data.hourly.data[i].time * 1000).toLocaleString("en-US", {timeZone: data.timezone, hour: 'numeric'});
      
    }
  
  
    // Fills list items in HMTL with corresponding temps from array
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
  
    hour0Time.innerHTML = hourTimes[0];
    hour1Time.innerHTML = hourTimes[1];
    hour2Time.innerHTML = hourTimes[2];
    hour3Time.innerHTML = hourTimes[3];
    hour4Time.innerHTML = hourTimes[4];
    hour5Time.innerHTML = hourTimes[5];
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
      highs[i] = Math.floor(data.daily.data[i].temperatureHigh);
      lows[i] = Math.floor(data.daily.data[i].temperatureLow);
      dayNumbers[i] = new Date(data.daily.data[i].time * 1000).getDay();
      dayIcons[i] = data.daily.data[i].icon;
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
    request.send();

  
  // Logs 'data' variable to console (this is the objects from DarkSky API)
  console.log(mapObject);
  }
  
  mapRequest.send();




}