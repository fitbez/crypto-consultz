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

// Signup User
router.post('/signup', function(req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.password;
  var password2 =req.body.password2;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password do not match').equals(req.body.password);
  var errors = req.validationErrors();
  if(errors){
    res.render('', {
      errors:errors
    })
  }else{
    console.log('PASSED');
  }

});

module.exports = router;
