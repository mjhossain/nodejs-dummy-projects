const express = require('express')
    // Connecting to MongoDB
require('./db/mongoose')

// Importing Models
const User = require('./models/user') /* User Model */
const Task = require('./models/task') /* Task Model */

const app = express()

// Declaring Port
const port = process.env.PORT || 3000

// Using express parser
app.use(express.json())

// Creating a User
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch(err => {
        res.status(400).send(err)
    })
})

// Getting all Users
app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((err) => {
        res.status(500).send()
    })
})

// Get a user by ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }).catch((err) => {
        res.status(500).send()
    })
})


// Creating a Task
app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((err) => {
        res.status(400).send(err)
    })
})


// Get all Tasks
app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.status(200).send(tasks)
    }).catch((err) => {
        res.status(500).send()
    })
})


// Get Task by ID
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }).catch((err) => {
        res.status(500).send()
    })
})



app.listen(port, () => {
    console.log('Server running!')
})