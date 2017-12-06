var game = new Phaser.Game(960,600, Phaser.AUTO, 'game');


var hookStdVelo = 1000;
var player;
var enemies;
var platforms;
var goal;
var line;
var slimes;
var screen = 0;

var gates;
var switches;
var gateOpen;
var fireTime;
var skip;

var playerGravity = 1000  ;
var playerMaxVelocity = 1000;
            
var gameKeyboard;
var gameCamera;
var prompter = {
    dictionary: {
        'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7, 
        'i': 8, 'j': 9, 'k': 10, 'l': 11, 'm': 12, 'n': 13, 'o': 14, 'p': 15, 
        'q': 16, 'r': 17, 's': 18, 't': 19, 'u': 20, 'v': 21, 'w': 22, 'x': 23, 
        'y': 24, 'z': 25, '1': 26, '2': 27, '3': 28, '4': 29, '5': 30, '6': 31, 
        '7': 32, '8': 33, '9': 34, '0': 35, '.': 36, ',': 37, ':': 38, ';': 39, 
        "'": 40, '"': 41, '(': 42, '!': 43, '?': 44, ')': 45, '+': 46, '-': 47, 
        '*': 48, '/': 49, '=': 50, ' ': 51
    },
    fadetime: 0,
    currentContent: null,
    print: function(text,x,y){
        if(this.currentContent != null){
            this.clear();
            var line = 0;
            var lineBacklog = 0;
            
            for(var i = 0; i < text.length; i++){
                var chara;
                var inChar = text[i].toLowerCase();
                
                if(this.dictionary[inChar] != undefined){
                    chara = game.add.sprite((i-lineBacklog)*15,line*20,'visitorFont');
                    chara.frame = this.dictionary[inChar];
                    this.currentContent.add(chara);
                } else {
                    if(inChar == "\n"){
                        line++;
                        lineBacklog = i+1;
                    } else {
                        chara = game.add.sprite((i-lineBacklog)*15,line*20,'visitorFont');
                        chara.frame = 44;
                        this.currentContent.add(chara);
                    }
                }
            }
            
            this.shift(x,y);
        }
    },
    clear: function(){
      if(this.currentContent !=null){
          this.currentContent.removeChildren();
      }  
    },
    shift: function(posX, posY){
        this.currentContent.x = posX;
        this.currentContent.y = posY;
    },
    fadeIn: function(numberOfFrames){
        this.currentContent.alpha = 0;
        this.fadetime = numberOfFrames;
    },
    fadeOut: function(numberOfFrames){
        this.currentContent.alpha = 1;
        this.fadetime = -numberOfFrames;
    },
    updateDisplay: function(){
        if(this.fadetime > 0){
            this.currentContent.alpha += (1 - this.currentContent.alpha)/this.fadetime;
            this.fadetime--;
        } else if (this.fadetime < 0){
            this.currentContent.alpha -= (this.currentContent.alpha)/Math.abs(this.fadetime);
            this.fadetime++;
        }
    }
};

var soundBank = {
    sounds:{},
    add: function(audio,key){
        this.sounds[key] = audio;
    },
    play: function(key){
        if(this.sounds[key] != null){
            if(!this.sounds[key].isPlaying){
                this.sounds[key].play();
            }
        }
    }
};

            
var background2;
var background1;
var middleground;
var foreground1;
var foreground2;

var aliens;
var enemyBullet;
var livingEnemies = [];
var firingtimer = 0;
var firingTimer = [];
var deflectShooter;
function objectIsEmpty(object){
    var name;

    for(name in object) {
        return false;
    }
                
    return true;
}

var UI = {
    healthBar:{
        segments:[],
        background:{},
        displayHealth: function(){
            for(var i = 0; i < this.segments.length; i++){
                if(i*10 < player.health){
                    this.segments[i].frame = 0;
                } else {
                    this.segments[i].frame = 1;
                }
            }
        }
    }
}

function inRange(enemybody,playerbody, range) {
    if (Math.sqrt(((playerbody.x - enemybody.x)*(playerbody.x - enemybody.x)) + ((playerbody.y - enemybody.y)*(playerbody.y - enemybody.y))) < range){
        return true;
    }
    return false;
}

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('room1', room1state);
game.state.add('room2', room2state);
game.state.add('room3', room3state);
game.state.add('room4', room4state);
game.state.add('room5', room5state);
game.state.add('room6', room6state);
game.state.add('room7', room7state);
game.state.add('room8', room8state);
game.state.add('room9', room9state);
game.state.add('room10', room10state);
game.state.add('startstate', startstate);
game.state.add('startstate2', startstate2);
game.state.add('startstate3', startstate3);
game.state.add('startstate4', startstate4);

game.state.add('gameWon', winState);
game.state.add('gameOver', loseState);

game.state.start('boot');
