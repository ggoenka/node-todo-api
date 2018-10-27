const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {UserModel} = require('./../server/models/User');

const id = '5bcc7b239b7ae454f05dffae';

if (!ObjectID.isValid(id)) {
    console.log(`Invalid user input for user id: ${id}`);
    return;
}

UserModel.findById(id).then((todo) => {
    console.log('Todo', todo);
}).catch((e) => console.log(e));