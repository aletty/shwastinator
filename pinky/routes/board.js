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
});    

var boardMethods = {
    setPin: function(motorPin){
        board.pinMode(motorPin, board.MODES.OUTPUT);
    },
    motorOn: function(motorPin,pourTime){
        console.log('motor on!');
        board.digitalWrite(motorPin, board.HIGH);
        temporal.delay(pourTime, function() {
            board.digitalWrite(motorPin, board.LOW);    
        });
    },
    motorOff: function(){
        console.log('motor off!');
        board.digitalWrite(motorPin, board.LOW);
    }
};

exports.boardMethods = boardMethods;