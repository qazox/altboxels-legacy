/*
    Code for rendering and startup.
*/

function Canvas(width, height, upscale) {
    this.width = width;
    this.height = height;
    this.upscale = upscale;
    this.radius = 2s;

    this.x = 0;
    this.y = 0;

    this.elem = document.querySelector('canvas');
    this.ctx = this.elem.getContext('2d');

    this.blocks = new Uint16Array(width * height);

    this.sel = -1;

    let that = this;

    this.elem.addEventListener('mousedown', function (e) {
        that.clicked = true;
    });

    this.elem.addEventListener('mousemove', function (e) {
        that.firstX = (that.pageX == undefined) ? e.pageX : that.pageX;
        that.firstY = (that.pageY == undefined) ? e.pageY : that.pageY;
        that.pageX = e.pageX;
        that.pageY = e.pageY;
    })

    this.elem.addEventListener('wheel', function (e) {
        console.log(e.deltaY)
        that.radius += Math.sign(e.deltaY);
        if (that.radius < 1) that.radius = 1;
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

/* TODO: cleanup again */
Canvas.prototype.click = function () {
    let x = (this.pageX - this.elem.getBoundingClientRect().x + this.x) / this.upscale;
    let y = (this.pageY - this.elem.getBoundingClientRect().y + this.y) / this.upscale;

    let x2 = (this.firstX - this.elem.getBoundingClientRect().x + this.x) / this.upscale;
    let y2 = (this.firstY - this.elem.getBoundingClientRect().y + this.y) / this.upscale;

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

                this.setBlock(x4, y4, mainTiles.sel);
            }
        }

    } while (x3 != x && y3 != y)

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