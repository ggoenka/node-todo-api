const mongoose = require('mongoose');

var UserModel = mongoose.model('User',{
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 9
    }
});

module.exports = {UserModel};