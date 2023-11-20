/*
    Code for cohesion. Allows water to stick to itself without spreading apart too much.
*/


function cohesion(event) {
    if (event.type != 'tick') return;
    
    let cx = event.data[0];
    let cy = event.data[1];
    let chunks = event.canvas;

    let dir = [0, 0];
    let force = [0,0];

    let currBlock = chunks.getBlock(cx, cy);

    for (let x = -2; x < 3; x ++) {
        for (let y = -2; y < 3; y++) {
            if (chunks.getBlock(cx + x, cy + y) != currBlock) continue;
            force[0] += x / (0.1+Math.sqrt(x*x + y*y));
            force[1] += y / (0.1+Math.sqrt(x*x + y*y));
        }
    }

    dir[0] = (Math.abs(force[0]) < .4) ? 0 : Math.sign(force[0]);
    dir[1] = (Math.abs(force[1]) < .4) ? 0 : Math.sign(force[1]);

    let offBlock = chunks.getBlock(cx + dir[0], cy + dir[1]);

    if (currBlock == -1 || offBlock == -1 || currBlock == offBlock || chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])]) return;

    //chunks.noTick[cx*chunks.height + cy] = true;
    //chunks.noTick[(cx+dir[0])*chunks.height + (cy+dir[1])] = true;

    chunks.setBlock(cx, cy, offBlock);
    chunks.setBlock(cx + dir[0], cy + dir[1], currBlock);
}

Tile.prototype.cohesion = function () {
    this.interactions.push(function (event) {
        cohesion(event)
    });
    return this;
}