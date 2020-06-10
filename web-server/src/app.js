const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello express!')
})

app.get('/help', (req, res) => {
    res.send('Help Page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Gloomy',
        location: 'New York'
    })
})

app.listen(3000, () => {
    console.log('Running on port 3000')
})