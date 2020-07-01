const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const { generateMessage, generateLocationMessage } = require('./utils/messages')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../public/views/')
const publicDir = path.join(__dirname, '../public/')

app.use(express.static(publicDir))


io.on('connection', (socket) => {


    console.log('New connection added!')


    socket.on('join', ({ username, room }) => {
        socket.join(room)
        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))
    })



    socket.on('sendMessage', (msg) => {
        io.emit('message', generateMessage(msg))
    })

    socket.on('sendLocation', ({ lat, lon }, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q${lat},${lon}`))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })


})


server.listen(port, () => {
    console.log('App running on port 3000')
})