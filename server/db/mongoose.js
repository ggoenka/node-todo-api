const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://ggoenka:dbuser1@ds217092.mlab.com:17092/todoappmongoose', { useNewUrlParser: true });

module.exports.mongoose = mongoose;