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
    if(ensureAuthenticated(req,res)){
      console.log("user is authenticated");
      return res.render('game');
      //return true;
    }else{
      console.log("user is not authenticated");
      return res.redirect('/');
      //return false
    }
   // console.log('req in endusreAuthenticated'+req);
    //sails.log(req);
  },
  createGameRoom: function(req,res){
    console.log('createGameRoom called');
    if( typeof req.session.passport == "undefined" || typeof req.session.passport.user == undefined){
      sails.sockets.broadcast(sails.sockets.getId(req), 'errorAlert', {message:'Session Expired. Please login again'})
      return res.send(500, {error: 'sessione expired'})

    }
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
        //socket.username = username;
//        console.log('sails.socket:'+ socket);

        let randomNum = Math.floor(Math.random() * Math.floor(1000000));
        let roomName = "room" + randomNum;
        gameRooms.push({name:randomNum, host:username, numActivePlayers:1, userOneId:userId, userOneSocketId: sails.sockets.getId(req)});
        sails.sockets.join(req, roomName);
        //sails.sockets.broadcast('GameRoom1', 'addRoomToView', {roomName:"GameRoo12"});
        // add a room to all
        sails.sockets.blast('addRoomToView', {roomName:roomName, host:username});
        // emit a socket to the current user to send them to a waiting room;
        sails.sockets.broadcast(sails.sockets.getId(req),'takePlayerToWaitingRoom');


        // after this we should emit a socket to send the calling user to the "waiting" game room to wait for a game
        return res.json({
          message:'Successfully created room'
        });
      }
    });

    console.log('username' + username);
    //console.log('username' + username);

  },
  joinGameRoom: function(req,res){
    // if the current user isn't authenticated then redirect them to the login page
    //console.log((req.session.passport.user == "undefined") )
    if( typeof req.session.passport == "undefined" || typeof req.session.passport.user == "undefined"){
      console.log("in joinGameRoom the session expired, redirecting to login page");
      sails.sockets.broadcast(sails.sockets.getId(req), 'errorAlert', {message:'Session Expired. Please login again'});
      return res.redirect('/'); // /////
    }
    var userId = req.session.passport.user;
    var requestedGameRoom = req.body.roomRequested;
    console.log("User with this id" + userId +  "wants to join the game room:" + requestedGameRoom);
    var canJoin = canJoinRoom(requestedGameRoom, userId);
    if( canJoin.canJoin == true){
      console.log("we are able to join this game room");
      //console.log("socketIdOfRequestingUser" +req.socket);
      //sails.log(req.socket);
      //sails.sockets.broadcast()
      // add the player to the room
      // emit a socket to take the player to the game room
      // must update number of players already in the game room
      gameRooms[canJoin.roomIndex].numActivePlayers += 1;
      gameRooms[canJoin.roomIndex].userTwoId = userId;
      sails.sockets.join(req, gameRooms[canJoin.roomIndex].name);
      console.log("sails.sockets.getId(req)" + sails.sockets.getId(req));
      // emit a socket saying we have joined the game room
      // we should now start the game if there are two players in the current gameRooms
      hostSocketId = gameRooms[canJoin.roomIndex].userOneSocketId;
      sails.sockets.broadcast([sails.sockets.getId(req), hostSocketId], 'startGame');

    }
    else{
      console.log("we can't join this game room")
      // notify the player that they can't join the game room  or do nothing
      sails.sockets.broadcast(sails.sockets.getId(req),'errorAlert', {message:'Cannot Join Room'});

    }

  }
};

function ensureAuthenticated(req,res){
  if(req.isAuthenticated()){
     console.log("user is authenticated");
      //return res.render('game');
      return true;
  }else{
    console.log("user is not authenticated");
    //return res.redirect('/');
    return false
  }
}

// this function checks to see if a player can join a game
// it checks if the gameRoom trying to connect to exists
// it checks if the host of the game is different from this user,
// it checks if there are less than 2 players in a given game room,
function canJoinRoom(gameRoom, userId){
  for(var i=0; i < gameRooms.length; i++){
    console.log("gameRoom:" + gameRoom + " gameRooms[i].name" + gameRooms[i].name + " userId:" + userId + " userOneId:" + gameRooms[i].userOneId);
    // need to also check to see if this user is the host
    if(gameRooms[i].name == gameRoom && gameRooms[i].numActivePlayers == 1 && gameRooms[i].userOneId != userId){
        return {canJoin: true, roomIndex:i}
    }
  }
  console.log("inCanJoinRoom");
  return {canJoin: false, roomIndex:0}
}
