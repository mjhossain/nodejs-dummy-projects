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

let count = 0

io.on('connection', (socket) => {
    console.log('New connection added!')

    socket.emit('count', count)

    socket.on('increment', () => {
        count++
        io.emit('count', count)
    })
})


server.listen(port, () => {
    console.log('App running on port 3000')
})