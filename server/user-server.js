const {mongoose} = require('./db/mongoose');

var newUser = new UserModel({
    email: 'gauravgoenka@yahoo.com'
});

newUser.save().then((userCreated) => {
    console.log('User saved', userCreated);
}, (e) => {
    console.log(e);
});

mongoose.disconnect();