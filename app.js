var fs = require('fs'),
  path = require('path'),
  url = require('url'),
  express = require('express'),
  _ = require('underscore');


var app = express();
app.set('view engine', 'jade');
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey!' });
});

var port = 5000;
app.listen(port);
console.log('App listening on port ' + port) + '.';
