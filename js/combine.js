/*
    Code for element combinations.
    TOOD: clean this up too
*/

function combine(event, inBlock, outBlock, outBlock2) {
    if (event.type != 'tick') return;

    inBlock = mainTiles.resolveID(inBlock[0],inBlock[1]);
    outBlock = mainTiles.resolveID(outBlock[0],outBlock[1]);
    outBlock2 = mainTiles.resolveID(outBlock2[0],outBlock2[1]);


    let cx = event.data[0];
    let cy = event.data[1];
    let chunks = event.canvas;

    let dir = [0, 0];
    let currBlock = chunks.getBlock(cx, cy);

    for (let x = -1; x < 2; x++) {
        for (let y = 1; y >= -1; y--) {
            if (chunks.getBlock(cx + x, cy + y) == inBlock) {
                dir = [x, y];
                continue;
            }
        }
    }

    let offBlock = chunks.getBlock(cx + dir[0], cy + dir[1]);

    if (currBlock == -1 || offBlock == -1 || (dir[0] == 0 && dir[1] == 0) || chunks.noTick[(cx + dir[0]) * chunks.height + (cy + dir[1])]) return;

    chunks.setBlock(cx, cy, outBlock);
    chunks.setBlock(cx + dir[0], cy + dir[1], outBlock2);
}

Tile.prototype.combine = function (inBlock, outBlock2, outBlock) {
    this.interactions.push(function (event) {
        combine(event, inBlock, outBlock, outBlock2)
    });
    return this;
}