/*
    Code for gravity.
*/

function gravity(event, mass, fluid) {
    if (event.type != 'tick') return;
    
    let cx = event.data[0];
    let cy = event.data[1];
    let chunks = event.canvas;

    let dir = [0, 0];
    let force = [0,0];

    let currBlock = chunks.getBlock(cx, cy);

    for (let x = -1; x < 2; x ++) {
        for (let y = -1; y < 2; y++) {
            let blok = chunks.getBlock(cx + x, cy + y);
            if (blok == -1) continue;
            let massDiff = (mass / mainTiles.tiles[blok].attributes.mass) - (mainTiles.tiles[blok].attributes.mass / mass);
            let x2 = x / fluid;
            let dirDiff = (y - 1 + fluid) / (Math.sqrt(x2*x2 + y*y));
            if (y == 0 && x == 0) dirDiff = 0;
            if (isNaN(dirDiff)) dirDiff = 0;
            force[0] += massDiff * x2;
            force[1] += massDiff * dirDiff * y;
        }
    }
    dir[0] = (Math.abs(force[0]) < .5) ? 0 : Math.sign(force[0]);
    dir[1] = (Math.abs(force[1]) < .5) ? 0 : Math.sign(force[1]);

    let offBlock = chunks.getBlock(cx + dir[0], cy + dir[1]);

    if (currBlock == offBlock) {
        dir[0] = Math.sign(force[0]);
        offBlock = chunks.getBlock(cx + dir[0], cy + dir[1]);
    }

    if (currBlock == -1 || offBlock == -1 || currBlock == offBlock || chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])]) return;

    chunks.noTick[cx*chunks.height + cy] = true;
    chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])] = true;

    chunks.setBlock(cx, cy, offBlock);
    chunks.setBlock(cx + dir[0], cy + dir[1], currBlock);
}

Tile.prototype.gravity = function (mass, fluid) {
    this.interactions.push(function (event) {
        gravity(event, mass, fluid)
    });
    this.attributes.mass = mass;
    return this;
}