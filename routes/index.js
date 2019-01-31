var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const expressSession = require('express-session');


const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.db);
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get('/login', function(req, res) {
  res.render('login',{
    if(error){throw error;}
  });
});

router.post('/loginProcess',(req,res)=>{
  // // login process
  res.json(req.body);
})



router.post('/registerProcess',(req,res)=>{
  // const hashedPass = bcrypt.hashSync(req.body.password);
  // // Before we insert a new user into the users table, we need
  // // to make sure this email isn't already in the db
  // const checkUserQuery = `SELECT * FROM users WHERE email = ?`;
  // connection.query(checkUserQuery,[req.body.email],(error,results)=>{
  //   if(error){throw error;}
  //   if(results.length != 0){
  //     // our query returned a row, that means this email is already registered
  //     res.render('/register?msg=register');
  //   }else{
  //     // this is a new user! Insert them!
  //     const insertUserQuery = `INSERT INTO users (name, email, hash)
  //       VALUES
  //       (?,?,?)`;
  //     connection.query(insertUserQuery,[req.body.name, req.body.email, hashedPass],(error2, results2)=>{
  //         if(error2){throw error2;}
  //       })
  //     }
  //   })
  res.json(req.body);
  const insertUserQuery = `INSERT INTO users (userName, userEmail, password)
    VALUES
    (?,?,?)`;
  connection.query(insertUserQuery,[req.body.name, req.body.email, psw], (error, results)=>{
    if(error){throw error;}
  })
})

router.get('/dashboard', function(req, res) {
  res.render('dashboard',{
    if(error){throw error;}
  });
});

router.get('/budget', function(req, res) {
  res.render('budget',{
    if(error){throw error;}
  });
});
router.get('/bank', function(req, res) {
  res.render('bank',{
    if(error){throw error;}
  });
});
router.get('/profile', function(req, res) {
  res.render('profile',{
    if(error){throw error;}
  });
});

module.exports = router;
