var room5state = { 

    create: function() {
        game.world.setBounds(0,0,1200,600);
        gateOpen = 0;
        roomCreate('room2');
        
        //--Platforms--
        createPlatform(25,275,10,0.25,true);
        createFatPlatform(500,game.world.height-150,2,1,true);
        createPlatform(500,150,2,0.25,true);
        createPlatform(25,150,2,0.25,true);
        
        //--Boundaries--
        createCeiling(0,0,0.5,0.25,true);
        createCeiling(250,0,9.5,0.25,true);
        createFloor(0,game.world.height-50,12,1,true);
        createWallTileLeft(0,25,0.25,5.25,true);
        createWallTileRight(game.world.width-25,25,0.25,5.25,true);
        
        //--Exit--
        createExit(75,0,1.5,0.15,2);
        createGate(50,0);
        createSwitch(30,118);
        
        createPlayer(50,game.world.height-150);
        
        createBot(300, game.world.height-150);
        
        createSlime(550,game.world.height-250);
        
        createAliens(600,225);
    },

    update: roomUpdate
};