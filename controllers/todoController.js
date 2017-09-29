var bodyParser = require('body-parser');
var Todo = require('../models/todo.js');

// create middleware for parsing the body of http post request using
// body-parser
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
