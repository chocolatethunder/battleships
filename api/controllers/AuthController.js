/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const passport = require('passport');
module.exports = {
  login: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if((err) || (!user)) {
        return res.send({
          message: 'unsuccessful',
          user:user
        });
      }
      req.logIn(user, function(err) {
        if(err) {
          res.send(err);
        }
        console.log('about to render game');
        return res.redirect('game','200',{
          message: info.message,
          user:user
        });
      });
    })(req, res);
  },
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};
