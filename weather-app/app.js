const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const location = process.argv[2]

geocode(location, (err, data) => {
    if (err) {
        return console.log(err)
    }
    forecast(data.lon, data.lat, (err, forecaseData) => {
        if (err) {
            return console.log(err)
        }
        console.log(`It is ${forecaseData.desc} with a tempreature of ${forecaseData.temp} degrees out. There is ${forecaseData.rain}% chance of rain.\n${forecaseData.loc}`)
    })

})