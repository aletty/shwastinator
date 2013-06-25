var firmata = require('firmata');
var motorPin = 11;

var board = new firmata.Board('/dev/ttyACM0', function(err) {
    if (err){
        console.log(err);
        return;
    }

    console.log('connected');
    console.log('Firmware: ' + board.firmware.name 
      + '-' + board.firmware.version.major 
      + '.' + board.firmware.version.minor);

    board.pinMode(11, board.MODES.PWM);
});    


var boardMethods = {
    motorOn: function(){
        console.log('motor on!');
        board.analogWrite(motorPin, 255);
    },
    motorOff: function(){
        console.log('motor off!');
        board.analogWrite(motorPin, 0);
    }
};

exports.boardMethods = boardMethods;
