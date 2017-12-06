var room3state = { 

                create: function() {
                    gateOpen = -1;
                    game.world.setBounds(0, 0, 1500, 1100);
                    roomCreate('room1');
                    
                    //--Platforms--
                    createPlatform(800,300,2,.25,true);
                    createPlatform(350,550,2,0.25,true);
                    createPlatform(25,800,2,0.25,true);
                    createWallTileLeft(700,700,0.25,4,true);
                    createNakedPlatform(725, 875, 1, 0.25, true);
                    createPlatform(1200, 500, 2, 0.25, true);
                    //-------------
                    
                    //--Boundaries--
                    createFloor(0, game.world.height - 50, 15, 1,true);
                    createCeiling(0,0,8.25,0.25,true);
                    createCeiling(1025,0,4.75,0.25,true);
                    createWallTileLeft(0,25,0.25,10.25,true);
                    createWallTileRight(game.world.width - 25,25,0.25,10.25,true);
                    
                    createExit(850,0,1.5,0.15,1);
                    createGate(825,0);
                    
                    createSwitch(1300,468);
                    createSwitch(75, game.world.height-82);
                    
                    createPlayer(game.world.width-50,game.world.height-150);
              
                    createAliens(400, 400);
                    createAliens(1250,800);
                    
                    createSlime(25,725);

                    for(var i = 0; i < 7; i++){
                        createBot(300+i*225, 100,'enemy');
                    }                    
                },

                update: roomUpdate
            };