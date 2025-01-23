const request = require('postman-request');

const geocode = (adress, callback) => {
    const address = 'https://geocode.maps.co/search?q='+encodeURIComponent(adress)+'&api_key=67651b5aedc42048156230utk6de2f5'

    request({url: address, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to service', undefined)
        } else  if (body.length == 0) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                displayname: body[0].display_name
            })
        }
    })
}

module.exports = geocode

