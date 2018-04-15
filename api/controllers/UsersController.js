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
        console.log("user found was:" + user);
        userFound = user[0];
        sails.sockets.broadcast(sails.sockets.getId(req), 'playerFound', userFound);
        sails.log(user);
        // return the user found to the client
      }
    })
  }

};

