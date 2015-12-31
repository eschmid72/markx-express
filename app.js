var fs = require('fs'),
    path = require('path'),
    url = require('url'),
    express = require('express'),
    hljs = require('highlight.js');

var md = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (__) {}

        return ''; // use external default escaping
    }
});

var app = express();

app.set('view engine', 'jade');

app.use('/bower_components', express.static(__dirname + '/bower_components'));

var config = fs.existsSync(__dirname+'/config.json') ? require('./config.json') : {};

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

                var html = md.render(data);

                if (view) {
                    context[variable] = html;
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

