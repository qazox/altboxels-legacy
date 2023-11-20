/*
    Code for rendering and startup.
*/

function Canvas(width, height, upscale) {
    this.width = width;
    this.height = height;
    this.upscale = upscale;

    this.x = 0;
    this.y = 0;

    this.elem = document.querySelector('canvas');
    this.ctx = this.elem.getContext('2d');

    this.blocks = new Uint16Array(width * height);

    this.sel = -1;

    let that = this;

    this.elem.addEventListener('mousedown', function (e)  {
        that.clicked = true;
    });

    this.elem.addEventListener('mousemove', function (e) {
        that.pageX = e.pageX;
        that.pageY = e.pageY;
    })

    this.elem.addEventListener('mouseup', function (e) {
        that.clicked = false;
    });


    this.clicked = false;
    this.pageX = 0;
    this.pageY = 0;

    this.resize();
}

Canvas.prototype.getBlock = function (x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height || (this.blocks[x * this.height + y] == undefined)) return -1;
    return this.blocks[x * this.height + y];
}

Canvas.prototype.setBlock = function (x, y, block) {
    if (this.getBlock(x, y) == -1) return;
    this.blocks[x * this.height + y] = block
}

Canvas.prototype.resize = function () {
    this.elem.width = this.width * this.upscale;
    this.elem.height = this.height * this.upscale;

    this.render();
}

Canvas.prototype.render = function () {
    this.ctx.clearRect(0, 0, this.width * this.upscale, this.height * this.upscale);
    for (let i = 0; i < this.width * this.height; i++) {
        let x = Math.floor(i / this.height);
        let y = i % this.height;

        let block = mainTiles.tiles[this.blocks[i]];
        this.ctx.fillStyle = block.color;

        this.ctx.fillRect(
            x * this.upscale,
            y * this.upscale,
            this.upscale,
            this.upscale
        )
    }
}

Canvas.prototype.click = function () {
    let x = (this.pageX - this.elem.getBoundingClientRect().x + this.x) / this.upscale;
    let y = (this.pageY - this.elem.getBoundingClientRect().y + this.y) / this.upscale;
    
    x = Math.floor(x);
    y = Math.floor(y);

    let blox = this.getBlock(x,y);

    if (blox == -1) return;

    this.setBlock(x,y,mainTiles.sel);
}

var canvas = new Canvas(160, 90, 4);
var handler = new TickHandler(canvas);
canvas.setBlock(52, 52, 1);

(async function () {
    while (true) {
        if (canvas.clicked) canvas.click();
        await handler.tick();
        await new Promise(resolve => setTimeout(resolve, 1000 / 70));
    }
})();