const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Connection error!')
    }

    const db = client.db(dbName)

    // Get Single Task
    db.collection('tasks').findOne({ _id: new ObjectID("5ee969c84834b12c3eba3dfb") }, (err, task) => {
        if (err) {
            return console.log('Error!')
        }
        console.log(task)
    })

    db.collection('tasks').find({ completed: false }).toArray((err, task) => {
        if (err) {
            return console.log('Error!')
        }
        console.log(task)
    })

})