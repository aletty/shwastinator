
/**
 * Module dependencies.
 */

var express = require('express')
var app = express();

var server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , routes = require('./routes')
  , user = require('./routes/user')
  , bcrypt = require('bcrypt')
  , index = require('./routes/index')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path')
  , dev = require('./routes/development')
  , mongoose = require('mongoose')
  , firmata = require('firmata');

var board = require('./routes/board.js')
// all environments
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  var uristring = 
    process.env.MONGODB_URI ||
    process.env.MONGOLAB_URI ||
    'mongodb://localhost/shwastinator';
  var mongoOptions = { db: { safe: true }};

  mongoose.connect(uristring, mongoOptions, function (err, res) {
    if (err) {
      console.log('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log('Succeeded connecting to:' + uristring + '.');
    }
  });
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function checkLoggedIn() {
  return function(req, res, next) {
    if (!req.session.user){
      res.render('signinplease', {title: 'Sign In'});
    } else {
      next();
    };
  }
}

function checkAdmin() {
  return function(req, res, next) {
    if (!req.session.user){
      res.render('signinplease', {title: 'Sign In'});
    } else {
      next();
    };
  }
}

app.get('/', routes.index);
app.get('/signup', user.signup);
app.get('/signin', user.signin);
app.get('/users/:user',  checkLoggedIn(), user.profile);
app.get('/admin', checkAdmin(), admin.home);
app.post('/newUser', user.create);
app.get('/liquid', checkAdmin(), admin.liquid);
app.post('/addLiquid', admin.addLiquid);
app.get('/createUsers', dev.createUsers);
app.get('/drinks', dev.drinks);
app.post('/verify', user.login);
app.get('/createDrinks', admin.createDrinks);

server.listen(app.get('port'));

io.sockets.on('connection', function(socket) {
    socket.send('connected');

    socket.on('motor 1', function() {
        board.boardMethods.setPin(11);
        board.boardMethods.motorOn(11);
    });

    socket.on('motor 2', function(){
        board.boardMethods.setPin(12);
        board.boardMethods.motorOn(12);
    });
});