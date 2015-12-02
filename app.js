var express = require('express');
var app = express();

app.set('view engine', 'jade');

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(5000);

