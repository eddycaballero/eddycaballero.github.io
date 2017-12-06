function roomCreate(next){
    /* --- ART LAYERS --- */
    //middleground -> layer of action (z = 0)
    //background1 -> immediate background layer after middleground (z = -1)
    //background2 -> extreme background layer (z = -2)
    //foreground1 -> immediate foreground layer before middleground (z = 1)
    //foreground2 -> extreme foreground layer (z = 2)
    background2 = game.add.group();
    background1 = game.add.group();
    middleground = game.add.group();
    foreground1 = game.add.group();
    foreground2 = game.add.group();
    skip = next;
    console.info(skip);
    
    /* --- UI ELEMENTS --- */
    gameCamera = game.camera;
    //game.world.setBounds(0, 0, 2500, 1000);

    gameKeyboard = game.input.keyboard.createCursorKeys();
    gameKeyboard.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    gameKeyboard.shift = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    gameKeyboard.w_key = game.input.keyboard.addKey(Phaser.Keyboard.W);
    gameKeyboard.a_key = game.input.keyboard.addKey(Phaser.Keyboard.A);
    gameKeyboard.s_key = game.input.keyboard.addKey(Phaser.Keyboard.S);
    gameKeyboard.d_key = game.input.keyboard.addKey(Phaser.Keyboard.D);
    gameKeyboard.e_key = game.input.keyboard.addKey(Phaser.Keyboard.E);
    gameKeyboard.enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    game.input.mouse.capture = true;
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
    
    prompter.currentContent = game.add.group();
    
    //background
    background = game.add.sprite(0, 0, 'background');
    background2.add(background);
    background.width = game.width;
    background.height = game.height;
    background.fixedToCamera = true;
    
    /* --- GAME ENTITIES(Objects on the action layer) --- */
    //platforms
    platforms = game.add.group();
    middleground.add(platforms);
    platforms.enableBody = true;
    
    //tiles
    tiles = game.add.group();
    foreground1.add(tiles);
    tiles.enableBody = true;

    //hookableobjects
    hookables = game.add.group();
    middleground.add(hookables);
    hookables.enableBody = true;
    hookables.collideWorldBounds = true;

    //exits
    exits = game.add.group();
    middleground.add(exits);
    exits.enableBody = true;

    //spikes
    spikes = game.add.group();
    middleground.add(spikes);
    spikes.enableBody = true;
    
    //slimes
    slimes = game.add.group();
    middleground.add(slimes);
    slimes.enableBody = true;
    slimes.collideWorldBounds = true
    
    //enemies
    enemies = game.add.group();
    middleground.add(enemies);
    enemies.enableBody = true;
    enemies.collideWorldBounds = true;
    enemyPositions = [{}]
    
    // The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(30, 'enemyBullet');
    
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', .1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);
    enemyBullets.takeDamage = function(){
            enemyBullets.kill();
    };
    //HoverBots
    aliens = game.add.group();
    middleground.add(aliens);
    aliens.enableBody = true;
    aliens.physicsBodyType = Phaser.Physics.ARCADE;
    
    gates = game.add.group();
    gates.enableBody = true;

    switches = game.add.group();
    middleground.add(switches);
    switches.enableBody = true;    

    healthText = game.add.text(540, 16, 'health:', { fontSize: '16px', fill: '#000' });
    healthText.fixedToCamera = true;

    UI.healthBar.background = game.add.sprite(600, 16, 'healthBar');
    UI.healthBar.background.fixedToCamera = true;
    for(var i = 0; i < player.maxHealth/10; i++){
        UI.healthBar.segments[i] = game.add.sprite(602 + (i * 9), 18, 'healthSegment',0);
        UI.healthBar.segments[i].fixedToCamera = true;
    }
    
}