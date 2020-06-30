const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

const userOneID = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Chandler',
    email: 'bing@example.com',
    password: 'Monica!',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET)
    }]
}

const userTwoID = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Joey',
    email: 'joey@example.com',
    password: 'HowYouDoin!',
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.JWT_SECRET)
    }]
}


const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task One',
    completed: false,
    owner: userOneID
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Two',
    completed: false,
    owner: userOneID
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Three',
    completed: false,
    owner: userTwoID
}


const initiateDB = async() => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneID,
    userOne,
    initiateDB,
    userTwo,
    taskOne
}