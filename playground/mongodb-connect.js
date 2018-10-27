const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to Mongo DB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Call Chandni for clothes',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to create user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    client.close();
});