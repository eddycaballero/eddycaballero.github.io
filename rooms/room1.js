var room1state = { 
        
    create: function() {
        game.world.setBounds(0, 0, 2500, 1000);
        gateOpen = -1;
        roomCreate('gameWon');   
        
        //--Platforms--
        createFatPlatform(0,450,2, 3,true);
        createNakedPlatform(25,150,1, 0.25,true);
        createPlatform(200,250,3, 0.25,true);
        createPlatform(975,450,15,0.25,true);
        createPlatform(1600,700,5,0.25,true);
        createWallTileLeft(975,450,0.25,2.5,true);
        createWallTileLeft(1450, 650, 0.25, 3.5,true);
        createWallTileLeft(1800, 450, 0.25, 2.5,true);
        createNakedPlatform(700,550,1,0.25,true);
        createPlatform(675,550,3,0.25,true);
        createPlatform(980, 300, 3, 0.25, true);
        createPlatform(1400, 200, 3 , 0.25, true);
        createWallTileLeft(1550, 200, 0.25, 2.5, true);
        createPlatform(1820, 300, 3, 0.25, true);
        createPlatform(200, game.world.height - 300,4,0.25,true);
        //-------------
        
        //--Boundaries--
        createFloor(0, game.world.height - 50, 25, 1,true);
        createCeiling(0,0,.75,0.25,true)
        createCeiling(275,0, 33.5, 0.25,true);
        createWallTileLeft(0,25,0.25,9.25,true);
        createWallTileRight(game.world.width - 25,25,0.25,9.25,true);

        //createHookable(150, game.world.height - 150,0.5,0.5,'platforms',2);

        createExit(100,0,1.5,0.15,10);
        createGate(75,0);
        
        createSwitch(1850,668);
        createSwitch(game.world.width-100, 418);
        
        createPlayer(32,game.world.height-110);
                
        createAliens(300,600);
        createAliens(1200,750);

        for(var i = 0; i < 4; i++){
            createBot(750+i*250, 600);
        }
        
        createSlime(200,400, true);
        createSlime(290,180 , false);
        createSlime(1600,100, false);
        createSlime(1200,100, false);
        createSlime(1900,100, false);

    },

    update: roomUpdate
};
