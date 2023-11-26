/*
    Code for rendering and startup.
*/

function Canvas(width, height, upscale) {
    this.width = width;
    this.height = height;
    this.upscale = upscale;
    this.radius = 2;

    this.x = 0;
    this.y = 0;

    this.elem = document.querySelector('canvas');
    this.ctx = this.elem.getContext('2d');

    this.blocks = new Uint16Array(width * height);
    this.temp = new Array(width * height); // This will not be saved in the world data.

    this.sel = -1;

    this.queuedChanges = [];

    let that = this;

    this.elem.addEventListener('mousedown', function (e) {
        that.clicked = true;
    });

    this.elem.addEventListener('mousemove', function (e) {
        that.pageX = e.pageX;
        that.pageY = e.pageY;
    })

    this.elem.addEventListener('wheel', function (e) {
        that.radius += Math.sign(e.deltaY);
        if (that.radius < 0) that.radius = 0;
    })

    this.elem.addEventListener('mouseup', function (e) {
        that.clicked = false;

        that.firstX = this.pageX;
        that.firstY = this.pageY;
    });


    this.clicked = false;
    this.pageX = 0;
    this.pageY = 0;

    this.resize();
}

Canvas.prototype.getBlock = function (x, y, doTemp) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return -1;
    return (doTemp ? this.temp : this.blocks)[x * this.height + y];
}

Canvas.prototype.setBlock = function (x, y, block, doTemp) {
    if (this.getBlock(x, y) == -1) return;
    (doTemp ? this.temp : this.blocks)[x * this.height + y] = block
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

        if (block.color != 'none') {

            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = block.color;
    
            this.ctx.fillRect(
                x * this.upscale,
                y * this.upscale,
                this.upscale,
                this.upscale
            )
        }

        let temp = this.temp[i];
        
        if (Math.abs(temp) > 10) {
                
            this.ctx.fillStyle = (temp > 0) ? `rgb(255,0,0)` : `rgb(0,255,255)`;
            this.ctx.globalAlpha = (1 / (1 + Math.exp(-Math.abs(temp)/1000)) - 0.5) * 0.8;

            this.ctx.fillRect(
                x * this.upscale,
                y * this.upscale,
                this.upscale,
                this.upscale
            )

  
        }
    }

    /* TODO: clean up */

    let x = (this.pageX - this.elem.getBoundingClientRect().x - scrollX + this.x) - 0.5 - this.radius * this.upscale;
    let y = (this.pageY - this.elem.getBoundingClientRect().y - scrollY + this.y) - 0.5 - this.radius * this.upscale;

    
    this.ctx.globalAlpha = 1;

    this.ctx.strokeStyle = 'rgb(255,255,255)';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, this.radius * 2 * this.upscale + 2, this.radius * 2 * this.upscale + 2);
}

/* TODO: cleanup again */
Canvas.prototype.click = function () {
    if (this.firstX == undefined) {
        this.firstX = this.pageX;
        this.firstY = this.pageY;
        return;
    }

    let x = (this.pageX - this.elem.getBoundingClientRect().x - scrollX + this.x) / this.upscale;
    let y = (this.pageY - this.elem.getBoundingClientRect().y - scrollY + this.y) / this.upscale;

    let x2 = (this.firstX - this.elem.getBoundingClientRect().x - scrollX + this.x) / this.upscale;
    let y2 = (this.firstY - this.elem.getBoundingClientRect().y - scrollY + this.y) / this.upscale;

    x = Math.floor(x);
    y = Math.floor(y);

    let x3 = x2 = Math.floor(x2);
    let y3 = y2 = Math.floor(y2);

    do {
        if (Math.abs(x3 - x) > Math.abs(y3 - y)) {
            x3 += Math.sign(x - x3)
        } else {
            y3 += Math.sign(y - y3)
        }

        for (let x4 = x3 - this.radius; x4 <= x3 + this.radius; x4++) {
            for (let y4 = y3 - this.radius; y4 <= y3 + this.radius; y4++) {

                let blox = this.getBlock(x4, y4);

                if (blox == -1) continue;

                this.setBlock(x4, y4, mainTiles.tiles[mainTiles.sel].attributes.temperature, true);
                this.setBlock(x4, y4, mainTiles.sel);
            }
        }

    } while (x3 != x && y3 != y)

    this.firstX = this.pageX;
    this.firstY = this.pageY;
}

var canvas = new Canvas(240, 135, 4);
var handler = new TickHandler(canvas);

(async function () {
    while (true) {
        handler.tick();
        await new Promise(resolve => setTimeout(resolve, 1000 / 70));
    }
})();

setInterval(() => {
    if (canvas.clicked) canvas.click();
    this.canvas.render();
}, 1000 / 60);