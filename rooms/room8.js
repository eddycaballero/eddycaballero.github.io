var room8state = { 

                create: function() {
                    gameCamera = game.camera;
                    game.world.setBounds(0, 0, 1800, 500);
                    
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
                    game.add.sprite(0, 0, 'background');
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

                    var ground = platforms.create(0, game.world.height - 50, 'platforms');
                    ground.scale.setTo(36, 1);
                    ground.body.immovable = true;
                    
                    var ceiling = platforms.create(0, 0, 'platforms');
                    ceiling.scale.setTo(36, 0.25);
                    ceiling.body.immovable = true;
                    
                    var wall = platforms.create(0,0,'platforms');
                    wall.scale.setTo(0.25,10);
                    wall.body.immovable = true;
                    
                    wall = platforms.create(1700,0,'platforms');
                    wall.scale.setTo(0.25,10);
                    wall.body.immovable = true;

                    wall = platforms.create(900, 0, 'platforms');
                    wall.scale.setTo(0.25, 10);
                    wall.body.immovable = true;

                    goal = game.add.sprite(50,game.world.height-75,'flag');
                    game.physics.arcade.enableBody(goal);
                    
                    goal = game.add.sprite(1675,game.world.height-75,'flag');
                    game.physics.arcade.enableBody(goal);
                    
                    
                    //enemies
                    enemies = game.add.group();
                    enemies.enableBody = true;
                    enemies.collideWorldBounds = true;

                    for(var i = 0; i < 2; i++){
                        enemy = enemies.create(1100+i*150, game.world.height - 100,'enemy');
                        enemy.body.gravity.y = 300;
                        enemy.wanderTimer = 0;
                        enemy.pauseTimer = 0;
                        enemy.takeDamage = function(){
                            this.kill();
                        }
                        enemy.animations.add('left', [0, 1], 10, true);
                        enemy.animations.add('right', [2,3], 10, true);
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
                    player.playerBody = game.add.sprite(1625, 100, 'player',0);
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
                    gameCamera.follow(player.playerBody,Phaser.Camera.FOLLOW_LOCKON,0.5,0.5);
                },

                update: roomUpdate
            };