var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  Users.findOne({id}, function(err, user) {
    cb(err, user);
  });
});
passport.use(new LocalStrategy({
  usernameField: 'username',
  passportField: 'password'
}, function(username, password, cb){
  Users.findOne({username: username}, function(err, user){
    if(err){
      console.log('error finding a user');
      return cb(err);
    }
    if(!user) {
      console.log('username not found');
      return cb(null, false, {message: 'Username not found'});
    }
    bcrypt.compare(password, user.password, function(err, res){
      if(!res) {
        console.log('invalid password');
        return cb(null, false, { message: 'Invalid Password' });
      }
      let userDetails = {
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id
      };
      console.log('successful login');
      return cb(null, userDetails, { message: 'Login Succesful'});
    });
  });
})
);
