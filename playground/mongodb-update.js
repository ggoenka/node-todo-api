const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to Mongo DB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate({
        text: 'Call Chandni for clothes'
    }, {
        $set: {
            completed: false
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to delete todo');
    });

    db.collection('Users').findOneAndUpdate({
        name: 'Chandni Sawlani'
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Unable to delete todo');
    });

    client.close();
});