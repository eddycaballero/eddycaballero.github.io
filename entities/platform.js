function createSurface(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'surface');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [{x: x, y: y},{x: x+(100*xScale), y: y}];
}

function createPlatform(x,y,xScale,yScale,hookable){
    var yOrig = y;
    createSurface(x,y,xScale,yScale,hookable);
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;    
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            if (i==0) {
                tile = tiles.create(x,y,'platformLeft');
                fg = foreground1.create(x,(y-40), 'platform01fgLeft');
                bg = background1.create(x,y-40, 'platform01bgLeft');
            }
            else if ((i+1)==(xScale * 4)) {
                tile = tiles.create(x,y,'platformRight');
            }
            else {
                tile = tiles.create(x,y,'platform01tile');
                if (i+4 == xScale * 4) {
                    fg = foreground1.create(x, y-40, 'platform01fgRight');
                    bg = background1.create(x,y-40, 'platform01bgRight');
                }
                else if (i % 4 == 0) {
                    fg = foreground1.create(x, y-40, 'platform01fgtile');
                    bg = background1.create(x,y-40, 'platform01bgtile');
                }
            }
            tile.scale.setTo(.25,.25);
            tile.hookable = hookable;
            tile.body.immovable = true;
            tile.ledgePoints = [];
        }
    }
}

function createNakedPlatform(x,y,xScale,yScale,hookable){
    var yOrig = y;
    createSurface(x,y,xScale,yScale,hookable);
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;    
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            if (i==0) {
                tile = tiles.create(x,y,'platformLeft');
            }
            else if ((i+1)==(xScale * 4)) {
                tile = tiles.create(x,y,'platformRight');
            }
            else {
                tile = tiles.create(x,y,'platform01tile');
            }
            tile.scale.setTo(.25,.25);
            tile.hookable = hookable;
            tile.body.immovable = true;
            tile.ledgePoints = [];
        }
    }
}

function createFatPlatform(x,y,xScale,yScale,hookable){
    var yOrig = y;
    createSurface(x,y,xScale,yScale,hookable);
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;    
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            if (i==0) {
                if (j == 0) {
                    fg = foreground1.create(x,(y-40), 'platform01fgLeft');
                    bg = background1.create(x,y-40, 'platform01bgLeft');
                }
                tile = tiles.create(x,y,'wallCornerLeft');
            }
            else if ((i+1)==(xScale * 4)) {
                tile = tiles.create(x,y,'wallCornerRight');
            }
            else {
                if (j == 0) {
                    if (i+4 == xScale * 4) {
                        fg = foreground1.create(x, y-40, 'platform01fgRight');
                        bg = background1.create(x,y-40, 'platform01bgRight');
                    }
                    else if (i % 4 == 0) {
                        fg = foreground1.create(x, y-40, 'platform01fgtile');
                        bg = background1.create(x,y-40, 'platform01bgtile');
                    }
                }
                tile = tiles.create(x,y,'floorBottom');
            }
            tile.scale.setTo(.25,.25);
            tile.hookable = hookable;
            tile.body.immovable = true;
            tile.ledgePoints = [];
        }
    }
}


function createPlatformTorn(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'platform01torn');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [{x: x+(100*xScale), y: y}];
    
    fg = foreground1.create(x,y - (60 * yScale),'platform01tornfg');
    bg = background1.create(x,y - (60 * yScale),'platform01tornbg');
    fg.scale.setTo(xScale,yScale);
    bg.scale.setTo(xScale,yScale);
    
    return platform;
}

function createPlatformTornL(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'platform01tornl');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [{x: x, y: y}];
    
    fg = foreground1.create(x,y - (60 * yScale),'platform01tornlfg');
    bg = background1.create(x,y - (60 * yScale),'platform01tornlbg');
    fg.scale.setTo(xScale,yScale);
    bg.scale.setTo(xScale,yScale);
    
    return platform;
}


function createPlatformTile(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'platform01tile');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [];
    
    fg = foreground1.create(x,y - (60 * yScale),'platform01fgtile');
    bg = background1.create(x,y - (60 * yScale),'platform01bgtile');
    fg.scale.setTo(xScale,yScale);
    bg.scale.setTo(xScale,yScale);
    
    return platform;
}

function createWallTileRight(x,y,xScale,yScale,hookable){
    createSurface(x,y,xScale,yScale,hookable);
    var yOrig = y;
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            tile = tiles.create(x,y,'wallTile01');
            tile.scale.setTo(.25,.25);
            tile.hookable = hookable;
            tile.body.immovable = true;
            tile.ledgePoints = [];
        }
    }
}

function createWallTileLeft(x,y,xScale,yScale,hookable){
    createSurface(x,y,xScale,yScale,hookable);
    var yOrig = y;
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            platform = platforms.create(x,y,'wallTile03');
            platform.scale.setTo(.25,.25);
            platform.hookable = hookable;
            platform.body.immovable = true;
            platform.ledgePoints = [];
        }
    }
}

function createFloor(x,y,xScale,yScale,hookable){
    createSurface(x,y,xScale,yScale,hookable);
    var yOrig = y;
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            if (i == 0){
                tile = tiles.create(x,y,'wallCornerLeft')
            }
            else if ((i+1) == (xScale * 4)){
                tile = tiles.create(x,y,'wallCornerRight');
            }
            else if (j==0) {
                tile = tiles.create(x,y,'floorTop');
            }
            else {
                tile = tiles.create(x,y,'floorBottom');
            }
            tile.scale.setTo(.25,.25);
            tile.hookable = hookable;
            tile.body.immovable = true;
            tile.ledgePoints = [];
        }
    }
}

function createCeiling(x,y,xScale,yScale,hookable){
    createSurface(x,y,xScale,yScale,hookable);
    var yOrig = y;
    for (var i = 0; i < (xScale * 4); i++) {
        y = yOrig;
        if (i > 0) {
            x += 25;
        }
        for (var j = 0; j < (yScale * 4); j++) {
            if (j > 0) {
                y += 25;
            }
            if (x == 0){
                tile = tiles.create(x,y,'wallCornerLeft')
            }
            else if ((x+25) == game.world.width){
                tile = tiles.create(x,y,'wallCornerRight');
            }
            else {
                tile = tiles.create(x,y,'ceiling');
            }
            tile.scale.setTo(.25,.25);
            tile.hookable = hookable;
            tile.body.immovable = true;
            tile.ledgePoints = [];
        }
    }
}

function createWallTile02(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'wallTile02');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [];
    
    return platform;
}

function createPipe(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'pipe');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [];
    
    return platform;
}

function createRPipe(x,y,xScale,yScale,hookable){
    platform = platforms.create(x,y,'right_pipe');
    platform.scale.setTo(xScale,yScale);
    platform.hookable = hookable;
    platform.body.immovable = true;
    platform.ledgePoints = [];
    
    return platform;
}