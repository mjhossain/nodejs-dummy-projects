const express = require('express')

// Connecting to MongoDB
require('./db/mongoose')

// Importing Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Creating Express Server
const app = express()

// Declaring Port
const port = process.env.PORT || 3000

// Using express parser
app.use(express.json())

// Setting up Routers
app.use(userRouter)
app.use(taskRouter)


// Running App
app.listen(port, () => {
    console.log('Server running!')
})