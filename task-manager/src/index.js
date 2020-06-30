const app = require('./app')

// Declaring Port
const port = process.env.PORT

// Running App
app.listen(port, () => {
    console.log('Server running!')
})