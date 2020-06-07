const apiKey = require('./api-key')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



geocode('18527 henderson ave', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        forecast(data.lon, data.lat, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data)
            }
        })
    }
})