const socket = io()


const msg = document.querySelector('#msg')
const form = document.querySelector('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let message = msg.value

    socket.emit('sendMessage', message)
})

socket.on('message', (msg) => {
    console.log(msg)
})

const locBtn = document.querySelector('#loc').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Sorry geolocation not available!')
    }

    navigator.geolocation.getCurrentPosition((pos) => {
        socket.emit('sendLocation', {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        })
    })
})