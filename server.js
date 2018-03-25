var express = require('express');
var path = require('path');
var bodyParser = require('bodyParser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crypto-consultz')
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');

// Initialize App
var app =express();

// Set up View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defualtLayout:'layout'}));
app.set('view engine','handlebars');

// bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Set Static folder
app.use(express.static(path.join(__dirname,'public')));

// Express Session Middleware
app.use(session({
  secret:'secret',
  saveUnintialized:true,
  resave:true
}));

// Middleware for expressValidator
