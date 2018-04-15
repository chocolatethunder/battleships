/**
 * Profile.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	// One to one association
	uid: {
		model:'users',
		unique:true
	},
	win: {
		type:'number',
		defaultsTo:0
	},
	loss: {
		type:'number',
		defaultsTo:0
	},
	draw: {
		type:'number',
		defaultsTo:0
	},
	rank: {
		type:'number',
		defaultsTo:0
	},
	d_carriers: {
		type:'number',
		defaultsTo:0
	},
	d_gunships: {
		type:'number',
		defaultsTo:0
	},
	d_cruisers: {
		type:'number',
		defaultsTo:0
	},
	d_submarines: {
		type:'number',
		defaultsTo:0
	},
	d_destroyers: {
		type:'number',
		defaultsTo:0
	},
	// One to many association
	belongs_to: {
		model:'game'
	}

  }

};

