var room6state = { 
            
                create: function() {
                    gameCamera = game.camera;
                    game.world.setBounds(0, 0, 1200, 2400);
                    
                    gameKeyboard = game.input.keyboard.createCursorKeys();
                    gameKeyboard.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    gameKeyboard.w_key = game.input.keyboard.addKey(Phaser.Keyboard.W);
                    gameKeyboard.a_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
                    gameKeyboard.s_key = game.input.keyboard.addKey(Phaser.Keyboard.S);
                    gameKeyboard.d_key = game.input.keyboard.addKey(Phaser.Keyboard.D);
                    gameKeyboard.e_key = game.input.keyboard.addKey(Phaser.Keyboard.E);
                    game.input.mouse.capture = true;
                    game.canvas.oncontextmenu = function (e) { e.preventDefault(); };

                    //background
                    background = game.add.sprite(0, 0, 'background');
                    background.width = game.width;
                    background.height = game.height;
                    background.fixedToCamera = true;

                    //platforms
                    platforms = game.add.group();
                    platforms.enableBody = true;
                    exits = game.add.group();
                    exits.enableBody = true;
                    
                    spikes = game.add.group();
                    spikes.enableBody = true;
                    
                    
                    function createPlatform(x,y,xScale,yScale,hookable){
                        platform = platforms.create(x,y,'platforms');
                        platform.scale.setTo(xScale,yScale);
                        platform.hookable = hookable;
                        platform.body.immovable = true;
                        return platform;
                    }
                    
                    function createPipe(x,y,xScale,yScale,hookable){
                        platform = platforms.create(x,y,'pipe');
                        platform.scale.setTo(xScale,yScale);
                        platform.hookable = hookable;
                        platform.body.immovable = true;
                        return platform;
                    }
                    
                    function createRPipe(x,y,xScale,yScale,hookable){
                        platform = platforms.create(x,y,'right_pipe');
                        platform.scale.setTo(xScale,yScale);
                        platform.hookable = hookable;
                        platform.body.immovable = true;
                        return platform;
                    }
                    
                    function createSpike(x,y){
                        spike = spikes.create(x,y,'spike');
                        
                        spike.body.immovable = true;
                        return spike;
                    }
                    function createRSpike(x,y){
                        spike = spikes.create(x,y,'rspike');
                        
                        spike.body.immovable = true;
                        return spike;
                    }
                    function createDSpike(x,y){
                        spike = spikes.create(x,y,'dspike');
                        
                        spike.body.immovable = true;
                        return spike;
                    }
                    
                    function createExit(x,y,xScale,yScale,roomNumber){
                        exit = exits.create(x,y,'blankspace');
                        exit.scale.setTo(xScale,yScale);
                        exit.body.immovable = true;
                        exit.roomNumber = roomNumber;
                        return exit;
                    }


                    createPlatform(0, game.world.height - 50, 12, 1,true);
                    createPlatform(0, 100,1, 23,true);
                    createPlatform(game.world.width - 100,100,1,20,true);
                    
                    createSpike(68, 68);
                    createSpike(36, 68);
                    createSpike(4, 68);
                    createRSpike(100, 100);
                    createRSpike(100, 132);
                    createRSpike(100, 164);
                    
                    createPipe(100,2100,1,1,true);
                    createRPipe(500,2100,1,1,true);
                    createPipe(600,1750,1,1,true);
                    createPlatform(650,1975,3,.5 ,true);
                    createSpike(650,1943);
                    createSpike(682,1943);
                    
                    createPlatform(100,1550, 3,.5,true);
                    createPlatform(100,1250, 1,.5,true);
                    createSpike(100,1218);
                    createSpike(132,1218);
                    createPlatform(450,1000,3,.5,true);
                    createPipe(700,800, 1,1,true);
                    createPlatform(575,400,.25,3,true);
                    createPlatform(650,550,5,.5,true);
                    createPipe(700,300,1,1,true);
                    createDSpike(700,340);
                    
                    room4Exit = createExit(1120,0, 1, 0.3,4);
                    room5Exit = createExit(0,0, 1, 0.3,5);
                    
                    
                    //enemies
                    enemies = game.add.group();
                    enemies.enableBody = true;
                    enemies.collideWorldBounds = true;

                    for(var i = 0; i < 2; i++){
                        enemy = enemies.create(500+i*150, 100,'enemy');
                        enemy.body.gravity.y = 300;
                        enemy.wanderTimer = 0;
                        enemy.pauseTimer = 0;
                        enemy.takeDamage = function(){
                            this.kill();
                        }
                        enemy.animations.add('left', [0, 1], 10, true);
                        enemy.animations.add('right', [3,4], 10, true);
                        enemy.direction = -1;
                        enemy.wander = function(){

                            if(this.wanderTimer == 0){
                                this.body.velocity.x = 0;
                                this.animations.stop();

                                if(this.direction < 0){
                                    this.frame = 1;
                                } else {
                                    this.frame = 2;
                                }

                                if(this.pauseTimer > 50){
                                    if(Math.random() < 0.1){
                                        this.wanderTimer = 51 + Math.floor(Math.random() * 50);
                                        this.body.velocity.x -= 20;
                                        this.animations.play('left');
                                        this.direction = -1;
                                    } else if(Math.random() > 0.9){
                                        this.wanderTimer = 51 + Math.floor(Math.random() * 50);
                                        this.body.velocity.x += 20;
                                        this.animations.play('right');
                                        this.direction = 1;
                                    }
                                    this.pauseTimer = 0;
                                } else {
                                    this.pauseTimer++;
                                }
                            } else {
                                this.wanderTimer--;
                            }
                        }

                    }

                    line = game.add.graphics(0,0);
                    
                    //player
                    player.playerBody = game.add.sprite(900, 300, 'player',0);
                    game.physics.arcade.enableBody(player.playerBody);
                    player.grappleBody = game.add.sprite(50,100,'grapplingHook',0);
                    game.physics.arcade.enableBody(player.grappleBody);

                    player.reticule = game.add.sprite(player.playerBody.body.x + player.playerBody.body.halfWidth + (50 * Math.sin(player.aimAngle)), player.playerBody.body.y + player.playerBody.body.halfHeight + (50 * Math.cos(player.aimAngle)),'aimingReticule',0);

                    player.playerBody.body.gravity.y = 600;
                    player.grappleBody.body.maxVelocity = 600;
                    player.playerBody.body.collideWorldBounds = true;
                    player.grappleBody.body.collideWorldBounds = true;

                    player.playerBody.animations.add('left', [0], 10, true);
                    player.playerBody.animations.add('right', [1], 10, true);

                    //ui
                    healthText = game.add.text(540, 16, 'health:', { fontSize: '16px', fill: '#000' });
                    healthText.fixedToCamera = true;
                    
                    UI.healthBar.background = game.add.sprite(600, 16, 'healthBar');
                    UI.healthBar.background.fixedToCamera = true;
                    for(var i = 0; i < player.maxHealth/10; i++){
                        UI.healthBar.segments[i] = game.add.sprite(602 + (i * 9), 18, 'healthSegment',0);
                        UI.healthBar.segments[i].fixedToCamera = true;
                    }
                    
                    gameCamera.follow(player.playerBody,Phaser.Camera.FOLLOW_LOCKON,0.5,0.5);
                },

                update: roomUpdate
            };