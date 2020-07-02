const users = []

const addUser = ({ id, username, room }) => {

    // Trim data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate Data
    if (!username || !room) {
        return {
            error: 'Username & room are required!'
        }
    }

    // if user exist
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // validate user
    if (existingUser) {
        return {
            error: 'Username already in use'
        }
    }

    // Save user
    const user = { id, username, room }
    users.push(user)
    return { user }
}


const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}


addUser({
    id: 1,
    username: 'mike',
    room: 'east'
})

addUser({
    id: 2,
    username: 'john',
    room: 'east'
})

addUser({
    id: 3,
    username: 'john',
    room: 'west'
})

// const user = getUser(3)
// console.log(user)

const east = getUsersInRoom('east')
console.log(east)