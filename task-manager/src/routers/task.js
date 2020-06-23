const express = require('express')
const Task = require('../models/task')

const router = express.Router()


// Creating a Task
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Get all Tasks
router.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Get Task by ID
router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(500).send(e)
    }

})


// Update Task
router.patch('/tasks/:id', async(req, res) => {
    // Check if correct values are being changed
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))

    if (!isAllowed) {
        return res.status(400).send('Invalid update request')
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        const task = await Task.findById(req.params.id)

        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()

        if (!task) {
            return res.status(404).send('Task not found')
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Delete Task
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send('Task not found')
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})



module.exports = router