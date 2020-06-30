const request = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../src/models/user')


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

beforeEach(async() => {
    await User.deleteMany()
    await new User(userOne).save()
})


test('User Creation', async() => {
    await request(app).post('/users').send({
        name: 'Zakir',
        email: 'zakir@testexample.com',
        password: 'SecretKey'
    }).expect(201)
})

test('User login success', async() => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    userDB = await User.findById(userOneID)
    expect(response.body.token).toBe(userDB.tokens[1].token)

})

test('User login SHOULD FAIL!', async() => {
    await request(app).post('/users/login').send({
        email: 'mike@example.com',
        password: 'MikeyBoy!'
    }).expect(400)
})

test('Get user profile', async() => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Get user profile SHOULD FAIL!', async() => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Delete user account', async() => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user).toBeNull()
})

test('Delete user account SHOULD FAIL', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})