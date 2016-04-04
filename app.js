var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect MongoDB
mongoose.connect('mongodb://localhost/portifolio', function(err, db) {

    if (!err) {
        console.log('Connected to /portifolio!');
    } else {
        console.dir(err);
    }

});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));

//routes
var routes = require('./routes/index');
var mapApi = require('./routes/mapApi');

app.use('/', routes);
app.use('/map', mapApi);

// V.E. setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(path.join(process.cwd(), '/www')));
app.use(express.static(path.join(process.cwd(), '/scripts')));
app.use(express.static(path.join(process.cwd(), '/public')));

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


module.exports = app;
