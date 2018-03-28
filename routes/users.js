var express = require('express');
var router = express.Router();

// Signup
router.get('/signup', function(req, res){
  res.render('signup');
});

// Login
router.get('/login', function(req, res){
  res.render('login');
});

module.exports = router;
