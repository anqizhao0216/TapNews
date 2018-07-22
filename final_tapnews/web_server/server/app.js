var cors = require('cors');
var passport = require('passport');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var auth = require('./routes/auth');
var index = require('./routes/index');
var news = require('./routes/news');
var news = require('./routes/user');
var news = require('./routes/click');

var app = express();


var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));
app.use(bodyParser.json());

//load passport strategies
app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

app.use(cors());

// pass the authentication checker middleware
const authCheckMiddleware = require('./middleware/auth_checker');
app.use('/news', authCheckMiddleware);
app.use('/news', news);

app.use('/user', authCheckMiddleware);
app.use('/user', news);
app.use('/click', authCheckMiddleware);
app.use('/click', news);

app.use('/', index);
app.use('/login', index);
app.use('/signup', index);
app.use('/logout', index);
app.use('/topics', index);
app.use('/search', index);
app.use('/auth', auth);
app.use('/news', news);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('404 Not Found');
});

module.exports = app;
