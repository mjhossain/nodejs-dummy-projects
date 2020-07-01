const socket = io()


const msg = document.querySelector('#msg')
const form = document.querySelector('#chat-form')
const locBtn = document.querySelector('#loc')
const msgBox = document.querySelector('#messages')

// Templates
const msgTemplate = document.querySelector('#message-template').innerHTML
const mapTemplate = document.querySelector('#map-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = msg.value

    socket.emit('sendMessage', message)
    msg.value = ""

})

socket.on('message', (msg) => {
    console.log(msg)
    const html = Mustache.render(msgTemplate, {
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a')
    })
    msgBox.insertAdjacentHTML('beforeend', html)
})


socket.on('locationMessage', (loc) => {
    console.log(loc)
    const html = Mustache.render(mapTemplate, {
        url: loc.url,
        createdAt: moment(loc.createdAt).format('h:mm a')
    })
    msgBox.insertAdjacentHTML('beforeend', html)
})


locBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Sorry geolocation not available!')
    }
    locBtn.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((pos) => {
        socket.emit('sendLocation', {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
        }, () => {
            console.log('Location Shared!')
            locBtn.removeAttribute('disabled')
        })
    })
})



socket.emit('join', { username, room })