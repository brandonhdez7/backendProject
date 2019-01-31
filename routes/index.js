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

module.exports = router;
