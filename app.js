var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var load = require('express-load');
var app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});

load('models', {cwd: 'app'}).then('controllers').then('routes').into(app);

app.listen(3000, function(){
  console.log('Rodando!');
});


