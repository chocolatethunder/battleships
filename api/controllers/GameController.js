/**
 * GameController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var gameRooms = [];
var passport= require('passport');

module.exports = {
  ensureAuthenticated: function(req,res){
    //console.log('isAuthenticated called');
    ensureAuthenticated(req,res);
   // console.log('req in endusreAuthenticated'+req);
    //sails.log(req);
  },
  createGameRoom: function(req,res){
    console.log('createGameRoom called');
    console.log(req.session.passport.user);
    userId = req.session.passport.user;
    //var username;

    var username;
    //console.log("userName" + userName);
    // here we are finding the user that requested to create a room
    username = Users.find({id:userId}).exec(function(err, user){
      if(err){
        console.log('error finding user');
        res.send(500, {error:'database error'});
      }else{
        var username = user[0].username;
        console.log('username:' + username);

        let randomNum = Math.floor(Math.random() * Math.floor(1000000));
        let roomName = "room" + randomNum;
        gameRooms.push({name:randomNum, host:username, numActivePlayers:1});
        sails.sockets.join(req, roomName);
        //sails.sockets.broadcast('GameRoom1', 'addRoomToView', {roomName:"GameRoo12"});
        // add a room to all
        sails.sockets.blast('addRoomToView', {roomName:roomName, host:username});
        sails.socket.post()
        return res.json({
          message:'Successfully created room'
        });
      }
    });

    console.log('username' + username);
    //console.log('username' + username);

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
