var mongoose = require('mongoose');
var bcrypt = require('bcryptjs'); //hashing your password

//Sign-Up
// User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  }
});
var User = module.exports = mongoose.model('User', UserSchema);
module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Store hash in your password DB.
        newUser.password = hash; //comment this line to see the user password.
        newUser.save(callback);
     });
  });
}

//Login
module.exports.getUserByUsername = function(username, callback){
  var query ={username: username}; //match user in database
  User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){ //after the username match, all user info in (user) ID.
  User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){ //the password match check
       if(err) throw err;
       callback(null, isMatch);
  });
}