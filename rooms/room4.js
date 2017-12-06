var room4state = { 
        
    create: function() {
        game.world.setBounds(0,0,1600,1250);
        gateOpen = 0;
        roomCreate('room3');
        
        //--Platforms--
        createWallTileLeft(400, 0, 0.25, 10, true);
        createWallTileRight(800,0,0.25,10,true);
        createWallTileLeft(1200, 200, 0.25, 10, true);
        
        createPlatform(200, 200, 4.25, 0.25, true);
        createPlatform(0,400,2.25,0.25,true);
        createPlatform(600,400,2,0.25,true);
        createPlatform(200,600,4.25,0.25,true);
        createPlatform(0,800,2.25,0.25,true);
        createPlatform(600,800,2,0.25,true);
        createPlatform(200,1000,4.25,0.25,true);
        
        createNakedPlatform(1225,1000,1,0.25,true);
        createNakedPlatform(1350,800,1,0.25,true);
        createNakedPlatform(1475,600,1,0.25,true);
        createNakedPlatform(1350,400,1,0.25,true);
        createNakedPlatform(1225,200,1,0.25,true);
        //-------------
        
        //--Boundaries--
        createFloor(0, game.world.height - 50, 16, 1,true);
        createCeiling(0, 0, 0.5, 0.25, true);
        createCeiling(250, 0, 13.5, 0.25, true);
        createWallTileRight(game.world.width-25,25,0.25,11.75,true);
        createWallTileLeft(0, 25, 0.25, 11.75, true);
                    
        createExit(75,0,1.5,0.15,3);
        createGate(50,0);
        
        createSwitch(433,168);
        
        createPlayer(game.world.width-75, game.world.height-110);
        
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 3; j++) {
                createBot((150+i*200), (100+j*400));
            }
        }
        
        createAliens(1475,200);
        createAliens(1350,600);
        createAliens(1475,1000);
        
        createSlime(1350,700);
        createSlime(1350,300);
                                        
    },

        update: roomUpdate
    };







