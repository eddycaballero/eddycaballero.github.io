var player = {
    playerBody:{},
    attackBody:{},
    health: 100,
    maxHealth: 100,
    invincibilityTimer: 0,
    invincibilityFrames: 60,
    attackCooldown: 0,
    attackFrames: 0,
    playerDirection: 1,
    running:false,
    crouching: false,
    knockBack: false,
    originOfShot : {
        x: 0,
        y: 0
    },
    soundFrames:{
        walking: 0,
        jumping: 0
    },

    moveLeft: function(velocity){
        direction = -1;
        if(!objectIsEmpty(this.playerBody)){
            this.playerBody.animations.play('left');
            if(player.invincibilityTimer == 0 && !this.crouching){
                this.playerBody.body.velocity.x = -2*velocity;
            }
            this.playerDirection = -1;
        }
        
        if(!this.checkAirborne() && !this.crouching){
            if(!soundBank.sounds['footsteps_normal_' + (this.soundFrames.walking + 1) % 2].isPlaying){
                soundBank.play('footsteps_normal_' + this.soundFrames.walking);
                this.soundFrames.walking = (this.soundFrames.walking + 1) % 2;
            }
        }
    },

    moveRight: function(velocity){
        direction = 1;
        if(!objectIsEmpty(this.playerBody)){
            this.playerBody.animations.play('right');
            if(player.invincibilityTimer == 0 && !this.crouching){
                this.playerBody.body.velocity.x = 2*velocity;
            }
            this.playerDirection = 1;
        }
        
        if(!this.checkAirborne() && !this.crouching){
            if(!soundBank.sounds['footsteps_normal_' + (this.soundFrames.walking + 1) % 2].isPlaying){
                soundBank.play('footsteps_normal_' + this.soundFrames.walking);
                this.soundFrames.walking = (this.soundFrames.walking + 1) % 2;
            }
        }
    },

    jump: function(velocity){
        //console.info(playerGravity);
        if(!objectIsEmpty(this.playerBody)){
            var playerPullingLatchedObjectUp = false;
            //console.log(this.playerBody.body.touching.down);
            
            if(this.latchedObject != null){
                //console.log(this.calculateProximityY(this.latchedObject,this.playerBody));
                
                if(this.latchedObject.checkCollideWithObject(this.playerBody) == "up"){
                    if(Math.sqrt(Math.pow(this.currentLength,2) - Math.pow(this.latchedObject.body.x + this.latchObjectHookOffsetX - this.playerBody.body.x - this.playerBody.body.halfWidth,2)) < (this.playerBody.body.halfHeight + 5) || this.latchedObject.blockedOnSide.down == false){
                        playerPullingLatchedObjectUp = true;
                    }
                }
            }
            //console.log((!this.checkAirborne()) && (!(playerPullingLatchedObjectUp)));
            
            
            if((!this.checkAirborne()) && (!(playerPullingLatchedObjectUp))){
                if(this.latchedObject != null){
                    console.log(this.latchedObject.blockedOnSide.down);
                }
                this.playerBody.body.velocity.y = -2*velocity;
                 this.soundFrames.jumping = 0;
            } else {
                if(this.playerBody.body.velocity.y < 0){
                    this.playerBody.body.velocity.y -= 6;
                }
            }
            
            if(this.soundFrames.jumping == 0){
                soundBank.play('player_sound_jump');
                this.soundFrames.jumping = 1;
            }
        }
    },
    
    crouch: function(){
        if(game.input.mousePointer.x + gameCamera.x < this.playerBody.body.x + this.playerBody.body.halfWidth){          
            player.playerBody.frame = 26;
        } else {
            //console.info('true');
            player.playerBody.frame = 25;
        };
        this.crouching = true;
        this.playerBody.body.velocity.x = 0;
        
        //console.log(this.playerBody.body.width);
        //console.log(this.playerBody.body.height);
        this.playerBody.body.setSize(200,154,0,150);
    },

    rest: function(){
        this.playerBody.animations.stop();
        if(!this.crouching){
            this.playerBody.body.setSize(200,304,0,0);
        }
        
        this.soundFrames.walking = 0;
        //console.info('mouse x: ' + game.input.mousePointer.x)    ;
        //console.info('player body: ' + this.playerBody.body.x + this.playerBody.body.halfWidth);
        
        if(game.input.mousePointer.x + gameCamera.x < this.playerBody.body.x + this.playerBody.body.halfWidth){
            player.playerBody.frame = 20;
        } else {
            //console.info('true');
            player.playerBody.frame = 21;
        };
        
        if(platform.ledgePoints != undefined){
            var radius;
            
            if(proximity != undefined){
                radius = proximity;
            } else {
                radius = 10;
            }
            
            if(Math.sqrt(Math.pow(this.playerBody.body.x - platform.ledgePoints[i].x,2) + Math.pow(this.playerBody.body.y - platform.ledgePoints[i].y,2)) < radius){
                this.playerBody.frame = 28;
            } else if((Math.sqrt(Math.pow(this.playerBody.body.x + this.playerBody.body.width - platform.ledgePoints[i].x,2) + Math.pow(this.playerBody.body.y - platform.ledgePoints[i].y,2)) < radius)){
                this.playerBody.frame = 27;
            }
                
        }
        
/*        if(this.playerDirection > 0){
              
            player.playerBody.frame = 21;

        } else {

            player.playerBody.frame = 20;
        };*/

        
        if(this.invincibilityTimer == 0 && !this.justUnlatched){
            if(!this.reelingIn){
                this.playerBody.body.velocity.x = 0;
                this.playerBody.animations.stop();
            } else if(this.latchedObject != null){
                this.playerBody.body.velocity.x = 0;
                this.playerBody.animations.stop();         
            }
        }
    },

    attack: function(pointerX, pointerY, enemies){
        if(!objectIsEmpty(this.playerBody)){
            if(this.attackCooldown == 0){
                var posX;

                this.attackFrames = 14;
                this.attackCooldown = 16;
                if(pointerX < this.playerBody.body.x + this.playerBody.body.halfWidth){
                    posX = this.playerBody.body.x - 25;
                } else {
                    posX = this.playerBody.body.x + this.playerBody.body.width;
                }

                this.attackBody = game.add.sprite(posX, this.playerBody.body.y + this.playerBody.body.height - 60, 'slashatt',0);
                this.attackBody.animations.add('slash_right', [7,8,9,10,11,12,13],7,false );
                this.attackBody.animations.add('slash_left', [6,5,4,3,2,1,0],7,false );
                if(pointerX < this.playerBody.body.x + this.playerBody.body.halfWidth){
                    //this.attackBody.play('slash_left');
                    
                    this.attackBody.frame = 0;
                    soundBank.play("attackSound");

                   // player.playerBody.frame = 20;
                    
                } else {
                    //this.attackBody.play('slash_right');
                    this.attackBody.frame = 13;
                    soundBank.play("attackSound");

                    //player.playerBody.frame = 21;
                }

                game.physics.arcade.enableBody(this.attackBody);
                game.physics.arcade.overlap(this.attackBody, enemies, this.attackEnemy, null, this);
                game.physics.arcade.overlap(this.attackBody, slimes, this.attackEnemy, null, this);
                game.physics.arcade.overlap(this.attackBody, aliens, this.attackEnemy, null, this);
                game.physics.arcade.overlap(this.attackBody, enemyBullets, this.attackBullet, null, this);
                
            }
        }
    },

    attackEnemy: function(attack, enemy){
        enemy.takeDamage();
        
    },

    takeDamage: function(player,enemy){
        if(this.invincibilityTimer == 0){
            this.invincibilityTimer = this.invincibilityFrames;
            this.health -= 10;
            this.reeledIn = true;
            this.unlatchHook(50);

            var deltaXPoint;
            var deltaYPoint;

            if(this.playerBody.body.x + this.playerBody.body.halfWidth - enemy.body.x - enemy.body.halfWidth < 0){
                deltaXPoint = this.playerBody.body.x - 10;
            } else {
                deltaXPoint = this.playerBody.body.x + 10;
            }

            deltaYPoint = this.playerBody.body.y - 30;

            /*line.lineStyle(2,0xff0000,1);
            line.moveTo(this.playerBody.body.x + this.playerBody.body.halfWidth, this.playerBody.body.y + this.playerBody.body.halfHeight);
            line.lineTo(deltaXPoint, deltaYPoint);*/

            this.playerBody.body.velocity.x = 0;
            this.playerBody.body.velocity.y = 0;
            game.physics.arcade.moveToXY(this.playerBody,deltaXPoint,deltaYPoint,120,100);
            enemy.body.velocity.x += 80;
            soundBank.play('player_sound_hurt');
        }
    },
    
    takeBulletDamage: function(player,bullet){
        if(this.invincibilityTimer == 0){  
            //this.invincibilityTimer = this.invincibilityFrames;
            this.health -= 10;
            this.reeledIn = true;
            this.unlatchHook(50);
            
            bullet.kill();
            soundBank.play('player_sound_hurt');
        }
    },
    
    attackBullet: function(player,bullet){
        if(this.invincibilityTimer == 0){ 
            //deflects bullets to pointer
            //game.physics.arcade.moveToPointer(enemyBullet, 180);
            game.physics.arcade.moveToObject(enemyBullet, deflectTarget, 180);
            
            //bullet.kill();
            
        }
    },


    checkAttacking: function(){
        if(this.attackCooldown > 0){
            this.attackCooldown -= 1;
        }

        if(!objectIsEmpty(this.attackBody)){
            if(this.attackFrames > 0){
                this.attackFrames -= 1;
            } else {
                player.attackBody.kill();
                player.attackBody = {};
            }
        }
    },

    checkAirborne: function(){
        if(this.playerBody.body.touching.down){
            if(this.justUnlatched){
                this.justUnlatched = false;
            }
            
            return false;
        } else {
            return true;
        }
    },
    
    checkJustUnlatched: function(){
        if(!this.checkAirborne){
             
        } 
    },

    checkAlive: function(){
        if(this.health < 0.1){
            return false;
        }
        return true;
    },

    invincibilityCountdown: function(){
        if(this.invincibilityTimer > 0){
            this.invincibilityTimer -= 1;
        } else {
            this.invincibilityTimer = 0;
        }
    },

    //Properties
    grappleBody:{},
    reticule:{},
    grappleOut: false,
    grappleLatched: false,
    grappleTaut: false,
    grappleFrame: 0,
    reelingIn: false,
    reeledIn: false,
    justUnlatched: false,
    recalling: 0,
    currentLength: 300,
    maxLength: 300,
    reelVelocity: 500,
    cooldownTimer: 0,
    aimAngle: Math.PI/2,
    segments: [],
    connectors: [],
    grappleNetAcceleration: {
        x: 0,
        y: 0
    },
    grappleGravity: {
        x: 0,
        y: 10
    },
    
    latchedPlatform: null,
    
    carriedObject: null,
    latchedObject: null,
    latchObjectHookOffsetX: null,
    latchObjectHookOffsetY: null,
    
    ledgePoint: null,

    //Methods
 /*   aimDown: function(degree){
        if(this.aimAngle > 0){
            this.aimAngle -= degree; 
        } else {
            this.aimAngle = 0;
        }
    },

    aimUp: function(degree){
        if(this.aimAngle < Math.PI){
            this.aimAngle += degree; 
        } else {
            this.aimAngle = Math.PI;
        }
    },*/
    
    pickUpObject: function(carriedObject){
        if(this.latchedObject === carriedObject){
            this.unlatchHook();
        }
        
        var promptString = "Mouse 1 to throw";
        prompter.print(promptString, this.playerBody.body.x + this.playerBody.body.halfWidth - (promptString.length * 7.5), this.playerBody.body.y - 30);
        prompter.fadeOut(120);
        
        this.carriedObject = this.playerBody.addChild(carriedObject);
        this.carriedObject.x = this.playerBody.body.halfWidth - this.carriedObject.body.halfWidth;
        this.carriedObject.y = -this.carriedObject.body.height; 
        this.carriedObject.body.x = this.playerBody.body.halfWidth - this.carriedObject.body.halfWidth;
        this.carriedObject.body.y = -this.carriedObject.body.height; 
        this.carriedObject.body.enable = false;
    },
    
    throwObject: function(targetX, targetY, velocity){
        var xFactor = targetX - (this.playerBody.body.x + this.playerBody.body.halfWidth);
        var yFactor = targetY - (this.playerBody.body.y + this.playerBody.body.halfHeight);
        var directionalMagnitude = Math.sqrt(Math.pow(xFactor,2) + Math.pow(yFactor,2));
        
        if(this.carriedObject != null){
            this.carriedObject.body.enable = true;
            this.carriedObject = hookables.add(this.playerBody.removeChildAt(0));
            
            if(xFactor < 0){
                this.carriedObject.body.x = this.playerBody.body.x - this.carriedObject.body.width - 1;
            } else {
                this.carriedObject.body.x = this.playerBody.body.x + this.playerBody.body.width + 1;
            }
            
            this.carriedObject.body.y = this.playerBody.body.y - this.carriedObject.body.height - 1;
            this.carriedObject.x = this.carriedObject.body.x;
            this.carriedObject.y = this.carriedObject.body.y;
            this.carriedObject.body.velocity.x = velocity * xFactor/directionalMagnitude;
            this.carriedObject.body.velocity.y = velocity * yFactor/directionalMagnitude;
            this.carriedObject.projectile = true;
            this.carriedObject = null;
            this.attackCooldown = 16;
        }
    },
    
    grabLedge: function(player, platform, proximity){
        if(platform.ledgePoints != undefined){
            var radius;
            
            if(proximity != undefined){
                radius = proximity;
            } else {
                radius = 10;
            }
            
            for(var i = 0; i < platform.ledgePoints.length; i++){
                if(!this.grappleOut){
                    if(Math.sqrt(Math.pow(this.playerBody.body.x - platform.ledgePoints[i].x,2) + Math.pow(this.playerBody.body.y - platform.ledgePoints[i].y,2)) < radius){
                        this.ledgePoint = {x: platform.ledgePoints[i].x, y: platform.ledgePoints[i].y, direction: "left", platform: platform};
                        this.playerBody.frame = 28;
                    } else if((Math.sqrt(Math.pow(this.playerBody.body.x + this.playerBody.body.width - platform.ledgePoints[i].x,2) + Math.pow(this.playerBody.body.y - platform.ledgePoints[i].y,2)) < radius)){
                        this.ledgePoint = {x: platform.ledgePoints[i].x, y: platform.ledgePoints[i].y, direction: "right", platform: platform};
                        this.playerBody.frame = 27;
                    }
                }
            }
        }
    },
    
    releaseLedge: function(){
        this.ledgePoint = null;
        this.playerBody.body.velocity.x = this.playerBody.body.deltaX() * 60;
        this.playerBody.body.velocity.y = this.playerBody.body.deltaY() * 60;
    },
    
    jumpingReleaseLedge: function(velocity){
        this.ledgePoint = null;
        this.playerBody.body.velocity.y = -2*velocity;
        soundBank.play('player_sound_jump');
    },
    
    climbLedge: function(){
        this.playerBody.body.velocity.x = this.playerBody.body.deltaX() * 60;
        this.playerBody.body.velocity.y = this.playerBody.body.deltaY() * 60;
        
        if(this.ledgePoint.direction == "left"){
            this.playerBody.body.x = this.ledgePoint.platform.body.x + this.ledgePoint.platform.body.width - this.playerBody.body.halfWidth;
        } else if(this.ledgePoint.direction == "right"){
            this.playerBody.body.x = this.ledgePoint.platform.body.x - this.playerBody.body.halfWidth;
        }
        
        this.playerBody.body.y = this.ledgePoint.platform.body.y - this.playerBody.body.height - 1;
        this.ledgePoint = null;
    },
    
    holdLedge: function(){
        if(this.ledgePoint != null){
            if(this.ledgePoint.direction == "left"){
                this.playerBody.body.x = this.ledgePoint.x;
                this.playerBody.body.y = this.ledgePoint.y;
            } else if (this.ledgePoint.direction == "right"){
                this.playerBody.body.x = this.ledgePoint.x - this.playerBody.body.width;
                this.playerBody.body.y = this.ledgePoint.y;
            }
        }
    },

    fireHook: function(targetX, targetY, velocity){
        //fire hook in target direction until colliding with platform, obstacle or enemy

        var xFactor = targetX - (this.playerBody.body.x + this.playerBody.body.halfWidth);
        var yFactor = targetY - (this.playerBody.body.y + this.playerBody.body.halfHeight);
        var directionalMagnitude = Math.sqrt(Math.pow(xFactor,2) + Math.pow(yFactor,2));

        if(!objectIsEmpty(this.grappleBody)){
            if(!this.grappleOut && !this.grappleLatched && this.ledgePoint == null && this.cooldownTimer == 0){
                this.grappleBody.body.velocity.x = velocity * xFactor/directionalMagnitude;
                this.grappleBody.body.velocity.y = velocity * yFactor/directionalMagnitude;
                this.grappleOut = true;
                this.justTaut = true;
                soundBank.play('hook_shot');
            }
        }
    },
    
    checkPlayerIsReelAnchorX: function(direction){
        if(this.latchedObject != null){
            if(direction < 0 && this.latchedObject.blockedOnSide.left){
                return false;
            } else if(direction > 0 && this.latchedObject.blockedOnSide.right){
                return false;
            } else {
                return true;
            }
        }  
    },
        
    checkPlayerIsReelAnchorY: function(direction){
        if(this.latchedObject != null){
            if(direction < 0 && this.latchedObject.blockedOnSide.up){
                return false;
            } else if(direction > 0 && this.latchedObject.blockedOnSide.down){
                return false;
            } else {
                return true;
            }
        }
    },

    checkTaut: function(){
        var hookDistance;

        if(!objectIsEmpty(this.grappleBody)){
            hookDistance = this.calculateHookDistance();
            //console.log(hookDistance + "," + this.currentLength);

            if(!this.grappleLatched){ 

                if(hookDistance >= this.maxLength){
                    this.grappleTaut = true;
                    this.grappleBody.body.x = this.playerBody.body.x + (this.grappleBody.body.x - this.playerBody.body.x)/this.calculateHookDistance() * this.maxLength;
                    this.grappleBody.body.y = this.playerBody.body.y + (this.grappleBody.body.y - this.playerBody.body.y)/this.calculateHookDistance() * this.maxLength;
                } else {
                    this.grappleTaut = false;
                }
            } else {
                if(hookDistance >= this.currentLength){
                    this.grappleTaut = true;
                    //console.log(hookDistance >= this.currentLength);
                    if(this.latchedObject == null){
                        this.playerBody.body.x = this.grappleBody.body.x + (this.playerBody.body.x - this.grappleBody.body.x)/this.calculateHookDistance() * this.currentLength;
                        this.playerBody.body.y = this.grappleBody.body.y + (this.playerBody.body.y - this.grappleBody.body.y)/this.calculateHookDistance() * this.currentLength;

                        if(this.playerBody.body.velocity.y > 500){
                            this.playerBody.body.velocity.y = 500;
                        }
                    } else {
                        //problem
                        
                        if((this.playerBody.body.x + this.playerBody.body.halfWidth - this.latchedObject.body.x - this.latchObjectHookOffsetX) < 0){
                           if(this.latchedObject.blockedOnSide.left){
                               if(this.latchedObject.checkCollideWithObject(this.playerBody) == "left"){
                                   //this.latchedObject.body.x = this.playerBody.body.x + this.playerBody.body.width;
                               } else {
                                   this.playerBody.body.x = this.latchedObject.body.x + this.latchObjectHookOffsetX + (this.playerBody.body.x - this.latchedObject.body.x - this.latchObjectHookOffsetX)/this.calculateHookDistance() * this.currentLength;
                               }
                           } else {
                               if(this.latchedObject.checkCollideWithObject(this.playerBody) == "up"){
                                   this.playerBody.body.x = this.latchedObject.body.x + this.latchObjectHookOffsetX + (this.playerBody.body.x - this.latchedObject.body.x - this.latchObjectHookOffsetX)/this.calculateHookDistance() * this.currentLength;
                               } else {
                                   this.latchedObject.body.x = this.playerBody.body.x + (this.latchedObject.body.x + this.latchObjectHookOffsetX - this.playerBody.body.x)/this.calculateHookDistance() * (this.currentLength) - this.latchObjectHookOffsetX;
                               }
                           }
                        } else if((this.playerBody.body.x + this.playerBody.body.halfWidth - this.latchedObject.body.x - this.latchObjectHookOffsetX) > 0){
                            if(this.latchedObject.blockedOnSide.right){
                                if(this.latchedObject.checkCollideWithObject(this.playerBody) == "right"){
                                    //this.latchedObject.body.x = this.playerBody.body.x - this.latchedObject.body.width;
                                } else {
                                    this.playerBody.body.x = this.latchedObject.body.x + this.latchObjectHookOffsetX + (this.playerBody.body.x - this.latchedObject.body.x - this.latchObjectHookOffsetX)/this.calculateHookDistance() * this.currentLength;
                                }
                            } else {
                                if(this.latchedObject.checkCollideWithObject(this.playerBody) == "up"){
                                   this.playerBody.body.x = this.latchedObject.body.x + this.latchObjectHookOffsetX + (this.playerBody.body.x - this.latchedObject.body.x - this.latchObjectHookOffsetX)/this.calculateHookDistance() * this.currentLength;
                               } else {
                                   this.latchedObject.body.x = this.playerBody.body.x + (this.latchedObject.body.x + this.latchObjectHookOffsetX - this.playerBody.body.x)/this.calculateHookDistance() * (this.currentLength) - this.latchObjectHookOffsetX;
                               }
                            }
                        }
                        
                        if((this.playerBody.body.y + this.playerBody.body.halfHeight - this.latchedObject.body.y - this.latchObjectHookOffsetY) < 0){
                            if(this.latchedObject.blockedOnSide.up){
                                if(this.latchedObject.checkCollideWithObject(this.playerBody) != "up"){
                                    this.playerBody.body.y = this.latchedObject.body.y + this.latchObjectHookOffsetY + (this.playerBody.body.y - this.latchedObject.body.y - this.latchObjectHookOffsetY)/this.calculateHookDistance() * this.currentLength;
                                }
                            } else {
                                this.latchedObject.body.y = this.playerBody.body.y + (this.latchedObject.body.y + this.latchObjectHookOffsetY - this.playerBody.body.y)/this.calculateHookDistance() * (this.currentLength) - this.latchObjectHookOffsetY;
                            }
                        } else if((this.playerBody.body.y + this.playerBody.body.halfHeight - this.latchedObject.body.y - this.latchObjectHookOffsetY) > 0){
                            if(this.latchedObject.blockedOnSide.down){
                                if(this.latchedObject.checkCollideWithObject(this.playerBody) == "down"){
                                    //this.latchedObject.body.y = this.playerBody.body.y - this.latchedObject.body.height;
                                } else {
                                    this.playerBody.body.y = this.latchedObject.body.y + this.latchObjectHookOffsetY + (this.playerBody.body.y - this.latchedObject.body.y - this.latchObjectHookOffsetY)/this.calculateHookDistance() * this.currentLength;
                                }
                            } else {
                                this.latchedObject.body.y = this.playerBody.body.y + (this.latchedObject.body.y + this.latchObjectHookOffsetY - this.playerBody.body.y)/this.calculateHookDistance() * (this.currentLength) - this.latchObjectHookOffsetY;
                            }
                        }
                        
                        if(this.playerBody.body.velocity.y > 500){
                            this.playerBody.body.velocity.y = 500;
                        }
                        
                        if(this.latchedObject.body.velocity.y > 500){
                            this.latchedObject.body.velocity.y = 500;
                        }
                        
                       /* if(this.latchedObject.checkCollideWithObject(this.playerBody) == "up"){
                            this.latchedObject.body.y = this.playerBody.body.y + this.playerBody.body.height;
                        } else if(this.latchedObject.checkCollideWithObject(this.playerBody) == "down"){
                            this.latchedObject.body.y = this.playerBody.body.y - this.latchedObject.body.height;
                        } else {
                            this.latchedObject.body.y = this.playerBody.body.y + (this.latchedObject.body.y + this.latchObjectHookOffsetY - this.playerBody.body.y)/this.calculateHookDistance() * (this.currentLength) - this.latchObjectHookOffsetY;
                        }*/
                    }
                } else {
                    this.grappleTaut = false;
                }
            }
        }
    },

    calculateHookDistance: function(){
        var distance = Math.sqrt(Math.pow(this.playerBody.body.x + this.playerBody.body.halfWidth - this.grappleBody.body.x - this.grappleBody.body.halfWidth,2) + Math.pow(this.playerBody.body.y + this.playerBody.body.halfHeight - this.grappleBody.body.y - this.grappleBody.body.halfHeight,2));

        return distance;
    },

    calculateDistance: function(obj1,obj2){
        var distance = Math.sqrt(Math.pow(obj1.body.x + obj1.body.halfWidth - obj2.body.x - obj2.body.halfWidth,2) + Math.pow(obj1.body.y + obj1.body.halfHeight - obj2.body.y - obj2.body.halfHeight,2));

        return distance;
    },
    
    calculateProximity: function(obj1,obj2){
        var proximityX = 0;
        var proximityY = 0;
        
        if(obj1.body.x > obj2.body.x + obj2.body.width){
            proximityX = obj1.body.x - obj2.body.x - obj2.body.width;
        } else if(obj2.body.x > obj1.body.x + obj1.body.width){
            proximityX = obj2.body.x - obj1.body.x - obj1.body.width;
        }
        
        if(obj1.body.y > obj2.body.y + obj2.body.height){
            proximityY = obj1.body.y - obj2.body.y - obj2.body.height;
        } else if(obj2.body.y > obj1.body.y + obj1.body.height){
            proximityY = obj2.body.y - obj1.body.y - obj1.body.height;
        }
        
        return Math.sqrt(Math.pow(proximityX,2) + Math.pow(proximityY,2));
    },
    
    calculateProximityX: function(obj1,obj2){
        var proximityX = 0;
        
        if(obj1.body.x > obj2.body.x + obj2.body.width){
            proximityX = -(obj1.body.x - obj2.body.x - obj2.body.width);
        } else if(obj2.body.x > obj1.body.x + obj1.body.width){
            proximityX = obj2.body.x - obj1.body.x - obj1.body.width;
        }
        
        return proximityX;
    },
    
    calculateProximityY: function(obj1,obj2){
        var proximityY = 0;
        
        if(obj1.body.y > obj2.body.y + obj2.body.height){
            proximityY = -(obj1.body.y - obj2.body.y - obj2.body.height);
        } else if(obj2.body.y > obj1.body.y + obj1.body.height){
            proximityY = obj2.body.y - obj1.body.y - obj1.body.height;
        }
        
        return proximityY;
    },

    reelIn: function(){
        //increase player acceleration toward hook until maximum velocity is achieved

        if(!objectIsEmpty(this.grappleBody)){
            if(this.latchedObject != null){
                
                if(this.calculateProximity(this.latchedObject,this.playerBody) > this.reelVelocity/45) {
                    if(!this.checkPlayerIsReelAnchorX(this.playerBody.body.x + this.playerBody.body.halfWidth - this.latchedObject.body.x -this.latchedObject.body.halfWidth)){
                        this.playerBody.body.velocity.x = -(this.playerBody.body.x + this.playerBody.body.halfWidth - this.latchedObject.body.x - this.latchedObject.body.halfWidth)/this.calculateDistance(this.latchedObject,this.playerBody) * this.reelVelocity;
                    } else {
                        this.latchedObject.body.velocity.x = (this.playerBody.body.x + this.playerBody.body.halfWidth - this.latchedObject.body.x -this.latchedObject.body.halfWidth)/this.calculateDistance(this.latchedObject,this.playerBody) * this.reelVelocity;
                    }
                    
                    
                    if(!this.checkPlayerIsReelAnchorY(this.playerBody.body.y + this.playerBody.body.halfHeight - this.latchedObject.body.y - this.latchedObject.body.halfHeight)){
                        this.playerBody.body.velocity.y = -(this.playerBody.body.y + this.playerBody.body.halfHeight - this.latchedObject.body.y - this.latchedObject.body.halfHeight)/this.calculateDistance(this.latchedObject,this.playerBody) * this.reelVelocity;
                    } else if(this.latchedObject.checkCollideWithObject(this.playerBody) != "up"){
                        this.latchedObject.body.velocity.y = (this.playerBody.body.y + this.playerBody.body.halfHeight - this.latchedObject.body.y - this.latchedObject.body.halfHeight)/this.calculateDistance(this.latchedObject,this.playerBody) * this.reelVelocity;
                    }
                } else {
                    this.latchedObject.body.velocity.x = 0;
                    this.latchedObject.body.velocity.y = 0;
                }
                
                this.currentLength = Math.sqrt(Math.pow(this.playerBody.body.x + this.playerBody.body.halfWidth - this.latchedObject.body.x - this.latchObjectHookOffsetX - this.grappleBody.body.halfWidth,2) + Math.pow(this.playerBody.body.y + this.playerBody.body.halfHeight - this.latchedObject.body.y - this.latchObjectHookOffsetY - this.grappleBody.body.halfHeight,2));
                this.reelingIn = true;
            } else if(!objectIsEmpty(this.playerBody)){
                if(this.grappleOut && this.grappleLatched){
                    this.playerBody.body.velocity.x = (this.grappleBody.body.x - this.playerBody.body.x -this.playerBody.body.halfWidth)/this.calculateHookDistance() * this.reelVelocity;

                    this.playerBody.body.velocity.y = (this.grappleBody.body.y - this.playerBody.body.y - this.playerBody.body.halfHeight)/this.calculateHookDistance() * this.reelVelocity;

                    if(this.playerBody.body.deltaAbsX() < 1 && this.playerBody.body.deltaAbsY() < 1){
                        this.reeledIn = true;
                    } 

                    this.currentLength = this.calculateHookDistance();
                    this.reelingIn = true;
                }  /*else {
                    this.grappleBody.body.velocity.x =(this.playerBody.body.x - this.grappleBody.body.x - this.playerBody.body.halfWidth)/this.calculateHookDistance() * this.reelVelocity;
                }*/
            }
        }
    },

    stopReeling: function(){
        if(this.grappleOut) {
                if(this.grappleLatched){
                    if(this.reelingIn){
                        if(this.latchedObject == null){
                            this.playerBody.body.velocity.x = 0;
                            this.playerBody.body.velocity.y = 0;
                        } else {
                            this.latchedObject.body.velocity.x = 0;
                            this.latchedObject.body.velocity.y = 0;
                        }
                        this.reelingIn = false;
                    }
                }
        }
    },
    
    recallHook: function(){
        if(this.grappleTaut && this.recalling <= 0){
            this.reelingIn = false;
            this.reeledIn = false;
            this.grappleLatched = false;
            this.currentLength = this.maxLength;
            this.recalling = 10;
            soundBank.play('hook_release');
            //this.cooldownTimer = 60;
        }
    },

    /*grappleCooldown: function(){
        if(this.cooldownTimer > 0){
            this.cooldownTimer--;
        } else {
            this.cooldownTimer = 0;
        }
    },*/

    latchHook: function(hook, platform){
        //hook latches onto a platform or object and begins to pull in player

        if(this.grappleOut && this.recalling <= 0){
            if(platform.hookable !== undefined && platform.hookable == true){
                this.grappleLatched = true;
                this.latchedPlatform = platform;
                this.grappleBody.body.velocity.x = 0;
                this.grappleBody.body.velocity.y = 0;
                soundBank.play('hook_latch');
            } else {
                this.bounceHook();
            }
        }
    },
    
    latchToObject: function(hook, latchObject){
        if(this.grappleOut && !this.grappleLatched &&this.recalling <= 0){
            this.latchedObject = latchObject;
            if(this.latchObjectHookOffsetX == null){
                this.latchObjectHookOffsetX = this.grappleBody.body.x - this.latchedObject.body.x;
            }
            
            if(this.latchObjectHookOffsetY == null){
                this.latchObjectHookOffsetY = this.grappleBody.body.y - this.latchedObject.body.y;
            }
            
            this.grappleLatched = true;
            this.grappleBody.body.velocity.x = 0;
            this.grappleBody.body.velocity.y = 0;
        }
    },
    
    bounceHook: function(){
        var reflectX = 1;
        var reflectY = 1;
        
        if(this.grappleBody.body.touching.up || this.grappleBody.body.touching.down){
            reflectY = -1;
        }
        
        if(this.grappleBody.body.touching.left || this.grappleBody.body.touching.right){
            reflectX = -1;
        }
        
        this.grappleBody.body.velocity.x = this.grappleBody.body.deltaX() * 60 * reflectX * 0.1;
        this.grappleBody.body.velocity.y = this.grappleBody.body.deltaY() * 60 * reflectY * 0.1;
    },

    unlatchHook: function(){
        //stops hook

        if(this.grappleLatched && this.recalling <= 0){
            //var detachSpeed = this.reelVelocity * 0.75;
            
            /*if(this.playerBody.body.deltaAbsX() < 1 && this.playerBody.body.deltaAbsY() < 1){
                detachSpeed = 1
            } */
            this.reelingIn = false;
            this.reeledIn = false;
            this.grappleLatched = false;
            this.justUnlatched = true;
            this.currentLength = this.maxLength;
            this.recalling = 10;
            
            /*this.playerBody.body.velocity.x = this.playerBody.body.deltaX()/Math.hypot(this.playerBody.body.deltaX(), this.playerBody.body.deltaY()) * detachSpeed;
            this.playerBody.body.velocity.y = this.playerBody.body.deltaY()/Math.hypot(this.playerBody.body.deltaX(), this.playerBody.body.deltaY()) * detachSpeed;*/
            
            if(this.latchedObject == null){
                this.playerBody.body.velocity.x = this.playerBody.body.deltaX() * 60;
                this.playerBody.body.velocity.y = this.playerBody.body.deltaY() * 60;
                this.grabLedge(this, this.latchedPlatform);
                this.latchedPlatform = null;
            } else {
                this.latchedObject = null;
                this.latchObjectHookOffsetX = null;
                this.latchObjectHookOffsetY = null;
                this.playerBody.body.velocity.x = this.playerBody.body.deltaX() * 60;
                this.playerBody.body.velocity.y = this.playerBody.body.deltaY() * 60;
            }
            
            
            //this.cooldownTimer = 60;
        }
    },
    
    jumpingUnlatchHook: function(velocity){
        //stops hook and jumps
        if(this.grappleLatched && this.recalling <= 0 && (this.playerBody.body.y > this.grappleBody.body.y || this.playerBody.body.velocity.y == 0)){
            this.reelingIn = false;
            this.reeledIn = false;
            this.grappleLatched = false;
            //this.justUnlatched = true;
            this.currentLength = this.maxLength;
            this.recalling = 10;
            //this.cooldownTimer = 60;
            this.playerBody.body.velocity.y = -2*velocity;
            soundBank.play('player_sound_jump');
        }
    },

    redrawReticule: function(pointerX, pointerY){
        if(!objectIsEmpty(this.reticule)){
            var addX = (pointerX - this.playerBody.body.x - this.playerBody.body.halfWidth)/Math.sqrt(Math.pow(pointerX - this.playerBody.body.x - this.playerBody.body.halfWidth,2) + Math.pow(pointerY - this.playerBody.body.y - this.playerBody.body.halfHeight,2)) * Math.min(Math.sqrt(Math.pow(pointerX - this.playerBody.body.x - this.playerBody.body.halfWidth,2) + Math.pow(pointerY - this.playerBody.body.y - this.playerBody.body.halfHeight,2)), this.maxLength);
            var addY = (pointerY - this.playerBody.body.y - this.playerBody.body.halfHeight)/Math.sqrt(Math.pow(pointerX - this.playerBody.body.x - this.playerBody.body.halfWidth,2) + Math.pow(pointerY - this.playerBody.body.y - this.playerBody.body.halfHeight,2)) * Math.min(Math.sqrt(Math.pow(pointerX - this.playerBody.body.x - this.playerBody.body.halfWidth,2) + Math.pow(pointerY - this.playerBody.body.y - this.playerBody.body.halfHeight,2)), this.maxLength);
            
            this.reticule.x = this.playerBody.body.x + this.playerBody.body.halfWidth + addX - 5;
            this.reticule.y = this.playerBody.body.y + this.playerBody.body.halfHeight + addY - 5;
        }
    },

    repositionHook: function(){
        var tension;

        if(!objectIsEmpty(this.grappleBody)){

            if(!this.grappleOut){
                this.grappleBody.body.x = this.playerBody.body.x + this.playerBody.body.halfWidth;
                this.grappleBody.body.y = this.playerBody.body.y + this.playerBody.body.halfHeight;
                
                for(var i = 0; i < this.segments.length; i++){
                    this.segments[i].visible = false;
                }
            } else {
                if(!this.grappleLatched){
                    if(this.recalling > 1){
                        this.grappleBody.body.x += (this.playerBody.body.x - this.grappleBody.body.x)/this.recalling;
                        this.grappleBody.body.y += (this.playerBody.body.y - this.grappleBody.body.y)/this.recalling;
                        this.recalling -= 1;
                    } else if (this.recalling == 1){
                        this.grappleOut = false;
                        this.recalling = 0;
                    } else {
                        if(!this.grappleTaut){
                            this.grappleNetAcceleration = this.grappleGravity;
                        } else {
                            tension = {
                                x: (this.playerBody.body.x - this.grappleBody.body.x)/this.calculateHookDistance() * this.grappleGravity.y,
                                y: (this.playerBody.body.y - this.grappleBody.body.y)/this.calculateHookDistance() * this.grappleGravity.y
                            };

                            this.grappleNetAcceleration = this.addVectors([this.grappleGravity,tension]);
                            
                            if(this.justTaut){
                                //this.grappleBody.body.velocity.x = 0;
                                this.grappleBody.body.velocity.y = 0;
                                this.justTaut = false;
                            }
                        }

                        this.grappleBody.body.velocity.x += this.grappleNetAcceleration.x;
                        this.grappleBody.body.velocity.y += this.grappleNetAcceleration.y;

                        //Resistance to slow hook
                        /*if(Math.abs(this.grappleBody.body.velocity.x) > 0.1){
                            if(this.grappleBody.body.velocity.x < 0){
                                this.grappleBody.body.velocity.x += Math.min(Math.abs(this.grappleBody.body.velocity.x)/10, 1);
                            } else {
                                this.grappleBody.body.velocity.x -= Math.min(Math.abs(this.grappleBody.body.velocity.x)/10, 1);
                            }
                        } else {
                            this.grappleBody.body.velocity.x = 0;
                        }

                        if(Math.abs(this.grappleBody.body.velocity.y) > 0.1){
                            if(this.grappleBody.body.velocity.y < 0){
                                this.grappleBody.body.velocity.y += Math.min(Math.abs(this.grappleBody.body.velocity.y)/10, 2);
                            } else {
                                this.grappleBody.body.velocity.y -= Math.min(Math.abs(this.grappleBody.body.velocity.y)/10, 2);
                            }
                        } else {
                            this.grappleBody.body.velocity.y = 0;
                        }*/
                    }
                } else {
                    if(this.latchedObject != null){
                        this.grappleBody.body.x = this.latchedObject.body.x + this.latchObjectHookOffsetX;
                        this.grappleBody.body.y = this.latchedObject.body.y + this.latchObjectHookOffsetY;
                    }
                }
                
                var stretch = 0;
                var hookRatioX = (this.grappleBody.body.center.x - (this.playerBody.body.x + this.playerBody.body.halfWidth))/this.calculateHookDistance();
                var hookRatioY = (this.grappleBody.body.center.y - (this.playerBody.body.y + this.playerBody.body.halfHeight))/this.calculateHookDistance();
                
                if(this.calculateHookDistance() < 140){
                    stretch = 0;
                } else {
                    stretch = (this.calculateHookDistance() - 140)/20;
                }
                
                for(var i = 0; i < this.segments.length; i++){
                    if(this.calculateHookDistance() > i * 7){
                        if(this.calculateHookDistance() < 140){
                            this.segments[i].x = this.playerBody.body.x + this.playerBody.body.halfWidth + hookRatioX * (Math.ceil(this.calculateHookDistance()/7) - i) * 7;
                            this.segments[i].y = this.playerBody.body.y + this.playerBody.body.halfHeight + hookRatioY * (Math.ceil(this.calculateHookDistance()/7) - i) * 7;
                        } else {
                            this.segments[i].x = this.playerBody.body.x + this.playerBody.body.halfWidth + hookRatioX * (20 - i) * (7 + stretch);
                            this.segments[i].y = this.playerBody.body.y + this.playerBody.body.halfHeight + hookRatioY * (20 - i) * (7 + stretch);
                        }
                        this.segments[i].angle = Math.sin((this.grappleBody.body.center.x - this.playerBody.body.center.x)/this.calculateHookDistance()) * (180 / Math.PI) + 90;
                        this.segments[i].visible = true;
                    } else {
                        this.segments[i].x = this.playerBody.body.x + this.playerBody.body.halfWidth;
                        this.segments[i].y = this.playerBody.body.y + this.playerBody.body.halfHeight;
                        this.segments[i].visible = false;
                    }
                }

                /*line.lineStyle(2,0x000000,1);
                line.moveTo(this.playerBody.body.x + this.playerBody.body.halfWidth, this.playerBody.body.y + this.playerBody.body.halfHeight);
                line.lineTo(this.grappleBody.body.x + this.grappleBody.body.halfWidth, this.grappleBody.body.y + this.grappleBody.body.halfHeight);*/
            }
        }
    },

    reset: function(){
        this.playerBody={};
        this.attackBody={};
        this.latchedObject = null;
        this.invincibilityTimer= 0;
        this.invincibilityFrames= 40;
        this.attackCooldown= 0;
        this.attackFrames= 0;
        this.playerDirection= 1;
        this.grappleBody={};
        this.reticule={};
        this.grappleOut= false;
        this.grappleLatched = false;
        this.justUnlatched = false;
        this.grappleTaut= false;
        this.justTaut = false;
        this.recalling = 0;
        this.currentLength = 300;
        this.grappleFrame= 0;
        this.reelingIn= false;
        this.reeledIn= false;
        this.maxLength= 250;
        this.reelVelocity= 500;
        this.cooldownTimer= 0;
        this.grappleNetAcceleration= {
            x: 0,
            y: 0
        }; 
        this.grappleGravity= {
            x: 0,
            y: 5
        };
    },

    addVectors(vectors){
        var returnVector = {
            x: 0,
            y: 0
        };

        for(var i = 0; i < vectors.length; i++){
            returnVector.x += vectors[i].x;
            returnVector.y += vectors[i].y;
        }

        return returnVector;
    }
}


function createPlayer(x,y){
    player.playerBody = game.add.sprite(x, y, 'player',0);
    middleground.add(player.playerBody);
    player.playerBody.scale.setTo(.2,.2);
    game.physics.arcade.enableBody(player.playerBody);
        
    for(var i = 0; i < 20; i++){
        player.segments[i] = game.add.sprite(player.playerBody.body.center.x, player.playerBody.body.center.y, 'armSegment', 0);
        player.segments[i].visible = false;
        player.segments[i].anchor.setTo(0.5, 0.5);
        player.connectors[i] = game.add.sprite(player.playerBody.body.center.x, player.playerBody.body.center.y, 'armConnector', 0);
        player.connectors[i].visible = false;
        player.connectors[i].anchor.setTo(0.5,0);
    }

    player.grappleBody = game.add.sprite(50,100,'grapplingHook',0);
    game.physics.arcade.enableBody(player.grappleBody);

    player.reticule = game.add.sprite(player.playerBody.body.x + player.playerBody.body.halfWidth + (50 * Math.sin(player.aimAngle)), player.playerBody.body.y + player.playerBody.body.halfHeight + (50 * Math.cos(player.aimAngle)),'aimingReticule',0);

    player.playerBody.body.gravity.y = playerGravity;
    player.grappleBody.body.maxVelocity = playerMaxVelocity;
    player.playerBody.body.collideWorldBounds = true;
    player.grappleBody.body.collideWorldBounds = true;

    player.playerBody.animations.add('left', [0,1,2,3,4,5,6,7,8,9], 15, true);
    player.playerBody.animations.add('right', [10,11,12,13,14,15,16,17,18,19], 15, true);

    //player.playerBody.animations.add('attackLeft',[22],15,true);
    //player.playerBody.animations.add('attackRight',[23],15,true);

    gameCamera.follow(player.playerBody,Phaser.Camera.FOLLOW_LOCKON,0.5,0.5);

}