function createExit(x,y,xScale,yScale,roomNumber){
    exit = exits.create(x,y,'blankspace');
    exit.scale.setTo(xScale,yScale);
    exit.body.immovable = true;
    exit.roomNumber = roomNumber;
    return exit;
}