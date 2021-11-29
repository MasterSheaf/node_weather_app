const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=6ebcb1a94a8e01ad5aed80366d95ce80&query=43065&units=f';


// request({url: url, json: true}, function (error, response, data) {

//     if (error !== null) {
//         console.error("error:", error); // Print the error if one occurred
//         return;
//     }

//     console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received

//     console.log("body:", data);
//     console.log("Temp = " + data.current.temperature + " deg F");
// });



const weather = (lat, lon, callback) => {

    var url = 'http://api.weatherstack.com/current?access_key=6ebcb1a94a8e01ad5aed80366d95ce80';
    url += `&query=${lat},${lon}`;
    url += '&units=f';

    //console.log("URL = " + url);

    //var url = 'http://api.weatherstack.com/current?access_key=6ebcb1a94a8e01ad5aed80366d95ce80&query=40.7831,-73.9712&units=f'

    request({ url, json: true }, (error, {body} = {}) => {

        //console.log("Error: ", error);

        //console.log(body);
        
        if (error) {

            callback('Unable to connect to weather service', undefined)

        } else if (body.success === false) {
            
            //console.log("Error Reported from API:");
            //console.log(body.error);
            callback("Error reported from API: " + body.error.code + ". " + body.error.info, undefined);
        
        } else {

            if (body.current.weather_descriptions.length <=0) {
                callback(undefined, {
                    temperature: body.current.temperature,
                    description: 'No Decsription Provided'
                })
            }
            else {
                callback(undefined, {
                    temperature: body.current.temperature,
                    description: body.current.weather_descriptions[0]
                })
            }
        }
    })
}

module.exports = weather