module.exports = function(app) {;
	var nextPage = app.controllers.nextPage;
	app.get('/nextPage', nextPage.index);
};