const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/TodoAppMongoose', { useNewUrlParser: true });

module.exports.mongoose = mongoose;