var mongoose = require('mongoose');

// use the native Promise
// this eliminates the deprecationWarning by mongoose of using the default
// promise; mpromise;
mongoose.Promise = global.Promise;

// connect to the database
mongoose.connect('mongodb://test:test1234@ds151544.mlab.com:51544/mytodo', {useMongoClient: true}, function(err) {
  if (err) throw err;
  console.log('connected to database successfully!');
});

// export the mongoose object
module.exports = mongoose;
