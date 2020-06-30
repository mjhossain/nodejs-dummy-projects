const request = require('supertest')
const app = require('../src/app')
const { userOneID, userOne, initiateDB } = require('./db')
const User = require('../src/models/user')

beforeEach(initiateDB)


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

test('Delete user account SHOULD FAIL!', async() => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Image upload test', async() => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('User update test', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Ross'
        })
        .expect(200)
})

test('User update test SHOULD FAIL!', async() => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            address: 'Central Perk'
        })
        .expect(400)
})