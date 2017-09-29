var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://test:test1234@ds151544.mlab.com:51544/mytodo');

// create a schema - a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

// create a model that uses the above Schema.
// Todo : The collection
var Todo = mongoose.model('Todo', todoSchema);

var Item1 = Todo({item: 'buy flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});

// dummy data
var data = [{item: 'get milk'},{item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {


app.get('/todo', function(req, res) {
  res.render('todo', {todos:data});
});

// body parser will parse the post values in the body and
// extend the request object.
app.post('/todo', urlencodedParser, function(req, res) {

  // add data to the array
  data.push(req.body);
  res.json(data); // return the new json object to the client/front-end.
              // the ajax will reload the page (ejs) with the new json data.
});

// :item acts as place holder for http query paramaters
// stored in req.params.item
app.delete('/todo/:item', function(req, res) {
  // filter keeps the item if true otherwise it's removed
  data = data.filter(function(todo) {
    return todo.item.replace(/ /g, '-') !== req.params.item;
  });
  res.json(data);
});


}
