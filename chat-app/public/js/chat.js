const socket = io()

socket.on('count', (count) => {
    console.log('Count: ', count)
})

document.querySelector('#increment').addEventListener('click', () => {
    console.log('Click')
    socket.emit('increment')
})