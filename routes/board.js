var firmata = require('firmata');
var temporal = require('temporal');

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
    motorOn: function(motorPin){
        console.log('motor on!');
        board.digitalWrite(motorPin, board.HIGH);
        temporal.delay(1000, function() {
            board.digitalWrite(motorPin, board.LOW);    
        });
    },
    motorOff: function(){
        console.log('motor off!');
        board.digitalWrite(motorPin, board.LOW);
    }
};

exports.boardMethods = boardMethods;

