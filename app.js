var fs = require('fs'),
	path = require('path'),
	url = require('url'),
	express = require('express'),
	_ = require('underscore');
hljs = require('highlight.js');

var md = require('markdown-it')({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(lang, str).value;
			} catch (__) {
			}
		}

		try {
			return hljs.highlightAuto(str).value;
		} catch (__) {
		}

		return ''; // use external default escaping
	}
});

var expressMarkdown = function (options) {
	var dir = path.resolve(options.directory);

	return function (req, res, next) {
		var file = req.url.toString().toLowerCase();

		if (file === '/') {
			file = 'index';
		}

		file = dir + '/' + url.parse(file).pathname;
		file = path.resolve(file) + '.md';

		if (file.substr(0, dir.length) !== dir) {
			return res.send(400);
		}

		fs.exists(file, function (exists) {
			if (!exists)
				return next();

			fs.readFile(file, 'utf8', function (err, data) {
				if (err) {
					return next(err);
				}

				res.render('markdown', {markdown: md.render(data)});
			});
		});
	}
};

var config = fs.existsSync(__dirname + '/config.json') ? require('./config.json') : {};

config = _.extend({
	directory: __dirname + '/samples'
}, config);

var app = express();
app.set('view engine', 'jade');
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(expressMarkdown(config));
var port = config.port || 5000;
app.listen(port);
console.log('App listening on port '+port)+'.';
