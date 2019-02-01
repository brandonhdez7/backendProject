var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const bcrypt = require('bcrypt-nodejs');
const expressSession = require('express-session');
const helmet = require('helmet');
const config = require('./config');

app.use(helmet());
const sessionOptions = ({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
})
app.use(expressSession(sessionOptions));

// Set up MySQL Connection
const mysql = require('mysql');
let connection = mysql.createConnection(config.db);
// we have a connection, lets connect
connection.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Define some middleware, if the user is logged in, 
// then send the user data over to the view

app.use('*',(req, res, next)=>{
  console.log("Middleware is working! from app.js");
  if(req.session.loggedIn){
      // res.locals is the variable that gets sent to the view
      res.locals.name = req.session.name;
      res.locals.id = req.session.id;
      res.locals.email = req.session.email;
      res.locals.loggedIn = true;
  }else{
      res.locals.name = "";
      res.locals.id = "";
      res.locals.email = "";
      res.locals.loggedIn = false;
  }
  next();
})

app.get('/',(req,res,next)=>{
  console.log('on the homepage');
  res.render('/');
  // res.redirect('index.ejs',{});
})




module.exports = app;


