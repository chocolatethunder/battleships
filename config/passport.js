const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function(id, cb){
  Users.findOne({id}, function(err, user) {
    cb(err, Users);
  });
});
passport.use(new LocalStrategy({
  usernameField: 'username',
  passportField: 'password'
}, function(username, password, cb){
  Users.findOne({username: username}, function(err, user){
    if(err) return cb(err);
    if(!user) return cb(null, false, {message: 'Username not found'});
    bcrypt.compare(password, user.password, function(err, res){
      if(!res) return cb(null, false, { message: 'Invalid Password' });
      let userDetails = {
        email: user.email,
        username: user.username,
        id: user.id
      };
      return cb(null, userDetails, { message: 'Login Succesful'});
    });
  });
}));

module.exports = {

  // SNIP ...

  // Custom express middleware - we use this to register the passport middleware
  express: {
    customMiddleware: function(app) {
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }

};
