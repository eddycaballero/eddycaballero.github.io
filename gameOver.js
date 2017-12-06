var loseState = { 
                create: function(){
                    game.input.mouse.capture = true;
                    game.world.setBounds(0, 0, 800, 500);
                    background = game.add.sprite(0, 0, 'gamelose');
                    background.width = game.width;
                    background.height = game.height;
                },
            
    update: function(){
        player.reset();
        if (game.input.activePointer.leftButton.isDown) {
            player.health = 100;
            spawnFrom = 0;
            game.state.start('room5');
        }
    }
            };