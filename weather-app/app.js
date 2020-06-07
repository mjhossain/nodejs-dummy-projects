const apiKey = require('./api-key')
const request = require('postman-request')

const weatherUrl = `http://api.weatherstack.com/current?access_key=${apiKey.weatherAPI}&query=New%20York`;


// request({ url: weatherUrl, json: true }, (error, response, body) => {
//     if (error) {
//         console.log('Unable to connect to weather service!')
//     } else if (body.error) {
//         console.log('Unable to find location!')
//     } else {
//         const curWeather = body.current;
//         console.log(`It's currently ${curWeather.temperature} degrees out with ${curWeather.precip * 100}% chance of rain.`);
//     }

// })


// Geo Location Request

const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${apiKey.addrAPI}&limit=1`;

request({ url: geoUrl, json: true }, (error, response, body) => {
    if (response.statusCode == 200) {
        const latitude = body.features[0].center[1]
        const longitude = body.features[0].center[0]
        console.log(`Longitude: ${longitude}\nLatitude: ${latitude}`)
    } else if (error) {
        console.log('Unable to connect to map service!')
    } else {
        console.log('Unable to fetch address!')
    }
})