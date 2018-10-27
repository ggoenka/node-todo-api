const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to Mongo DB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').find({
        _id: new ObjectID('5bcaef26e40ae812a4c26a09')
    }).toArray().then((docs) => {
        console.log('Unfinished Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch docs', err);
    });

    db.collection('Users').find({
        name: 'Gaurav Goenka'
    }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    db.collection('Users').deleteOne({
        name: 'Gaurav Goenka'
    }).then((doc) => {
        console.log('deleted user');
    }, (err) => {
        console.log('Unable to delete user', err);
    })

    client.close();
});