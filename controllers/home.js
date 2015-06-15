// Global variables
var User = require('../models/user.js');
var bcrypt = require('bcrypt');
var validator = require('validator');

exports.main = function(req, res){
	res.render('home/main', { messageError: req.flash('error'), messageSuccess: req.flash('success') });
};
	
exports.login = function(req, res) {
	// Login logic goes here
};

exports.signup = function(req, res) {
	// Form variables
	var name = req.body.nameSignup;
	var email = req.body.emailSignup;
	var password = req.body.passwordSignup;

	// Validation variables
	var passwordLength = validator.isLength(password, 5, 40);
	var isEmail = validator.isEmail(email);
	var isRealName = validator.isAlpha(name);

	// Logic
	if(name && email && password) {
		if (passwordLength == false) {
			req.flash('error', 'Password must have more than 5 characters and less than 40');
			res.redirect('/');
		} else if(isEmail == false) {
			req.flash('error', 'Well.. i think that this is not an email adress');
			res.redirect('/');
		} else if(isRealName == false) {
			req.flash('error', 'This is not your real name');
			res.redirect('/');
		} else {
			bcrypt.hash(password, 9, function(err, hash){
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
			req.flash('success', 'User registered successfully!');
			res.redirect('/');
		}

	} else {
		req.flash('error', "Hey, i think you didn't write in some fields");
		res.redirect('/');
	}
};

