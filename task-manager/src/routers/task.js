const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = express.Router()


// Creating a Task
router.post('/tasks', auth, async(req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Get all Tasks
router.get('/tasks', auth, async(req, res) => {

    try {

        await req.user.populate("tasks").execPopulate()
        const tasks = req.user.tasks
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Get Task by ID
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)

        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }

})


// Update Task
router.patch('/tasks/:id', auth, async(req, res) => {
    // Check if correct values are being changed
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))

    if (!isAllowed) {
        return res.status(400).send('Invalid update request')
    }

    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send('Task not found')
        }

        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Delete Task
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router