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
  },
  createGameRoom: function(req,res){
    console.log('createGameRoom called');
    sails.sockets.join(req,'GameRoom1');
    sails.sockets.broadcast('GameRoom1', 'addRoomToView', {roomName:"GameRoo12"});
    sails.sockets.blast('addRoomToView', {roomName:"gameroom12"});
    return res.json({
      message:'Successfully created room'
    });
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
