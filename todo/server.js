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

// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");
