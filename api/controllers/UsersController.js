/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchUser: function(req,res){
    console.log("socket:" + sails.sockets.getId(req) +  "is searching for player" + req.body.playerToFind);
    let userName = req.body.playerToFind;
    Users.find({username:userName}).exec(function(err, user){
      if(err){
        console.log('error finding user');
        res.send(500, {error:'database error'});
      }else{
        if(user.length == 0){
          console.log("user doesn't exist")
          // emit no users found
          sails.sockets.broadcast(sails.sockets.getId(req), 'noPlayerFound');
          return;
        }
        userFound = user[0];
        console.log("user found was:" + userFound);
        sails.log(user);
        console.log('userFound.username:' + userFound.username);
        sails.sockets.broadcast(sails.sockets.getId(req), 'playerFound', userFound);

        // return the user found to the client
      }
    })
  },
  searchOwnProfile: function(req,res){
    //console.log('User looked up their own profile');
    //sails.log('sails.controllers' + sails.controllers)
    //sails.log(sails.controllers);
    //console.log(sails.controllers);
    Users.find({id:req.session.passport.user}).exec(function(err, user){
      if(err){
        console.log('error finding user');
        res.send(500, {error:'database error'});
      }else{
        if(user.length == 0){
          console.log("user doesn't exist")
          // emit no users found
          sails.sockets.broadcast(sails.sockets.getId(req), 'noPlayerFound');
          return;
        }
        userFound = user[0];
        console.log("user found was:" + userFound);
        sails.log(user);
        console.log('userFound.username:' + userFound.username);
        sails.sockets.broadcast(sails.sockets.getId(req), 'playerFound', userFound);

        // return the user found to the client
      }
    })
  }

};

