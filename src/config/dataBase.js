const mongoose = require('mongoose');
const constants = require('./constant');

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.mongo_url);
} catch (errr) {
  mongoose.createConnection(constants.mongo_url);
}
 
mongoose.connection
  .once('open', () => console.log('Mongo runing'))
  .on('error', err => {
    throw err; 
  });
 
