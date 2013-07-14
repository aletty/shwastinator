var firmata = require('firmata');
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
        setTimeout(function() {
            board.digitalWrite(pumpPin, board.LOW);    
        }, pourTime);
    },
    processPumps: function(){
        async.series({
            one: function(callback){
                if (pumpStatus[1]){
                    boardMethods.togglePump(1,pumpStatus[1]);
                    setTimeout(function(){callback(null, 1);}, pumpStatus[1]);                    
                } else {callback(null, 1);}
            },
            two: function(callback){
                if (pumpStatus[2]){
                    boardMethods.togglePump(2,pumpStatus[2]);
                    setTimeout(function(){callback(null, 2);}, pumpStatus[2]);                    
                } else {callback(null, 2);}            
            },
            three: function(callback){
                if (pumpStatus[3]){
                    boardMethods.togglePump(3,pumpStatus[3]);
                    setTimeout(function(){callback(null, 3);}, pumpStatus[3]);                    
                } else {callback(null, 3);}            
            },
            four: function(callback){
                if (pumpStatus[4]){
                    boardMethods.togglePump(4,pumpStatus[4]);
                    setTimeout(function(){callback(null, 4);}, pumpStatus[4]);                    
                } else {callback(null, 4);}            
            },
            five: function(callback){
                if (pumpStatus[5]){
                    boardMethods.togglePump(5,pumpStatus[5]);
                    setTimeout(function(){callback(null, 5);}, pumpStatus[5]);                    
                } else {callback(null, 5);}
            },
            six: function(callback){
                if (pumpStatus[6]){
                    boardMethods.togglePump(6,pumpStatus[6]);
                    setTimeout(function(){callback(null, 6);}, pumpStatus[6]);                    
                } else {callback(null, 6);}
            },
            seven: function(callback){
                if (pumpStatus[7]){
                    boardMethods.togglePump(7,pumpStatus[7]);
                    setTimeout(function(){callback(null, 7);}, pumpStatus[7]);                    
                } else {callback(null, 7);}
            },
            eight: function(callback){
                if (pumpStatus[8]){
                    boardMethods.togglePump(8,pumpStatus[8]);
                    setTimeout(function(){callback(null, 8);}, pumpStatus[8]);                    
                } else {callback(null, 8);}
            },
            nine: function(callback){
                if (pumpStatus[9]){
                    boardMethods.togglePump(9,pumpStatus[9]);
                    setTimeout(function(){callback(null, 9);}, pumpStatus[9]);                    
                } else {callback(null, 9);}
            },
            ten: function(callback){
                if (pumpStatus[10]){
                    boardMethods.togglePump(10,pumpStatus[10]);
                    setTimeout(function(){callback(null, 10);}, pumpStatus[10]);                    
                } else {callback(null, 10);}
            },
            eleven: function(callback){
                if (pumpStatus[11]){
                    boardMethods.togglePump(11,pumpStatus[11]);
                    setTimeout(function(){callback(null, 11);}, pumpStatus[11]);                    
                } else {callback(null, 11);}
            },
            twelve: function(callback){
                if (pumpStatus[12]){
                    boardMethods.togglePump(12,pumpStatus[12]);
                    setTimeout(function(){callback(null, 12);}, pumpStatus[12]);                    
                } else {callback(null, 12);}
            },
            thirteen: function(callback){
                if (pumpStatus[13]){
                    boardMethods.togglePump(13,pumpStatus[13]);
                    setTimeout(function(){callback(null, 13);}, pumpStatus[13]);                    
                } else {callback(null, 13);}
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
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
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
        this[6] = 0;        
        this[7] = 0;        
        this[8] = 0;        
        this[9] = 0;        
        this[10] = 0;        
        this[11] = 0;        
        this[12] = 0;        
        this[13] = 0;
    }
};

exports.boardMethods = boardMethods;
exports.pumpStatus = pumpStatus;