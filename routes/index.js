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
      res.locals.name = req.session.name;
      res.locals.uid = req.session.uid;
      res.locals.email = req.session.email;
      res.locals.loggedIn = true;
      if(req.session.imageProfile){
        res.locals.imageProfile = req.session.imageProfile
      }else{
        res.locals.imageProfile = '/user_add-512.png'
      }
      
  }else{
      res.locals.name = "null";
      res.locals.uid = "";
      res.locals.email = "";
      res.locals.loggedIn = false;
      res.locals.imageProfile = ''
  }
  next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
  console.log('homepage/index.js')

});

// User creates login
router.post('/registerProcess',(req,res)=>{
  const hashedPass = bcrypt.hashSync(req.body.psw); // bcrypt's user's password
  const checkUserQuery = `SELECT * FROM users WHERE userEmail = ?`;
  connection.query(checkUserQuery,[req.body.email],(error,results)=>{
    if(error){throw error;}
    if(results.length != 0){
      res.redirect('/?msg=register');
    }else{
      const insertUserQuery = `INSERT INTO users (userName, userEmail, password)
        VALUES
        (?,?,?)`;
      connection.query(insertUserQuery,[req.body.name, req.body.email, hashedPass],(error2, results2)=>{
        console.log(req.session.name)
          if(error2){throw error2;}

            req.session.name = req.body.name
            req.session.email = req.body.email;
            req.session.uid = results2.insertId
            req.session.loggedIn = true;                  
            res.redirect('/dashboard?msg=loginSuccess');
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

router.post('/formBudget',(req, res, next)=>{
  // console.log('totalBudget2', req.body)
  console.log(req.body)
  const totalBudget = req.body.totalBudget;
  // const totalBalance = req.body.totalBalance;
  const insertQuery = `UPDATE users SET totalBudget = ? WHERE userName LIKE ?;`
  console.log(insertQuery);
  console.log(totalBudget);
  console.log('hello')
  connection.query(insertQuery,[totalBudget,req.body.name], (error, results)=>{
    if(error){
      throw error;
    }else{
      console.log('formbudget');
      res.json(results);
    }
  })
})



router.post('/loginProcess',(req,res)=>{
  const email = req.body.email;
  const password = req.body.psw;
  const checkPasswordQuery = `SELECT * FROM users WHERE userEmail = ?;`;
  connection.query(checkPasswordQuery,[email],(error, results)=>{
      if(error){throw error;}
      if(results.length == 0 ){
          res.redirect('/login?msg=noUser');
      }else{
          const passwordsMatch = bcrypt.compareSync(password,results[0].password);
          if(!passwordsMatch){
              res.redirect('/login?msg=badPass');
          }else{
              req.session.name = results[0].userName;
              req.session.email = results[0].email;
              req.session.uid = results[0].id;
              req.session.loggedIn = true;                  
              req.session.imageProfile = results[0].imageProfile
              res.redirect('/dashboard?msg=loginSuccess');
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
  console.log('budget')
  res.render('budget',{
    if(error){throw error;}
  });
});

router.get('/bank', function(req, res) {
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

// Allow User to change their UserName
router.post('/profileChange', (req,res)=>{
  const updateUserName = `UPDATE users SET userName = ? WHERE userName LIKE ?;`;
  connection.query(updateUserName,[req.body.name,res.locals.name],(error,proresults)=>{
    if(error){throw error;}
    req.session.name = req.body.name;
    res.redirect('/profile');
  })
})

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


// Log Out Process
router.get('/logout',(req, res, next)=>{
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

router.get('/careers', function(req, res) {
  res.render('careers',{
    if(error){throw error;}
  });
});


module.exports = router;