const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = express.Router()

// Creating a User
router.post('/users', async(req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Getting all Users
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)
})

// Get a user by ID
// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send(e)
//     }
// })

// Update User 
router.patch('/users/me', auth, async(req, res) => {

    // Check is right updates are given
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isAllowed = updates.every(update => allowedUpdates.includes(update))

    if (!isAllowed) {
        return res.status(400).send('Invalid Request')
    }

    // Updates if right set of fileds given
    try {
        // Perform updates
        updates.forEach((update) => {
                req.user[update] = req.body[update]
            })
            // Saving user
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
    }
})


// Delete User
router.delete('/users/me', auth, async(req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


// User login
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// User logout
router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send('Logout Success!')
    } catch (e) {
        res.status(500).send()
    }
})


// Logout All Sessions
router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send('Logout All Session Success!')
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router