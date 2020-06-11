const express = require('express')
const path = require('path');
const app = express()

const publicDir = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDir))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('/weather', (req, res) => {
    res.render('weather', {
        title: 'Weather'
    })
})

app.listen(3000, () => {
    console.log('Running on port 3000')
})