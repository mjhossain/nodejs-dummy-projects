const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Connection error!')
    }

    const db = client.db(dbName)

    db.collection('users').insertOne({
        name: 'Mohammed',
        age: 23
    })
})