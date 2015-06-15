// Variables
var thinky = require('thinky')();
var type = thinky.type;
var validator = require('validator');

// Schema
var User = thinky.createModel('users', {
	name: type.string(),
	email: type.string(),
	password: type.string()
}, {
	pk: "email"
});

// Exports
module.exports = User;
