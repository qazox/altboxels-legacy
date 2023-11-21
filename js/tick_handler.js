/* 
    Code for global game ticks.
*/ 

function TickHandler(canvas) {
    this.canvas = canvas;
    this.ticks = 0;
    this.noTick = false;
}

TickHandler.prototype.tick = async function() {
    if (this.noTick) return;

    let canvas = this.canvas;

    this.canvas.noTick = [];

    for (let i = 0; i < canvas.width * canvas.height; i++) {
        let x = Math.floor(i / canvas.height);
        let y = i % canvas.height;

        if ( this.canvas.noTick[i] ) continue;

        new GameEvent('tick', mainTiles.tiles[this.canvas.blocks[i]], [x,y, this.ticks], this.canvas);
    }

    for (let change of canvas.queuedChanges) {
        canvas.setBlock(change[0], change[1], change[2]);
    }
    canvas.queuedChanges = [];
    
    this.ticks++;
    this.ticks = this.ticks % 3600;
}
