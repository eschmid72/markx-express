var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    express = require('express'),
    marked = require('marked');

var app = express();

app.set('view engine', 'jade');

app.use('/bower_components', express.static(__dirname + '/bower_components'));

var config = fs.existsSync(__dirname+'/config.json') ? require('./config.json') : {};

marked.setOptions({
    highlight: function (code) {
        return require('highlight.js').highlightAuto(code).value;
    }
});

var expressMarkdown = function (options) {
    if (!options)
        throw new Error("Missing options argument");

    var dir = options.directory,
        view = options.view,
        variable = options.variable || 'markdown';

    if (!dir)
        throw new Error('Missing "directory" value in options');

    // clean up path, remove '..'
    dir = path.resolve(dir);

    return function (req, res, next) {
        var file = req.url.toString().toLowerCase();

        if(file==='/') {
            file='index';
        }

        file = dir + '/' + url.parse(file).pathname;
        file = path.resolve(file) + '.md';

        // make sure the final path is in our defined directory
        if (file.substr(0, dir.length) !== dir)
            return res.send(400);

        fs.exists(file, function (exists) {
            if (!exists)
                return next();

            fs.readFile(file, 'utf8', function (err, data) {
                var context = {};
                if (err)
                    return next(err);

                data = marked(data);

                if (view) {
                    context[variable] = data;
                    res.render(view, context);
                }
                else {
                    res.send(data);
                }
            });
        });
    }
};

app.use(expressMarkdown({
    directory: config.directory || __dirname + '/sampledoc',
    view: 'markdown'
}));

app.listen(config.port || 5000);

