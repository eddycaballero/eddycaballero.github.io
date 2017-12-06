var startstate = {
    
    create: function(){
        
        gameCamera = game.camera;
        //background
        background = game.add.sprite(0, 0, 'startscreen');
        background.width = game.width;
        background.height = game.height;
        background.fixedToCamera = true;
        
        
        gameKeyboard = game.input.keyboard.createCursorKeys();
        gameKeyboard.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        game.input.mouse.capture = true;
        game.world.setBounds(0, 0, 800, 500);
        
        var music = game.add.audio('song');
        music.play();
        
                },
    
    update: function(){
        player.reset();
        if(game.input.activePointer.leftButton.isDown){
            game.state.start('startstate2');
            /*background = game.add.sprite(0, 0, 'startscreen2');
            background.width = game.width;
            background.height = game.height;
            screen = screen + 1;
            console.info(screen);
            
        
        };
        
        if (screen == 15){
            game.state.start('room1');*/
        };
    }
    
};