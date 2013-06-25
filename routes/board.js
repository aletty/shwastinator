var firmata = require('firmata');
var motorPin = 13;

var board = new firmata.Board('/dev/ttyACM0', function(err) {
    if (err){
        console.log(err);
        return;
    }

    console.log('connected');
    console.log('Firmware: ' + board.firmware.name 
      + '-' + board.firmware.version.major 
      + '.' + board.firmware.version.minor);

    board.pinMode(motorPin, board.MODES.OUTPUT);
});    


var boardMethods = {
    motorOn: function(){
        console.log('motor on!');
        board.analogWrite(motorPin, board.HIGH);
    },
    motorOff: function(){
        console.log('motor off!');
        board.analogWrite(motorPin, board.LOW);
    }
};

exports.boardMethods = boardMethods;
