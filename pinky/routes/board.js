var firmata = require('firmata');
var temporal = require('temporal');
var async = require('async');

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
    togglePump: function(pumpPin,pourTime){
        board.digitalWrite(pumpPin, board.HIGH);
        temporal.delay(pourTime, function() {
            board.digitalWrite(pumpPin, board.LOW);    
        });
    },
    processPumps: function(){
        async.series({
            one: function(callback){
                this.togglePump(1,pumpStatus[1]);
                temporal.delay(pumpStatus.1, function(){
                    callback(null, 1);
                });
            },
            two: function(callback){
                this.togglePump(2,pumpStatus[2]);
                temporal.delay(pumpStatus.2, function(){
                    callback(null, 2);
                });
            },
            three: function(callback){
                this.togglePump(3,pumpStatus[3]);
                temporal.delay(pumpStatus.3, function(){
                    callback(null, 3);
                });
            },
            four: function(callback){
                this.togglePump(4,pumpStatus[4]);
                temporal.delay(pumpStatus.4, function(){
                    callback(null, 4);
                });
            },
            reset: function(callback){
                pumpStatus.reset();
                callback(null, 'reset');
            }
        });
    }
};

var pumpStatus = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    update: function(recipe){
        for (i=0; i<recipe.length; i++){
            this[recipe[i][0]] = recipe[i][1]*1000;
        }
    },
    reset: function(){
        this[1] = 0;
        this[2] = 0;        
        this[3] = 0;
        this[4] = 0;        
    }
};

exports.boardMethods = boardMethods;
exports.pumpStatus = pumpStatus;