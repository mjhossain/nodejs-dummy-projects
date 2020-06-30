const express = require('express')
const cors = require('cors')

// Connecting to MongoDB
require('./db/mongoose')

// Importing Routers
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const { urlencoded } = require('express')

// Creating Express Server
const app = express()

// React setup
// app.use(cors({
//     origin: 'http://localhost:3000'
// }))

// Using express parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Setting up Routers
app.use(userRouter)
app.use(taskRouter)


module.exports = app