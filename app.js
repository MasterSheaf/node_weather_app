// const request = require('request');



const geocode = require('./geocode');
const weather = require('./weather');

var myArgs = process.argv.slice(2);

if (process.argv.length < 3) {
    console.log("node app.js location");
    process.exit();
}

// geocode an address
geocode(process.argv[2], (error, geoData) => {
    if (error) {
        console.log("Geolocation Query Error ", error);
    } else {

        //console.log(`${geoData.location}`);
        //console.log(`lat: ${geoData.latitude}`);
        //console.log(`lon: ${geoData.longitude}`);

        // now we can get the weather
        weather(geoData.latitude, geoData.longitude, (error, weatherData) => {
        
            if (error) {

                console.log("Weather Query Error ", error);

            } else {

                console.log(`In ${geoData.location} it is ${weatherData.temperature} deg and ${weatherData.description}`);

            }
        
        });

    }
});
