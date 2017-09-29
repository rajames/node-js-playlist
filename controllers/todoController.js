var bodyParser = require('body-parser');
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

// create a schema - a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

// create a model that uses the above Schema.
// Todo : The collection
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {


app.get('/todo', function(req, res) {
  // get data from mongodb and pass it to the view
  // retrieve all the items on this connection
  Todo.find({}, function(err, data) {
    if (err) throw err;
    res.render('todo', {todos:data});
  });
});

// body parser will parse the post values in the body and
// extend the request object.
app.post('/todo', urlencodedParser, function(req, res) {
  // get data from view and add it to mongoDB
  var newItem = Todo(req.body).save(function(err,data) {
    if (err) throw err;
    res.json(data); // return the new json object to the client/front-end.
                    // the ajax will reload the page (ejs) with the new json data.
  });
});

// :item acts as place holder for http query paramaters
// stored in req.params.item
app.delete('/todo/:item', function(req, res) {
  // delete the requested item from mongoDB

  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err,data) {
    if (err) throw err;
    res.json(data);
  });
});


}
