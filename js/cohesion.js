/*
    Code for cohesion. Allows water to stick to itself without spreading apart too much.
*/


function cohesion(event, radius, isAll) {
    if (event.type != 'tick') return;
    
    let cx = event.data[0];
    let cy = event.data[1];
    let chunks = event.canvas;

    let dir = [0, 0];
    let force = [0,0];

    let currBlock = chunks.getBlock(cx, cy);

    for (let x = -radius; x <= radius; x ++) {
        for (let y = -radius; y <= radius; y++) {
            if (chunks.getBlock(cx + x, cy + y) != currBlock && !isAll) continue;
            if (chunks.getBlock(cx + x, cy + y) == mainTiles.resolveID("Vanilla/Core","Air") && isAll) continue;
            force[0] += x / (0.1+Math.sqrt(x*x + y*y));
            force[1] += y / (0.1+Math.sqrt(x*x + y*y));
        }
    }

    dir[0] = (Math.abs(force[0]) < radius*0.3) ? 0 : Math.sign(force[0]);
    dir[1] = (Math.abs(force[1]) < radius*0.3) ? 0 : Math.sign(force[1]);

    if (Math.abs(force[0]) < Math.abs(force[1])) {
        force[0] = 0
    } else {
        force[1] = 0
    }

    let offBlock = chunks.getBlock(cx + dir[0], cy + dir[1]);

    if (currBlock == -1 || offBlock != mainTiles.resolveID('Vanilla/Core','Air') || currBlock == offBlock || chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])]) return;

    //chunks.noTick[cx*chunks.height + cy] = true;
    //chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])] = true;

    chunks.setBlock(cx, cy, offBlock);
    chunks.setBlock(cx + dir[0], cy + dir[1], currBlock);
}

Tile.prototype.cohesion = function (radius, isAll) {
    this.interactions.push(function (event) {
        cohesion(event, radius, isAll)
    });
    return this;
}