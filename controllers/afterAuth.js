exports.index = function(req, res) {
	var user = req.session.user;
	var params = {user: user}
	res.render('afterAuth/index', params);
}

exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect('/');
}