/* 
    Code for global game ticks.
*/ 

function TickHandler(canvas) {
    this.canvas = canvas;
    this.ticks = 0;
}

TickHandler.prototype.tick = async function() {
    let canvas = this.canvas;

    this.canvas.noTick = [];

    for (let i = 0; i < canvas.width * canvas.height; i++) {
        let x = Math.floor(i / canvas.height);
        let y = i % canvas.height;

        if ( this.canvas.noTick[i] ) continue;

        new GameEvent('tick', mainTiles.tiles[this.canvas.blocks[i]], [x,y, this.ticks], this.canvas);
    }

    this.canvas.render();

    this.ticks++;
    this.ticks = this.ticks % 3600;
}
