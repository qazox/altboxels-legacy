/*
    Code for saving and loading data.

    Features a somewhat efficient compression algorithm.
*/

function save() {
    let jason = {
        'pal': [],
        'data': []
    };

    for (let item of mainTiles.tiles) {
        jason.pal.push([
            item.namespace,
            item.id
        ])
    }

    let json = jason.data;

    for (let i = 0; i < canvas.blocks.length; i += 256) {
        let arr = canvas.blocks.slice(i, i + 256);

        let pal = Object.values(arr.filter((v, i, a) => a.findIndex(v2 => (v2 === v)) === i).sort());
        let otherArray;
        if (pal.length < 17 && pal.length > 1) {
            otherArray = new Uint8Array(128);

            for (let i in otherArray) {
                otherArray[i] = (((pal.indexOf(arr[i*2]) * 16) + pal.indexOf(arr[i*2+1])) + 'A'.charCodeAt()) % 256;
            }

        } else if (pal.length > 16) {
            otherArray = new Uint8Array(256);

            for (let i in otherArray) {
                otherArray[i] = (pal.indexOf(arr[i]) + 'A'.charCodeAt()) % 256;
            }

        }


        json[i / 256] = {
            'pal': pal,
            'dat': otherArray ? new TextDecoder('ascii').decode(otherArray) : undefined
        };
    }

    document.querySelector('#code').value = JSON.stringify(jason);
}

function load() {
    let jason = JSON.parse(document.querySelector('#code').value);

    let json = jason.data;
    
    let mainPal = jason.pal.map(x => mainTiles.resolveID(x[0],x[1]));

    console.log(mainPal);

    for (let i in json) {
        let data = json[i];
        let pal = data.pal;
        let dat = new TextEncoder('ascii').encode(data.dat);

        let otherArray = new Uint16Array(256);


        if (pal.length < 2) {
            for (let i in otherArray) {
                otherArray[i] =  mainPal[(pal[0])];
            }
            
        } else if (pal.length < 17) {
            for (let i in dat) {
                otherArray[i*2] = mainPal[pal[((dat[i] - 'A'.charCodeAt()) & 0xF0) / 16]];
                otherArray[i*2+1] =  mainPal[pal[(dat[i] - 'A'.charCodeAt()) & 0xF]];
            }
            
        } else {
            for (let i in dat) {
                otherArray[i] =  mainPal[pal[(dat[i] - 'A'.charCodeAt()) & 0xFF]];
            }
        }

        canvas.blocks.set(otherArray,Math.min(i*256,canvas.blocks.length - 256));
    }
}