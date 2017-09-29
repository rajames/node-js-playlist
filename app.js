var express = require('express');
var todoController = require('./controllers/todoController');


// fire express
var app = express();

// set up template engine

app.set('view engine', 'ejs');


// set up the static files
//app.use('/assets', express.static('./public');
app.use(express.static('./public')); // all route


// fire controllers
todoController(app);


app.listen(3000);
console.log('You are listening to port 3000');
