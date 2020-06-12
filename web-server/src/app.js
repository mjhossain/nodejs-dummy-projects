const express = require('express')
const path = require('path');
const hbs = require('hbs');
const app = express()

// Paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handebars & Views setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Express static setup
app.use(express.static(publicPath))



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



// 404 Pages

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Sorry help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Error 404 page not found!'
    })
})


app.listen(3000, () => {
    console.log('Running on port 3000')
})