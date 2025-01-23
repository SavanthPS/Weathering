const request = require('postman-request');

const forecast = (lat, lon, callback) => {
    // const newurl= 'https://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + '&key=16d7e10af38b4e2c8e9a206efe8a47f8'
    // const newurl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=67651b5aedc42048156230utk6de2f5`;

    const newurl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=WS29QGLUKKNFMTZL6RDM7TXUE`;

    request({url: newurl, json: true}, (error, {body}) => {
        // console.log(body);
        if(error) {
            callback('Unable to connect with service', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {
            // callback(undefined, 'The current Temperature is : ' + body.data[0].temp)
            // callback(undefined, 'The current place is : ' + body.display_name);

            callback(undefined, 'And the current temperature feels like : ' + ((body.days[0].feelslike - 32) * 5 / 9).toFixed(1) + '°C');
        }
    })

}
 

module.exports = forecast