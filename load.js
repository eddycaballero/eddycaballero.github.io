var loadState = {
    preload: function () {
        
        game.load.image('background','./assets/img/bg_01.png');
        game.load.image('startscreen','./assets/img/gamestart.png');
        game.load.image('startscreen2','./assets/img/gamestart2.png');
        game.load.image('startscreen3','./assets/img/gamestart3.png');
        game.load.image('startscreen4','./assets/img/gamestart4.png');
        game.load.image('gamelose','./assets/img/gamelose.png');
        game.load.image('gamewin','./assets/img/gamewin.png');
        game.load.image('platforms','./assets/img/platform.png');
        game.load.image('pipe','./assets/img/pipe.png');
        game.load.image('right_pipe','./assets/img/right_pipe.png');
        game.load.image('dspike','./assets/img/dspike.png');
        game.load.image('rspike','./assets/img/rspike.png');
        game.load.image('spike','./assets/img/spike.png');
        game.load.image('aimingReticule','./assets/sprites/reticule.png');
        game.load.spritesheet('player2','./assets/sprites/dude.png', 32, 48);
        game.load.spritesheet('grapplingHook','./assets/sprites/grapple.png',11,12);
        game.load.spritesheet('slashWave','./assets/sprites/slash.png',25,56);
        game.load.spritesheet('slashatt','./assets/sprites/slash_animation.png',25,60);
        
        game.load.spritesheet('enemy','./assets/sprites/mob1.png',37, 55);
        game.load.image('flag','./assets/sprites/flag.png',32,44);
        game.load.image('healthBar','./assets/ui/healthbar_empty.png');
        game.load.spritesheet('healthSegment','./assets/ui/health_segment.png',9,16);
        game.load.image('blankspace','./assets/img/empty.png');
        game.load.spritesheet('slime','./assets/sprites/slime-transparent-set-withdir.png',28,28);
        
        game.load.image('armSegment','./assets/sprites/segment.png');
        game.load.image('armConnector','./assets/sprites/segment_link.png');
        
        
        game.load.image('surface', './assets/img/surface.png');
        game.load.image('platformLeft', './assets/img/platform_01_left.png');
        game.load.image('platformRight', './assets/img/platform_01.png');
        game.load.image('platform01tile','./assets/img/platform_01_tile.png');
        game.load.image('platform01bgtile','./assets/img/platform_01_background_tile.png');
        game.load.image('platform01fgtile','./assets/img/platform_01_foreground_tile.png');
        game.load.image('platform01fgLeft', './assets/img/platform_01_foreground_left.png');
        game.load.image('platform01fgRight', './assets/img/platform_01_foreground.png');
        game.load.image('platform01bgLeft', './assets/img/platform_01_background_left.png');
        game.load.image('platform01bgRight', './assets/img/platform_01_background.png');
        game.load.image('platform01tornl','./assets/img/platform_01_torn_left.png');
        game.load.image('platform01tornlfg','./assets/img/platform_01_torn_foreground_left.png');
        game.load.image('platform01tornlbg','./assets/img/platform_01_torn_background_left.png');
        game.load.image('platform01torn','./assets/img/platform_01_torn.png');
        game.load.image('platform01tornfg','./assets/img/platform_01_torn_foreground.png');
        game.load.image('platform01tornbg','./assets/img/platform_01_torn_background.png');
        game.load.image('wallCornerLeft', './assets/img/wall_01_corner_left.png');
        game.load.image('wallCornerRight','./assets/img/wall_01_corner_right.png');
        game.load.image('floorTop', './assets/img/wall_01_floor_top.png');
        game.load.image('ceiling', './assets/img/wall_01_ceiling.png');
        game.load.image('floorBottom', './assets/img/wall_01_floor_bottom.png');
        
        
        game.load.image('wallTile01','./assets/img/wall_01_tile_01.png');
        game.load.image('wallTile02','./assets/img/wall_01_tile_02.png');
        game.load.image('wallTile03','./assets/img/wall_01_tile_03.png');
        game.load.spritesheet('switch','./assets/sprites/switch.png',32,32);
        game.load.image('gate','./assets/img/gate.png');
        game.load.image('gatebase','./assets/img/gate_base.png');
        game.load.spritesheet('player','./assets/sprites/chillgirl.png',200,304);
        game.load.spritesheet('visitorFont','./assets/img/visitor_translucent_white_fixed.png',15,20);
        game.load.image('enemyBullet', './assets/img/enemy-bullet.png');
        game.load.spritesheet('invader', './assets/sprites/hoverbot.png', 64, 82);
        
        game.load.audio('footstepsNormal1', './assets/sfx/Footsteps_concrete_sfx_1.wav');
        game.load.audio('footstepsNormal2', './assets/sfx/Footsteps_concrete_sfx_2.wav');
        game.load.audio('playerJump','./assets/sfx/Player_sound_jump.wav');
        game.load.audio('playerHurt','./assets/sfx/Player_sound_hurt.wav');
        game.load.audio('hookShot','./assets/sfx/grapple_fire.wav');
        game.load.audio('hookLatch','./assets/sfx/grapple_latched.wav');
        game.load.audio('hookRelease','./assets/sfx/grapple_released.wav');
        game.load.audio('switchActivate','./assets/sfx/computerswitch_softer.wav');
        game.load.audio('slashLaser','./assets/sfx/slashSound.wav');
        game.load.audio('song','./assets/sfx/songloop.wav');
    },
        
    create: function () {
        var sounds = [];
        var addSound = function(objectKey,bankKey){
            sounds.push(game.add.audio(objectKey));
            soundBank.add(sounds[sounds.length - 1],bankKey);
        };
        
        //Adding sounds
        addSound('footstepsNormal1','footsteps_normal_0');
        addSound('footstepsNormal2','footsteps_normal_1');
        addSound('playerJump','player_sound_jump');
        addSound('playerHurt','player_sound_hurt');
        addSound('switchActivate','switch_activated');
        addSound('slashLaser','attackSound');
        addSound('song','gameSong');
        addSound('hookShot','hook_shot');
        addSound('hookLatch','hook_latch');
        addSound('hookRelease','hook_release');

        //Defer starting game until audio all loaded
        game.sound.setDecodedCallback(sounds,function(){game.state.start('startstate');}, this);
    }
};