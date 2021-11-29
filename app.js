// const request = require('request');



const geocode = require('./geocode');
const weather = require('./weather');

var myArgs = process.argv.slice(2);

if (process.argv.length < 3) {
    console.log("node app.js location");
    process.exit();
}

// geocode an address
// Note that when destructuring we need to provide a default parameter for the
// second parameter of an empty object if error is defined in our callback
// code we usually set the second parameter to undefined which causes the 
// destructuring to fail, so we add the default
geocode(process.argv[2], (error, {latitude, longitude, location} = {}) => {
    if (error) {
        console.log("Geolocation Query Error ", error);
    } else {

        //console.log(`${geoData.location}`);
        //console.log(`lat: ${geoData.latitude}`);
        //console.log(`lon: ${geoData.longitude}`);

        // now we can get the weather
        weather(latitude, longitude, (error, {temperature, description} = {}) => {
        
            if (error) {

                console.log("Weather Query Error ", error);

            } else {

                console.log(`In ${location} it is ${temperature} deg and ${description}`);

            }
        });

    }
});
