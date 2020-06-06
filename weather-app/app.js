const apiKey = require('./api-key')
const request = require('postman-request')

const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=New%20York`;

request(url, (error, response, body) => {
    console.log('Status Code: ', response.statusCode)
    const data = JSON.parse(body);
    console.log(data.current)
})