var express = require('express');
var app = express();

app.set('view engine', 'jade');

app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(require('express-markdown')({

  // directory where markdown files are stored
  // required
  directory: __dirname + '/pages',

  // view to use for rendering markdown file
  // optional
  // default is undefined, no view
  view: 'layout',

  // name of markdown variable passed in the context when rendering
  // optional
  // default 'markdown'
  variable: 'content'

}));

app.listen(5000);

