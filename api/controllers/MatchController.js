/**
 * MatchController
 *
 * @description :: Server-side logic for managing matches
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  transferTorped: function(req,res){

    sails.sockets.broadcast('', 'receiveTorpedo', eid);
  }

};

