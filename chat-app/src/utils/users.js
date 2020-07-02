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


module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}