var User = app.models.user;
var bcrypt = require('bcrypt');
module.exports = function(app) {
	var homeController = {
		index: function(req, res) {
			res.render('home/main');
		},
		login: function(req, res) {

		},
		signup: function(req, res) {
			var name = req.body.nameSignup;
			var email = req.body.emailSignup;
			var password = req.body.passwordSignup;

			if(name && email && password) {
				if (password.length < 5) {
					req.flash('error', 'Password must have more than 5 characters');
					res.render('home/main');
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
				}

			} else {
				req.flash('error', "Hey, i think you didn't write in some fields");
			}
		}
	};
	return homeController;
};