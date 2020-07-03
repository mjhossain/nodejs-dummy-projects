const socket = io()


const msg = document.querySelector('#msg')
const form = document.querySelector('#chat-form')
const locBtn = document.querySelector('#loc')
const msgBox = document.querySelector('#messages')

// Templates
const msgTemplate = document.querySelector('#message-template').innerHTML
const mapTemplate = document.querySelector('#map-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })


const autoscroll = () => {
    // New message element
    const $newMessage = msgBox.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = msgBox.offsetHeight

    // Height of messages container
    const containerHeight = msgBox.scrollHeight

    // How far have I scrolled?
    const scrollOffset = msgBox.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        msgBox.scrollTop = msgBox.scrollHeight
    }
}




form.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = msg.value

    socket.emit('sendMessage', message)
    msg.value = ""

})

socket.on('message', (msg) => {
    console.log(msg)
    const html = Mustache.render(msgTemplate, {
        username: msg.username,
        message: msg.text,
        createdAt: moment(msg.createdAt).format('h:mm a')
    })
    msgBox.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('locationMessage', (loc) => {
    console.log(loc)
    const html = Mustache.render(mapTemplate, {
        username: loc.username,
        url: loc.url,
        createdAt: moment(loc.createdAt).format('h:mm a')
    })
    msgBox.insertAdjacentHTML('beforeend', html)
    autoscroll()
})


socket.on('roomData', ({ room, users }) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
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



socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})