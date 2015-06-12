var thinky = require('thinky')();
var type = thinky.type;
var validator = require('validator');


var User = thinky.createModel('users', {
	name: type.string().options({enforce_missing: true}).validator(validator.isAlpha),
	email: type.string().options({enforce_missing: true}).validator(validator.isEmail),
	password: type.string().options({enforce_missing: true})
});

module.exports = User;