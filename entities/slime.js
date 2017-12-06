Slime = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "enemy");
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.collideWorldBounds = true;
    this.enableBody = true;
    this.animations.add('right', [3,4,5], 10, true);
    this.animations.add('left', [0, 1,2],10, true);
    this.body.gravity.y = 640;
    this.body.bounce.y = 0;// 0.7 + Math.random() * 0.2;
    this.body.bounce.x = 1;
    this.body.collideWorldBounds = true;
    this.body.velocity.x = 80;
    
    


};

Slime.prototype = Object.create(Phaser.Sprite.prototype);
Slime.prototype.constructor = Slime;

Slime.prototype.update = function () {
    if (Math.round(this.body.velocity.x) == 0) {
        this.body.velocity.x *= -1;
    };
    
    var chasing = false;
    //console.info(this.chase);
    // check if the slime's y position on the map is equal to the player's y position
    // use Math.round to ignore the decimal
    if (this.inCamera && this.chase){
        //console.info("robot y = " + Math.round(this.y));
        //console.info("player y = " + Math.round(player.playerBody.y));
        if (Math.round(this.y) == Math.round(player.playerBody.y) + 6) {
            
            console.info("player and slime have same y")
            // if both slime and player are on the same 'plane' move towards the player
            //console.info("robot x = " + Math.round(this.x));
            //console.info("player x = " + Math.round(player.playerBody.x));
            if (Math.round(player.playerBody.x) > Math.round(this.x)) {
                // increase the speed from the default 80 to 200
                console.info("player and slime on same platform")
                this.body.velocity.x = 130;
            } else {
                this.body.velocity.x = -130;
            }
            chasing = true;
        }
    }

    if(!chasing){
        // when the slime isn't actively chasing the player,
        // reduce speeds back to normal
        if(this.body.velocity.x >= 0){
            this.body.velocity.x = 80;
            this.animations.play('left');
        } else if(this.body.velocity.x < 0){
            this.body.velocity.x = -80;
            this.animations.play('right');
        }
    }
    

    game.physics.arcade.collide(this, platforms, function (slime, platform) {
        //console.info('slime and platform collide')
        if (slime.body.velocity.x > 0 && slime.x > platform.x + (platform.width - slime.width)- 20 ||
                slime.body.velocity.x < 0 && slime.x < platform.x + 20) {
            //console.info('slime patrolling')
            // this is still the old platform patrol AI from before
            // we added the chasing check so the slime will stop at the edge closest to the player
            if (chasing) {
                slime.body.velocity.x = 0;
            } else {
                slime.body.velocity.x *= -1;
            }
        }
    });

    game.physics.arcade.collide(this, slimes, function (slime, slimes) {
        slime.body.velocity.x *= -1;
    });
};

function createSlime (x,y,chase) {
        var slime = new Slime(game,x,y);
        slimes.add(slime);
        slime.takeDamage = function(){
            slime.kill();
        
        };
    slime.chase = chase;

}