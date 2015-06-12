var User = require('../models/user.js');
var bcrypt = require('bcrypt');

exports.main = function(req, res){
	res.render('home/main');
};
	
exports.login = function(req, res) {
	// Login logic goes here
};

exports.signup = function(req, res) {
	var name = req.body.nameSignup;
	var email = req.body.emailSignup;
	var password = req.body.passwordSignup;

	if(name && email && password) {
		if (password.length < 5) {
			res.redirect('/');
			req.flash('errors', 'Password must have more than 5 characters');
		} else {
			bcrypt.hash(password, 8, function(err, hash){
				var user = new User({
					name: name,
					email: email,
					password: hash
				});

				user.save(function(err, accepted){
					if (err) {
						console.log(err);
					} else {
						console.log("User " + user.name + " saved to the db");
					}
				});
			});
			res.redirect('/');
			req.flash('success', 'User registered successfully!');
		}

	} else {
		req.flash('error', "Hey, i think you didn't write in some fields");
	}
};

