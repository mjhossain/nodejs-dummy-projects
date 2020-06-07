const apiKey = require('../api-key')
const request = require('postman-request')

const geocode = (addr, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=${apiKey.addrAPI}&limit=1`;
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Could not connect to location services!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Could not find location, try another!', undefined)
        } else {
            callback(undefined, {
                lon: res.body.features[0].center[0],
                lat: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;