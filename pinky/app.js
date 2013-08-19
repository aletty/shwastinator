
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();

var server = require('http').createServer(app)
  , io = require('socket.io-client')
  , routes = require('./routes')
  , index = require('./routes/index')
  , http = require('http')
  , path = require('path')
  , firmata = require('firmata')
  , board = require('./routes/board.js');

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
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'));


//communication with brains
// var socket = io.connect('192.168.2.36:3000/pi');
var socket = io.connect('http://shwastinator.herokuapp.com/pi');

socket.on('connect', function() {
  console.log('connected on pi (yummy)');
});

socket.on('new drink', function(data) {
  var recipe = data.drink._liquids;  
  board.boardMethods.setPins();
  board.pumpStatus.update(data.drink._liquids, 7.5);
  board.boardMethods.processPumps();
});

exports.finishDrink = function() {
  socket.emit('finish drink');
}
