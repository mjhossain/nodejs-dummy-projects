const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Connection error!')
    }

    const db = client.db(dbName)

    db.collection('tasks').deleteOne({
        description: "Read a book"
    }).then((res) => {
        console.log(res.deletedCount)
    }).catch(err => console.log(err))

})