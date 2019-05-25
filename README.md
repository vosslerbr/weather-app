# weather-app :)

Hey there! This is a simple weather application I'm building with HTML, CSS, and (vanilla) Javascript.

I've added a service worker and manifest to make it available as a PWA for those interested.

When the page loads, the browser prompts the user for location access. Once this is granted, the location object's latitude and longitude are passed to the MapBox API and the DarkSky API 

MapBox is used for a reverse-geocoding call. This returns the user's city name. It then passes this to the HTML file. 

DarkSky takes the user's latitude and longitude and returns the weather object. The data points are used to fill different HTML elements on the page.

This is my first time using async/await functions, but it seemed to work out well!

Future plans include a layout change to make website more responsive, and the addition of a search bar if the user doesn't want to give location access.

