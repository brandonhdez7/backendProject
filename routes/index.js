var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get('/login', function(req, res) {
  res.render('login',{
    if(error){throw error;}
  });
});

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
