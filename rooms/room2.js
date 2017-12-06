var room2state = { 
                create: function() {
                    gateOpen = 0;
                    game.world.setBounds(0, 0, 1600, 900);
                    roomCreate('room4');
                    
                    //--Platforms--
                    createPlatform(25,400,2,0.25,true);
                    createPlatform(775,200,2,0.25,true);
                    createPlatform(1400,625,2,0.25,true);
                    createPlatform(450,400,8,0.25,true);
                    createWallTileLeft(600,400,0.25,5,true);
                    createPlatform(250,650,2,0.25,true);
                    createWallTileLeft(1200, 600, 0.25, 3, true);
                    //-------------
                    
                    //--Boundaries
                    createFloor(0, game.world.height - 50, 16, 1,true);
                    createCeiling(0,0,7.75,0.25,true)
                    createCeiling(975,0,7,0.25,true);
                    createWallTileLeft(0,25,0.25,8.25,true);
                    createWallTileRight(game.world.width - 25,25,0.25,8.25,true);

                    createExit(800,0,1.5,0.15,4);
                    createGate(775,0);
                    
                    createSwitch(50, game.world.height-82);
                    
                    //player
                    createPlayer(800,game.world.height-110);
                    
                    for(var i = 2; i < 7; i++){
                        if (i != 3 && i!= 5) {
                            createBot(300+i*150, 200);
                        }
                    }
                    
                    createSlime(200,400);
                    createSlime(700,100);
                    createSlime(700,700);

                },

                update: roomUpdate
            };
