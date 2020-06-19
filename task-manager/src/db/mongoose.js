const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
})


const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Task({
    description: 'Take out the garbage',
    completed: false
})

task.save().then(() => {
    console.log(task)
}).catch((err) => {
    console.log(err)
})


// const user1 = new User({
//     name: 'Zakir',
//     age: 'Something',
//     gender: 'Male'
// })


// user1.save().then(() => {
//     console.log(user1)
// }).catch((err) => {
//     console.log('Error!', err)
// })