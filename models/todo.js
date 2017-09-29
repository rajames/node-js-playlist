var database = require('../controllers/databaseController');

// create a schema - a blueprint
var todoSchema = new database.Schema({
  item: String
});

// optionally, we can add custom methods here before
// creating the model.

// create a model that uses the above Schema.
// Todo : The collection
var Todo = database.model('Todo', todoSchema);

// export the Todo Model
module.exports = Todo;
