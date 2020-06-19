const mongoose = require('mongoose')
const validator = require('validator')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email!')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        default: 'Unassigned'
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

// const task = new Task({
//     description: 'Take out the garbage',
//     completed: false
// })

// task.save().then(() => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err)
// })


const user1 = new User({
    name: 'Zakir    ',
    email: '       moham@gmail.com   ',
    age: 23,
    gender: 'Male'
})


user1.save().then(() => {
    console.log(user1)
}).catch((err) => {
    console.log('Error!', err)
})