var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var helmet = require('helmet')
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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




var bodyParser = require('body-parser');
// var express = require('express');
var plaid = require('plaid');

// We store the access_token in memory - in production, store it in 
// a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;

var client = new plaid.Client(
  '5c4f83d1ca63910011f18edb',
  '575f24b01bf3d0723f783f3d7be994',
  '643da13c8f8bdb1c24f57ac1d23702',
  plaid.environments.sandbox
);

// Accept the public_token sent from Link
// var app = express();
app.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, 
tokenResponse) {
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + 
error);
      return response.json({error: msg});
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log('Access Token: ' + ACCESS_TOKEN);
    console.log('Item ID: ' + ITEM_ID);
    response.json({'error': false});
  });
});

module.exports = app;
