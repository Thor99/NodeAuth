// Variables
var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var home = require('./controllers/home');
var afterAuth = require('./controllers/afterAuth');
var flash = require('connect-flash');
var app = express();

module.exports = app;

// app set
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app uses
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(expressSession({
  secret: 'my secret',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

// Homepage
app.get('/', home.main);
app.post('/signup', home.signup);

// After logged
app.get('/afterAuth', afterAuth.index);

// Intern
app.listen(3000, function(){
  console.log('Rodando!');
});


