const apiKey = require('../api-key')
const request = require('postman-request')

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey.weatherAPI}&query=${lat},${lon}&units=f`;
    request({ url: url, json: true }, (err, res) => {
        if (err) {
            callback('Unable to connect to weather services!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location, try another!', undefined)
        } else {
            callback(undefined, {
                temp: res.body.current.temperature,
                desc: res.body.current.weather_descriptions[0],
                feels: res.body.current.feelslike,
                rain: res.body.current.precip * 100,
                loc: `${res.body.location.name}, ${res.body.location.region}, ${res.body.location.country}`
            })
        }
    })
}

module.exports = forecast