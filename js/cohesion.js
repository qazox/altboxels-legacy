/*
    Code for cohesion. 
    Allows water to stick to itself.

    radius: How far out of blocks will contribute to sticking
    isAll: 
        If this is false or undefined, cohesion occurs (sticks to self)
        If this is true, adhesion and cohesion ocucrs (sticks to non-air)

*/

function cohesion(event, radius, isAll = 0) {
    if (event.type != 'tick') return;
    
    let cx = event.data[0];
    let cy = event.data[1];
    let chunks = event.canvas;

    let dir = [0, 0];
    let force = [0,0];

    let currBlock = chunks.getBlock(cx, cy);

    if (force[0] == 0 && force[1] == 0) return;

    dir[0] = (Math.abs(force[0]) < radius*0.1) ? 0 : Math.sign(force[0]);
    dir[1] = (Math.abs(force[1]) < radius*0.1) ? 0 : Math.sign(force[1]);

    if (Math.abs(force[0]) < Math.abs(force[1])) {
        force[0] = 0
    } else {
        force[1] = 0
    }

    let offBlock = chunks.getBlock(cx + dir[0], cy + dir[1]);

    if (currBlock == -1 || offBlock != air || currBlock == offBlock || chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])]) return;

    //chunks.noTick[cx*chunks.height + cy] = true;
    //chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])] = true;

    chunks.setBlock(cx, cy, offBlock);
    chunks.setBlock(cx + dir[0], cy + dir[1], currBlock);

    return true;
}

Tile.prototype.cohesion = function (radius, isAll) {
    this.interactions.push(function (event) {
        cohesion(event, radius, isAll)
    });
    return this;
}