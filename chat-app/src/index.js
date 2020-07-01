const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../public/views/')
const publicDir = path.join(__dirname, '../public/')

app.use(express.static(publicDir))


io.on('connection', (socket) => {
    console.log('New connection added!')

    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user has joined!')

    socket.on('sendMessage', (msg) => {
        io.emit('message', msg)
    })

    socket.on('sendLocation', ({ lat, lon }) => {
        socket.broadcast.emit('message', `https://google.com/maps?q${lat},${lon}`)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })


})


server.listen(port, () => {
    console.log('App running on port 3000')
})