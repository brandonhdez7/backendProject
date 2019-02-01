var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const expressSession = require('express-session');


const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.db);
connection.connect();

router.use('*',(req, res, next)=>{
  console.log("Middleware is working! from routes/index.js");
  if(req.session.loggedIn){
      // res.locals is the variable that gets sent to the view
      // req.session.name = "someName";
      res.locals.name = req.session.name;
      res.locals.id = req.session.id;
      res.locals.email = req.session.email;
      res.locals.loggedIn = true;
  }else{
      res.locals.name = "null";
      res.locals.id = "";
      res.locals.email = "";
      res.locals.loggedIn = false;
  }
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
  console.log('homepage/index.js')

});

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
  // res.json(req.body);
  const hashedPass = bcrypt.hashSync(req.body.psw);
  const insertUserQuery = `INSERT INTO users (id,userName, userEmail, password)
    VALUES
    (DEFAULT,?,?,?)`;
  connection.query(insertUserQuery,[req.body.name, req.body.email, hashedPass], (error, results)=>{
    if(error){throw error;}
    res.redirect('/');
  })
  
})

router.get('/login', function(req, res) {
  res.render('login',{
    if(error){throw error;}
  });
});

router.post('/loginProcess',(req,res)=>{
  // // login process
  // res.json(req.body);
      // res.json(req.body);
      const email = req.body.email;
      // this is the English version of the password the user submitted
      const password = req.body.psw;
      // we now need to get the hashed version fro mthe DB, and compare!
      const checkPasswordQuery = `SELECT * FROM users WHERE userEmail =?`;
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
              const passwordsMatch = bcrypt.compareSync(password,results[0].password);
              if(!passwordsMatch){
                  // goodbye
                  res.redirect('/login?msg=badPass');
              }else{
                  req.session.name = results[0].userName;
                  req.session.email = results[0].email;
                  // req.session.id = results[0].id;
                  req.session.uid = results[0].id;
                  req.session.loggedIn = true;
                  res.redirect('/dashboard?msg=loginSuccess');
                  // response is set, HTTP disconnects, we are done
              }        
          }
      })
  })

router.get('/dashboard', function(req, res) {
  res.render('dashboard',{
    // name: res.locals.name,  
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

router.get('/logout',(req, res, next)=>{
  // delete all session varibles for this user
  req.session.destroy();
  res.redirect('/login?msg=loggedOut')
})

module.exports = router;
