const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {TodoModel} = require('./models/Todo');
const {UserModel} = require('./models/User');

TodoModel.remove({}).then((result) => {
    console.log(result);
});