
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
  , board = require('./routes/board.js')
  , temporal = require('temporal');

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

//   var uristring = 
//     process.env.MONGODB_URI ||
//     process.env.MONGOLAB_URI ||
//     'mongodb://localhost/shwastinator';
//   var mongoOptions = { db: { safe: true }};

//   mongoose.connect(uristring, mongoOptions, function (err, res) {
//     if (err) {
//       console.log('ERROR connecting to: ' + uristring + '. ' + err);
//     } else {
//       console.log('Succeeded connecting to:' + uristring + '.');
//     }
//   });
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

server.listen(app.get('port'));

var socket = io.connect('192.168.2.36', {port:4000});

socket.on('connect', function() {
  console.log('connected on pi (yummy)');
});

socket.on('recipe 1', function(data) {
  console.log(data);
  var recipe = data.drink
  for (var i=0;i<recipe.length;i++) {
    board.boardMethods.setPin(recipe[i][0]);
    board.boardMethods.motorOn(recipe[i][0], recipe[i][1]*1000);    
  temporal.delay(recipe[i][1]*1000, function(){}); 
  }
});

socket.on('led 2', function() {
  console.log('led 2');
});
// socket.on('led 1', function() {
//     console.log('led 1');
//     board.boardMethods.setPin(1);
//     board.boardMethods.motorOn(1);
// });

// socket.on('led 2', function(){
//     console.log('led 2');
//     board.boardMethods.setPin(2);
//     board.boardMethods.motorOn(2);
// });

// socket.on('led 3', function(){
//     console.log('led 3');
//     board.boardMethods.setPin(3);
//     board.boardMethods.motorOn(3);
// });

// socket.on('led 4', function(){
//     console.log('led 4');
//     board.boardMethods.setPin(4);
//     board.boardMethods.motorOn(4);
// });    
