
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
  , http = require('http')
  , path = require('path')
  , firmata = require('firmata');

var board = require('./routes/board.js')
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

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