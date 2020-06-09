const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const location = process.argv[2]

if (location != undefined) {
    geocode(location, (err, { lon, lat } = {}) => {
        if (err) {
            return console.log(err)
        }
        forecast(lon, lat, (err, { desc, temp, rain, loc } = {}) => {
            if (err) {
                return console.log(err)
            }
            console.log(`It is ${desc} with a tempreature of ${temp} degrees out. There is ${rain}% chance of rain.\n${loc}`)
        })

    })
} else {
    console.log('\nUsage:\n\nnode app Miami \t\tOR\tnode app "89 E 42nd St, New York"\n')
}