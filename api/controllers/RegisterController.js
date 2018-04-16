/**
 * RegisterController
 *
 * @description :: Server-side logic for managing registers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	createUser: function (req,res) {
		if(req.body.password !== req.body.password2) {
			return ResponseService.json(401,res,"Password doesn't match")
		}

		// Allowed params
		let params = ["username","email","password"];

		// extract the user data from the body
		let userdata = _.pick(req.body,params);
    userdata.gamesPlayed = 0;
    userdata.gamesWon = 0;
    userdata.ranking = '0';
    userdata.averageShotsTakenInWins =  0;
		console.log("userdata")
    sails.log(userdata);
		Users.create(userdata).then(function(user) {
			// redirect to menu page
			return res.redirect('/','200',{
			  user:user
			});
		}).catch(function(error) {
			return res.redirect('register','200',{
			  // user error data to display which field went wrong
			});
		})
	}

};

