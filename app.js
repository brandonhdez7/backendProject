let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const plaid = require('plaid')
const bodyParser = require('body-parser')
const config = require('./config')
let envvar = require('envvar');
let moment = require('moment');
const expressSession = require('express-session')

const mysql = require('mysql')
let connection = mysql.createConnection(config.db);
connection.connect();

const PLAID_CLIENT_ID = config.clientId;
const PLAID_SECRET = config.secret;
const PLAID_PUBLIC_KEY = config.publicKey;

const PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox');
let PLAID_PRODUCTS = envvar.string('PLAID_PRODUCTS', 'transactions');
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

let client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

var assert = require('assert')
  , localStorage = require('localStorage')
  ;

localStorage.setItem('clients', client)
var clients = localStorage.getItem('clients')
// console.log(Number(clients))

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
app.use(express.static('public'));
let helmet = require('helmet')
app.use(helmet())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/',(req, res, next)=>{
  res.render('index.ejs', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
    PLAID_PRODUCTS: PLAID_PRODUCTS,
    
  });
  
});


app.post('/get_access_token',(req, res, next)=>{
  PUBLIC_TOKEN = req.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN,(error, tokenResponse)=>{
    if (error != null) {
      console.log('Could not exchange public_token!' + '\n' + 
      error)
      res.json({
        error: msg,
      })
      return
    } 
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
      console.log('Access Token: ' + ACCESS_TOKEN);
      console.log('Item ID: ' + ITEM_ID);
      // res.json({'error': false});
      
      const insertQuery = `INSERT INTO testing (id,access)
        VALUES
      (DEFAULT,?);`;
      connection.query(insertQuery,[ACCESS_TOKEN],(error, results)=>{
        if(error) {throw error;}
        // return res.redirect('/dashboard');
      })

    //   client.getAuth(ACCESS_TOKEN, {}, (err, results) => {
    //   // Handle err
    //     var accountData = results.accounts;
    //     accountData.forEach((data)=>{
    //       // console.log(data.name)
    //     })
    //   if (results.numbers.ach.length > 0) {
    //   // Handle ACH numbers (US accounts)
    //     var achNumbers = results.numbers.ach;
    //     // console.log(achNumbers)
    // } else if (results.numbers.eft.length > 0) {
    //   // Handle EFT numbers (Canadian accounts)
    //     var eftNumbers = results.numbers.eft;
    //     // console.log(eftNumbers)
    //   }
    // });
    // var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    // var endDate = moment().format('YYYY-MM-DD');
    // client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    //   count: 250,
    //   offset: 0,
    // }, (err, results)=>{
    //   const transactions = results.transactions;
    //   // console.log(transactions)
    // });
    // client.getBalance(ACCESS_TOKEN, (err, result)=>{
    //   const accounts = result.accounts;
    //   console.log(accounts)
    // })
  });  
});
// $('#get-auth-btn').click(()=>{
//   console.log('hello')
//   client.getAuth(ACCESS_TOKEN, {}, (err, results) => {
//       // Handle err
//         var accountData = results.accounts;
//         accountData.forEach((data)=>{
//           console.log(data.name)
//         })
//       if (results.numbers.ach.length > 0) {
//       // Handle ACH numbers (US accounts)
//         var achNumbers = results.numbers.ach;
//         console.log(achNumbers)
//     } else if (results.numbers.eft.length > 0) {
//       // Handle EFT numbers (Canadian accounts)
//         var eftNumbers = results.numbers.eft;
//         console.log(eftNumbers)
//       }
//   });
// })  
// $('#get-transactions-btn').click(()=>{
//   var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
//   var endDate = moment().format('YYYY-MM-DD');
//   client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
//     count: 250,
//     offset: 0,
//   }, (err, results)=>{
//     const transactions = results.transactions;
//     // console.log(transactions)
//   })
// });
// $('#get-balance-data').click(()=>{
//   client.getBalance(ACCESS_TOKEN, (err, result)=>{
//     const accounts = result.accounts;
//     console.log(accounts)
//   })
// })
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

module.exports = app;