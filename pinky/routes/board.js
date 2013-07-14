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
    setPins: function(){
        board.pinMode(1, board.MODES.OUTPUT);
        board.pinMode(2, board.MODES.OUTPUT);
        board.pinMode(3, board.MODES.OUTPUT);
        board.pinMode(4, board.MODES.OUTPUT);        
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

var pumpStatus = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    update: function(recipe){
        for (i=0; i<recipe.length; i++){
            this[recipe[i][0]] = recipe[i][1];
        }
    }
};

exports.boardMethods = boardMethods;
exports.pumpStatus = pumpStatus;