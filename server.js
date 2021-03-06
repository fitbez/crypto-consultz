var express = require('express');
var path = require('path');
var bodyParser = require('body-Parser');
var cookieParser = require('cookie-Parser');
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

//database
db.on('error', err => {
 console.log(`There was an error connecting to the database: ${err}`);
});
db.once('open', () => {
 console.log(
   `You have successfully connected to your mongo database`
 );
});

//path of routes
var routes = require('./routes/index');
var users = require('./routes/users');

// Initialize App
var app = express();

//Setup Handlebars view engine
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// bodyParser Middleware
app.use(bodyParser.json()); //restoring in the DB in JSON format
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

// Set Static folder
app.use(express.static(path.join(__dirname,'public')));

// Express Session Middleware
app.use(session({
  secret:'secret',
  saveUnintialized:true,
  resave:true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Middleware for expressValidator
app.use(expressValidator({
  errorFormatter : function(param, msg, value){
  var namespace = param.split('.')
  , root = namespace.shift()
  , formParam = root;
  while(namespace.length) {
    formParam += '[' + namespace.shift() * ']';
  }
  return {
    param : formParam,
    msg : msg,
    value :value
   };
  }
}));

// conect flash
app.use(flash());

// Global Vars
app.use(function (req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use('/', routes);
app.use('/users', users);

// set port
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function(){
  console.log('Server started on port ' +app.get('port'));
});