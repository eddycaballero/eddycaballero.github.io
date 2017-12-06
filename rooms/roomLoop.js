var roomUpdate = function() {
    soundBank.play("gameSong");
    var nextRoom = 0;
    
    enemies.forEach(function(enemy){
        enemy.wander();
    },this);

    if(!player.checkAlive()){
        game.state.start('gameOver');
        return;
    }
    
    
    

    if(player.grappleOut) {
        player.checkTaut();
    } else {
        player.holdLedge();
    }
    
    hookables.forEach(function(hookable){
        hookable.resetBlocked();
    });

    game.physics.arcade.collide(player.playerBody, platforms, player.grabLedge , null, player);
    game.physics.arcade.collide(player.playerBody, slimes, player.takeDamage , null, player);
    //take damage from bullets
    game.physics.arcade.overlap(player.playerBody, enemyBullets, player.takeBulletDamage , null, player);
    game.physics.arcade.collide(enemies, platforms);
    game.physics.arcade.collide(player.playerBody, hookables,function(player,hookable){hookable.collideWithPlayer(); hookable.setBlockedOnCollide(player);});
    game.physics.arcade.collide(hookables, platforms, function(hookable,platform){hookable.setBlockedOnCollide(platform);});
    game.physics.arcade.collide(player.playerBody, gates);
    game.physics.arcade.overlap(player.playerBody,exits,function(player,exit){nextRoom = exit.roomNumber;},null,this);
    game.physics.arcade.overlap(player.grappleBody, hookables, player.latchToObject,null,player);
    game.physics.arcade.overlap(player.playerBody,enemies, player.takeDamage ,null,player);
    game.physics.arcade.overlap(player.playerBody, spikes, player.instaDeath, null, player);  
    game.physics.arcade.collide(player.grappleBody, platforms, player.latchHook,null,player);
    game.physics.arcade.overlap(player.grappleBody, platforms, player.latchHook,null,player);
    game.physics.arcade.collide(player.grappleBody, gates, player.latchHook, null, player);
    game.physics.arcade.overlap(player.grappleBody, gates, player.latchHook,null,player);
    game.physics.arcade.overlap(player.playerBody, enemies, player.takeDamage ,null,player);
    game.physics.arcade.overlap(player.playerBody, spikes, player.instaDeath, null, player);
    game.physics.arcade.overlap(player.attackBody, switches, openGate, null, this);
    game.physics.arcade.overlap(hookables, enemies, function(hookable,enemy){if(hookable.projectile){enemy.takeDamage()}}, null, this);
    game.physics.arcade.overlap(enemyBullets,platforms,killBullet,null,this);
    //bullets kill enemy after 500ms of firing
    if(game.time.now > fireTime){
        //console.info('bullet hit enemy');
        
        game.physics.arcade.overlap(aliens, enemyBullets, killAlien)
    };

    //Need to check for overlap with bodies that player collides with and reposition player body appropriately because of how checkTaut() works

    /*for(var i = 0; i < allCollisionBodies.length; i++){
        if(allCollisionBodies[i].getBounds().contains(this.playerBody.body.x, this.playerBody.body.y)){
            console.log(beforeRepositionPlayerX);
            console.log(beforeRepositionPlayerY);
            this.playerBody.body.x = beforeRepositionPlayerX;
            this.playerBody.body.y = beforeRepositionPlayerY;
            this.grappleTaut = false;
        };
        break;
    }*/

    player.redrawReticule(game.input.activePointer.x + gameCamera.x, game.input.activePointer.y + gameCamera.y);
    player.checkAirborne();
    player.repositionHook();
    player.checkAttacking();
    player.invincibilityCountdown();
    //player.grappleCooldown();
    UI.healthBar.displayHealth();
    
    hookables.forEach(function(hookable){
        hookable.rest();
        //console.log("down: " + hookable.body.touching.down);
    });
    
    if(gameKeyboard.a_key.isDown){
        if(player.running){
            player.moveLeft(200);
        } else {
            player.moveLeft(100);
        }
        direction = -1;
    } else if(gameKeyboard.d_key.isDown){
        if(player.running){
            player.moveRight(200);
        } else {
            player.moveRight(100);
        }
        direction = 1;
    } else {
        player.rest();
    }
    

    if(gameKeyboard.space.isDown || gameKeyboard.w_key.isDown){
        if(player.grappleLatched && player.latchedObject == null){
            player.jumpingUnlatchHook(200);
        } else if(player.ledgePoint != null){
            player.jumpingReleaseLedge(200);
        } else{
            player.jump(200);
        }
    }
    
    if(gameKeyboard.w_key.isDown){
        if(player.ledgePoint != null){
            player.climbLedge();
        } 
    }
    
    if(gameKeyboard.shift.isDown){
        player.running = true;
    } else {
        player.running = false;
    }

    if(gameKeyboard.s_key.isDown){
        if(player.grappleLatched){
            player.unlatchHook();
        } else if(player.ledgePoint != null){
            player.releaseLedge();
        } else {
            if(player.grappleOut){
                player.recallHook();
            }
            if(!player.checkAirborne()){
                player.crouch();
            }
        }
    } else {
        player.crouching = false;
    }
    
    hookables.forEach(function(hookable){
        hookable.checkProjectile();
        if(player.calculateProximity(hookable,player.playerBody) < 10){
            if(prompter.currentContent.length == 0){
                var promptString = "Press 'E' to pick up";
                prompter.print(promptString, hookable.body.x + hookable.body.halfWidth - (promptString.length * 7.5) , hookable.y - 30);
                prompter.fadeIn(60);
            }
            
            if(prompter.currentContent.alpha == 1){
                prompter.fadeOut(60);
            }
            
            if(gameKeyboard.e_key.isDown){
                player.pickUpObject(hookable);
            }
        
        } else {
            if(prompter.currentContent.alpha == 1){
                prompter.fadeOut(60);
            } else if(prompter.currentContent.alpha == 0 && prompter.currentContent.length !=0){
                prompter.clear();
            }
        }
    });

    if(game.input.activePointer.rightButton.isDown){
        if(player.grappleLatched){
            player.reelIn();
        } else {
            player.fireHook(game.input.activePointer.x + gameCamera.x, game.input.activePointer.y + gameCamera.y, hookStdVelo);
        }
    } else {
        if(player.grappleLatched){
            player.stopReeling();
        }
    }

    if(game.input.activePointer.leftButton.isDown){
        if(player.carriedObject == null){
            player.attack(game.input.activePointer.x + gameCamera.x, game.input.activePointer.y + gameCamera.y, enemies);
        } else {
            player.throwObject(game.input.activePointer.x + gameCamera.x, game.input.activePointer.y + gameCamera.y, 600);
        }
    }
    
    if (gateOpen == 1) {
        gate.kill();
    }
    
    if (game.time.now > firingTimer){
        fireTime = game.time.now + 500; 
        //console.info("fireTime =" + fireTime)
        enemyFires();
            
    }
    
    //game.physics.arcade.collide(player.playerBody, hookables,function(){hookable.collideWithPlayer()});

   /* if(gameKeyboard.up.isDown){
        player.aimUp(Math.PI/32);
    } else if(gameKeyboard.down.isDown){
        player.aimDown(Math.PI/32);
    }*/

    if(nextRoom != 0) {
        player.reset();
        console.info('room' + nextRoom); //prints current room number to the console; for debugging purposes
        game.state.start('room' + nextRoom);
    }
    
    //Level Skip; comment this out for final build
    if (gameKeyboard.enter.isDown){
        console.info('skip');
        game.state.start(skip);
    }
    
    prompter.updateDisplay();
} ;