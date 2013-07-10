
/**
 * Module dependencies.
 */

var express = require('express')
var app = express();

var server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , routes = require('./routes')
  , user = require('./routes/user')
  , index = require('./routes/index')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path')
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

app.get('/', routes.index);
app.get('/users/:user', user.profile);
app.get('/admin', admin.home);

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