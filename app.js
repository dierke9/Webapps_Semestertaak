var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let env = require('env2')('.env');
require('./forumBackend/models/User');
require('./forumBackend/models/Article');
require('./forumBackend/models/Post');
require('./forumBackend/models/Thread');
require('./forumBackend/models/SubCategory');
require('./forumBackend/models/Category');
require('./forumBackend/config/passport');
//mongodb://<dbuser>:<dbpassword>@ds127126.mlab.com:27126/forumdb
mongoose.connect(process.env.DATABASE, {  useMongoClient: true });

var index = require('./forumBackend/routes/index');
var users = require('./forumBackend/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'forumBackend/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', index);
app.use('/API/users', users);
console.log(path.join(__dirname, 'dist'))
app.use(express.static(path.join(__dirname, 'dist')));

app.all('*',(req,res) => {
    const indexFile = `${path.join(__dirname, 'dist')}/index.html`;
    res.status(200).sendFile(indexFile);
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
