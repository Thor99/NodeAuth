// Global variables
var User = require('../models/user.js');
var bcrypt = require('bcrypt');
var validator = require('validator');
var thinky = require('thinky')();
var Errors = thinky.Errors;

exports.main = function(req, res){
	res.render('home/main', { messageError: req.flash('error'), messageSuccess: req.flash('success'), messageErrorLogin: req.flash('errorLogin') });
};
	
exports.login = function(req, res) {
	// Form variables
	var emailLogin = req.body.emailLogin;
	var passwordLogin = req.body.passwordLogin;

	// Logic
	User.get(emailLogin).run().then(function(user){
		var isValidPassword = bcrypt.compareSync(passwordLogin, user.password);
		if(!isValidPassword) {
			console.log('Wrong combination');
			req.flash('errorLogin', "Wrong combination!");
			res.redirect('/');
		} else {
			console.log('Authorization successfully done');
			req.session.user = user;
			res.redirect('/afterAuth');
		}
	}).catch(Errors.DocumentNotFound, function(err) {  // Does not find the email
    	console.log("Document not found");
    	req.flash('errorLogin', "We don't have this email in our database");
		res.redirect('/');
	}).error(function(error){  // Unexpected error
		console.log(error);
	});
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
		if (passwordLength === false) {
			req.flash('error', 'Password must have more than 5 characters and less than 40');
			res.redirect('/');
		} else if(isEmail === false) {
			req.flash('error', 'Well.. i think that this is not an email adress');
			res.redirect('/');
		} else if(isRealName === false) {
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


