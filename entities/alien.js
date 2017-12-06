function createAliens(x,y) {

    
            var alien = aliens.create(x, y, 'invader');
            alien.anchor.setTo(.5, .5);
            alien.animations.add('fly', [ 0, 1, 2, 3,4,5,6,7,8,9,10,11,12], 10, true);
            alien.play('fly');
            alien.body.moves = false;
            alien.scale.setTo(.5,.5);
            alien.takeDamage = function(){
            alien.kill();
            };
        
    

    
};

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    //invader.animations.add('kaboom');

}

function enemyFires () {

    //  Grab the first bullet we can from the pool
    enemyBullet = enemyBullets.getFirstExists(false);

    livingEnemies.length=0;

    aliens.forEachAlive(function(alien){

        // put every living enemy in an arrayd
        livingEnemies.push(alien);
    });


    if (enemyBullet && livingEnemies.length > 0)
    {
        
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);

        // randomly select one of them
        var shooter=livingEnemies[random];
        deflectTarget = shooter;
        // And fire the bullet from this enemy
        if (shooter.inCamera && inRange(shooter.body,player.playerBody, 500)){ 
        enemyBullet.reset(shooter.body.x + 15, shooter.body.y + 40);

        game.physics.arcade.moveToObject(enemyBullet,player.playerBody,130);
        firingTimer = game.time.now + 6000;
        };
    }
}

function killBullet(bullet) {
    bullet.kill();
}

function killAlien(alien) {
    alien.kill();
}
