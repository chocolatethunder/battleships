/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  ensureAuthenticated: function(req,res){
    console.log('isAuthenticated called');
    ensureAuthenticated(req,res);
  }
};

function ensureAuthenticated(req,res){
  if(req.isAuthenticated()){
    console.log("user is authenticated");
      return res.render('game');
  }else{
    console.log("user is not authenticated");
    return res.redirect('/');
  }
}
