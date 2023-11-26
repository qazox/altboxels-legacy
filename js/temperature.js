/*
    Controls a block's temperature,
    and how much it will conduct or insulate.

    Temperature is in celsius, 
    but offset from room temperature (23 celsius).
*/


function temperature(event, conduct, transfer = 0) {
    if (event.type != 'temp') return;
    
    let cx = event.data[0];
    let cy = event.data[1];
    let chunks = event.canvas;

    for (let x = -1; x < 2; x ++) {
        for (let y = -1; y < 2; y++) {
            let blok = chunks.getBlock(cx + x, cy + y);
            let temp = chunks.getBlock(cx, cy, true) || 0
            let temp2 = chunks.getBlock(cx + x, cy + y, true) || 0

            let conduct2 = (blok != -1) ? (mainTiles.tiles[blok].attributes.conduct || 0) : 0;

            let conductSum = Math.min(conduct * conduct2 * 10, 0.5);

            chunks.setBlock(cx, cy, conductSum*(temp2 - temp + transfer) + temp, true);
            chunks.setBlock(cx+x, cy+y, conductSum*(temp - temp2 - transfer) + temp2, true);
        }
    }
}

Tile.prototype.temperature = function (temp, conduct, transfer) {
    this.interactions.push(function (event) {
        temperature(event, conduct, transfer)
    });
    this.attributes.temperature = temp;
    this.attributes.conduct = conduct;
    return this;
}