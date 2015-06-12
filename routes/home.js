module.exports = function(app) {
	var home = app.controllers.home;
	app.get('/', home.index);
	app.get('/login', home.login);
	app.get('/signup', home.signup);
};