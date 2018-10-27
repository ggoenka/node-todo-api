const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to Mongo DB server');
    }
    console.log('Connected to MongoDB server');

    const db = client.db('TodoApp');

    db.collection('Users').deleteOne({
        name: 'Chandni Sawlani'
    }).then((doc) => {
        console.log('deleted user');
    }, (err) => {
        console.log('Unable to delete user', err);
    });

    db.collection('Todos').findOneAndDelete({
        text: 'Call Chandni for suits'
    }).then((deletedToDo) => {
        console.log(JSON.stringify(deletedToDo, undefined, 2));
    }, (err) => {
        console.log('Unable to delete todo');
    });

    client.close();
});