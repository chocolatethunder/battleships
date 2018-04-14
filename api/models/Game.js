/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	state: {
		type:'string',
		isIn: ['joining','arranging','inprogress','finished'],
		required:true
	},	
	winner: {
		model:'users'
	},
	loser: {
		model:'users'
	},
	// One to many association (reference)
	profile: {
		collection:'profile',
		via:'belongs_to'
	}
  }
  
};

