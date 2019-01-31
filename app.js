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

// // Set up MySQL Connection
// const mysql = require('mysql');
// let connection = mysql.createConnection(config.db);
// // we have a connection, lets connect
// connection.connect();

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

app.get('/',(req,res,next)=>{
  console.log('on the homepage');
})

app.get('/login', (req, res, next)=>{
res.render('login',{});
console.log("got to the login page");
});

app.post('/loginProcess',(req,res,next)=>{
  // res.json(req.body);
  const email = req.body.email;
  // this is the English version of the password the user submitted
  const password = req.body.password;
  // we now need to get the hashed version fro mthe DB, and compare!
  const checkPasswordQuery = `SELECT * FROM users WHERE email =?`;
  connection.query(checkPasswordQuery,[email],(error, results)=>{
      if(error){throw error;}
      // possibilities:
      // 1. No match, i.e. the user isn't not in the database.
      if(results.length == 0 ){
          // we don't care what password they gave us, send them back to /login
          res.redirect('/login?msg=noUser');
      }else{
          //user exists...
          // 2. We found the user, but the password doesn't match
          const passwordsMatch = bcrypt.compareSync(password,results[0].hash);
          if(!passwordsMatch){
              // goodbye
              res.redirect('/login?msg=badPass');
          }else{
              // 3. We found the user and the password matches
              //these are the droids we're looking for!!
              //-NOTE: every single http request (route) is 
              // a completely new request
              // Cookies: Stores data in the browser, with a key on the server 
              // every single page request the entire cookie is sent to the server 
              // Sessions: Stores data on the server, with a key(cookie) on the browser
              req.session.name = results[0].name;
              req.session.email = results[0].email;
              // req.session.id = results[0].id;
              req.session.uid = results[0].id;
              req.session.loggedIn = true;
              res.redirect('/?msg=loginSuccess');
              // response is set, HTTP disconnects, we are done
          }        
      }
  })
})

app.get('/logout',(req, res, next)=>{
  // delete all session varibles for this user
  req.session.destroy();
  res.redirect('/login?msg=loggedOut')
})


module.exports = app;


