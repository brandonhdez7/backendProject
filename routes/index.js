var fs = require('fs');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const expressSession = require('express-session');

const multer = require('multer');

const upload = multer({ dest: 'public/' })

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
      res.locals.uid = req.session.uid;
      res.locals.email = req.session.email;
      res.locals.loggedIn = true;
      if(req.session.imageProfile){
        res.locals.profileImage = req.session.imageProfile
      }else{
        res.locals.profileImage = '/user_add-512.png'
      }
  }else{
      res.locals.name = "null";
      res.locals.uid = "";
      res.locals.email = "";
      res.locals.loggedIn = false;
      res.locals.profileImage = ''
  }
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
  console.log('homepage/index.js')

});

router.post('/registerProcess',(req,res)=>{
  const hashedPass = bcrypt.hashSync(req.body.psw);
  // Before we insert a new user into the users table, we need
  // to make sure this email isn't already in the db
  const checkUserQuery = `SELECT * FROM users WHERE userEmail = ?`;
  connection.query(checkUserQuery,[req.body.email],(error,results)=>{
    if(error){throw error;}
    if(results.length != 0){
      // our query returned a row, that means this email is already registered
      res.redirect('/?msg=register');
    }else{
      // this is a new user! Insert them!
      const insertUserQuery = `INSERT INTO users (userName, userEmail, password)
        VALUES
        (?,?,?)`;
      connection.query(insertUserQuery,[req.body.name, req.body.email, hashedPass],(error2, results2)=>{
          if(error2){throw error2;}
          res.redirect('/');
        })
      }
    })
})

router.get('/login', function(req, res) {
  // fakeLogin(req, res)
  
  res.render('login',{
    if(error){throw error;}
  });
});


router.post('/formSubmit',upload.single('profile_photo'),(req, res)=>{
  const tmpPath = req.file.path;
  
console.log(req.session.uid)
console.log('????')

  const targetPath = `public/${req.file.originalname}`
  
  fs.readFile(tmpPath,(error,fileContents)=>{
      if(error){throw error};
     
      fs.writeFile(targetPath,fileContents,(error2)=>{
          if(error2){throw error2};
         
          const insertQuery = `UPDATE users SET imageProfile = ? WHERE id = ?`;
          connection.query(
              insertQuery,
              [req.file.originalname,req.session.uid],
              (dbError,dbResults)=>
          {
              if(dbError){
                  throw dbError;
              }else{
                  // fs.unlink(tmpPath);
                  req.session.imageProfile = req.file.originalname
                  res.redirect('/dashboard');
              }
          })
      });
  });
 
});

router.post('/formBudget',upload.single('budget-input'),(req, res)=>{
  const tmpPath = req.file.path;
  
console.log(req.session.uid)
console.log('????')

  const targetPath = `public/${req.file.originalname}`
  
  fs.readFile(tmpPath,(error,fileContents)=>{
      if(error){throw error};
     
      fs.writeFile(targetPath,fileContents,(error2)=>{
          if(error2){throw error2};
         
          const insertQuery = `UPDATE users SET totalBuget = ? WHERE id = ?`;
          connection.query(
              insertQuery,
              [req.file.originalname,req.session.uid],
              (dbError,dbResults)=>
          {
              if(dbError){
                  throw dbError;
              }else{
                  // fs.unlink(tmpPath);
                  req.session.imageProfile = req.file.originalname
                  res.redirect('/budget');
              }
          })
      });
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
      const checkPasswordQuery = `SELECT * FROM users WHERE userEmail = ?;`;
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

                  // response is set, HTTP disconnects, we are done
                  
                  res.redirect('/dashboard?msg=loginSuccess');
                  req.session.profileImage = results[0].imageProfile
                  // res.redirect('/dashboard?msg=loginSuccess');
                  // response is set, HTTP disconnects, we are done
              }        
          }
      })
})




router.get('/dashboard', function(req, res) {
  // fakeLogin(req,res).then(()=>{
    res.render('dashboard',{
      // name: res.locals.name,  
      if(error){throw error;}
    });
  // })
});

router.get('/budget', function(req, res) {
  res.render('budget',{
    if(error){throw error;}
  });
});

router.get('/bank', function(req, res) {
  console.log('in bank route')
  const selectQuery = `SELECT access FROM users WHERE userName LIKE '${res.locals.name}';`;
  connection.query(selectQuery,(error, data)=>{
    console.log(data[0].access)
    if (data[0].access != null){
      res.render('bank',{
        if(error){throw error;}
      });
    } else {
      res.redirect('/plaid')
      // api()
    }
  })
});

router.get('/profile', function(req, res) {
  res.render('profile',{
    if(error){throw error;}
  });
});
router.get('/howItWorks', function(req, res) {
  res.render('howItWorks',{
    if(error){throw error;}
  });
});


  router.get('/plaid', function(req, res){
    const selectQuery = `SELECT access FROM users WHERE userName LIKE '${res.locals.name}';`;
    connection.query(selectQuery,(err, data)=>{
      if (data[0].access != null){
        res.redirect('/bank')
      } else {
        res.render('plaid')
      }
    })
  })



router.get('/logout',(req, res, next)=>{
  // delete all session varibles for this user
  req.session.destroy();
  res.redirect('/login?msg=loggedOut')
})

router.get('/bank', (req, res)=>{
  res.render('bank',{
    if(error){throw error;}
  })
})

router.get('/howItWorks', function (req, res){
  res.render('howItWorks',{
    if(error){throw error;}
  })
})

router.get('/privacyStatement', function (req, res){
  res.render('privacyStatement',{
    if(error){throw error;}
  })
})
module.exports = router;



// function fakeLogin(req, res){
//   return new Promise((resolve, reject)=>{
//     const checkPasswordQuery = `SELECT * FROM users WHERE userEmail = 'brandonhdez7@gmail.com'`;
//     connection.query(checkPasswordQuery,(error, results)=>{
//       req.session.name = results[0].userName;
//       req.session.email = results[0].email;
//       // req.session.id = results[0].id;
//       req.session.uid = results[0].id;
//       req.session.loggedIn = true;
//       req.session.profileImage = results[0].imageProfile
//       // res.redirect('/dashboard?msg=loginSuccess');
//       resolve('done');
//     })
//   })
// }
