function createSwitch(x,y) {
    lever = switches.create(x, y, 'switch');
    lever.body.immovable = true;
    lever.animations.add('off',[0],false);
    lever.animations.add('on',[1],false);
    lever.switchFlipped = 0;
}