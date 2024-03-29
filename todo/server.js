var express  = require('express');
// create our app w/ express
var app      = express();
// mongoose for mongodb
var mongoose = require('mongoose');

// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

app.configure(function() {
  // set the static files location /public/img will be /img for users
  app.use(express.static(__dirname + '/public'));
  // log every request to the console
  app.use(express.logger('dev'));
  // pull information from html in POST
  app.use(express.bodyParser());
  // simulate DELETE and PUT
  app.use(express.methodOverride());
});

// todo model
var Todo = mongoose.model('Todo', {
  text : String
});

// API
// get all todos
app.get('/api/todos', function(req, res) {

  // use mongoose to get all todos in the database
  Todo.find(function(err, todos) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(todos); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

// application
app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
