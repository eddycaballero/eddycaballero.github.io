function createGate(x,y){
    platform = platforms.create(x,y,'gatebase');
    platform.scale.setTo(.25,.25);
    platform.hookable = true;
    platform.body.immovable = true;
    
    gate = gates.create(x+25,y,'gate');
    gate.scale.setTo(1.5,0.25);
    gate.body.immovable = true;
    
    platform = platforms.create(x+200,y,'gatebase');
    platform.scale.setTo(-.25,.25);
    platform.hookable = true;
    platform.body.immovable = true;
}

function openGate(player, lever){
    if (lever.switchFlipped < 1) {
        gateOpen = gateOpen + 1;
        lever.switchFlipped = 1;
        lever.animations.play('on');
        soundBank.play("switch_activated");
    }
}
