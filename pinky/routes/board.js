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
        board.pinMode(5, board.MODES.OUTPUT);
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
                if (pumpStatus[1]){
                    boardMethods.togglePump(1,pumpStatus[1]);
                    setTimeout(function(){
                        callback(null, 1);
                    }, pumpStatus[1]);                    
                } else {
                    callback(null, 1);
                }
            },
            two: function(callback){
                if (pumpStatus[2]){
                    boardMethods.togglePump(2,pumpStatus[2]);
                    setTimeout(function(){
                        callback(null, 2);
                    }, pumpStatus[2]);                    
                } else {
                    callback(null, 2);
                }            },
            three: function(callback){
                if (pumpStatus[3]){
                    boardMethods.togglePump(3,pumpStatus[3]);
                    setTimeout(function(){
                        callback(null, 3);
                    }, pumpStatus[3]);                    
                } else {
                    callback(null, 3);
                }            },
            four: function(callback){
                if (pumpStatus[4]){
                    boardMethods.togglePump(4,pumpStatus[4]);
                    setTimeout(function(){
                        callback(null, 4);
                    }, pumpStatus[4]);                    
                } else {
                    callback(null, 4);
                }            },
            five: function(callback){
                if (pumpStatus[5]){
                    boardMethods.togglePump(5,pumpStatus[5]);
                    setTimeout(function(){
                        callback(null, 5);
                    }, pumpStatus[5]);                    
                } else {
                    callback(null, 5);
                }
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
    5: 0,
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
        this[5] = 0;        
    }
};

exports.boardMethods = boardMethods;
exports.pumpStatus = pumpStatus;
