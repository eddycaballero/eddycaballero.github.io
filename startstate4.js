var startstate4 = {
    
    create: function(){
        
        gameCamera = game.camera;
        //background
        background = game.add.sprite(0, 0, 'startscreen4');
        background.width = game.width;
        background.height = game.height;
        background.fixedToCamera = true;
        
        
        gameKeyboard = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;
        game.world.setBounds(0, 0, 800, 500);
        
                },
    
    update: function(){
        
        if(game.input.activePointer.leftButton.isDown){
            game.state.start('room5');
        }
},
};