function createSpike(x,y){
    spike = spikes.create(x,y,'spike');

    spike.body.immovable = true;
    return spike;
}

function createRSpike(x,y){
    spike = spikes.create(x,y,'rspike');

    spike.body.immovable = true;
    return spike;
}

function createDSpike(x,y){
    spike = spikes.create(x,y,'dspike');

    spike.body.immovable = true;
    return spike;
}