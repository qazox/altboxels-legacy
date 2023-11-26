/*
    Code for most implemented blocks. 

    This code isn't in JSON form for reading purposes.

    If you want to add a modification, use the JSON format
    documented in [js/loader.js].
*/

mainTiles.loadSet(
    'Vanilla/Air',
    [
        new Tile('none', 'Air').gravity(1.4 / 1000, 4, 200)
            .temperature(0,0.01)
            .state(['Vanilla/Air', 'Hot Air'],50,true),

         new Tile('none', 'Hot Air').gravity(1.4 / 1100, 4, 100)
            .temperature(50,0.02)
            .state(['Vanilla/Air', 'Air'],50,false),

        new Tile('rgb(0,0,0)', 'Vacuum').gravity(0.01 / 1000 / 1000, 4, Infinity)
            .temperature(0,0),

        new Tile('rgb(180,156,229)', 'Hydrogen').gravity(0.8 / 1000, 4,  200)
            .temperature(0,0.1)
            .state(['Vanilla/Air', 'Hydrogen Flame'],50,true),

        new Tile('rgb(255,0,239)', 'Plasma').gravity(1.4 / 5000, 4,  200)
            .temperature(5000,2)
            .state(['Vanilla/Air', 'Hydrogen'],3000,false),

        new Tile('rgb(200,186,249)', 'Hydrogen Flame').gravity(0.8 / 1000, 4,  200)
            .temperature(50,0.2)
            .combine(['Vanilla/Air', 'Hydrogen'], ['Vanilla/Water', 'Steam'], ['Vanilla/Water', 'Steam'])
            .combine(['Vanilla/Air', 'Hydrogen Flame'], ['Vanilla/Air', 'Hydrogen'], ['Vanilla/Air', 'Air']),

        new Tile('rgb(229,194,156)', 'Helium').gravity(0.7 / 1000, 4,  200)
            .temperature(0,0.001),

        new Tile('rgba(0,0,0,0.6)', 'Carbon Monoxide').gravity(1.1 / 1000, 4,  200)
            .temperature(0,0.02)
            .combine(['Vanilla/Air', 'Air'], ['Vanilla/Air', 'Carbon Dioxide'], ['Vanilla/Air', 'Vacuum']),

        new Tile('rgba(0,0,0,0.2)', 'Carbon Dioxide').gravity(1.1 / 1000, 4,  200)
            .temperature(0,0.03),

        new Tile('rgba(0,0,0,0.4)', 'Methane').gravity(1.0 / 1000, 4, 200)
            .temperature(0,0.04)
            .state(['Vanilla/Fire', 'Fire'],1000,true)
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Fire', 'Fire'], ['Vanilla/Fire', 'Fire'])
            .combine(['Vanilla/Air', 'Air'], ['Vanilla/Air', 'Carbon Monoxide'], ['Vanilla/Water', 'Steam'])

    ]
);


mainTiles.loadSet(
    'Vanilla/Earth',
    [
        new Tile('rgb(153, 102, 51)', 'Earth').gravity(10, 1, 91),
        
        new Tile('rgb(143, 92, 41)', 'Soil').gravity(10, 1, 91),

        new Tile('rgb(255,0,0)', 'Barrier').unGravity(),
        
        new Tile('rgb(20,20,20)', 'Charcoal').gravity(11, 1, 100)
            .temperature(0,0.5)
            .state(['Vanilla/Fire', 'Fire'],800,true),

        new Tile('rgb(53,46,32)', 'Mud').cohesion(2).gravity(12, 1.5, 113),
        
        new Tile('rgb(43, 33, 42)', 'Mudstone').gravity(10, 1, 89)
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Earth', 'Mud'], ['Vanilla/Air', 'Air']),
            
        new Tile('rgb(252,224,133)', 'Sand').gravity(10, 1, 93)
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Air', 'Air'], ['Vanilla/Earth', 'Sand']),

        new Tile('rgb(128,128,128)', 'Gravel').gravity(10, 1, 932),

        new Tile('rgb(117,111,86)', 'Wet Sand').cohesion(2).gravity(12, 1.5, 112)
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Air', 'Air'], ['Vanilla/Earth', 'Packed Sand']),

        new Tile('rgb(187,158,110)', 'Packed Sand').gravity(11, 1.5, 103)
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Air', 'Air'], ['Vanilla/Earth', 'Sandstone']),

        new Tile('rgb(167,138,90)', 'Sandstone').unGravity(),

        new Tile('rgb(56, 54, 52)', 'Basalt')
            .unGravity()
            .temperature(0,0.005)
            .state(['Vanilla/Fire', 'Lava'],1000,true),

        new Tile('rgb(169,179,210)', 'Clay').gravity(10, 1, 89)
            .state(['Vanilla/Earth', 'Brick'],1000,true),

        new Tile('rgb(211,108,108)', 'Brick').unGravity(),

        new Tile('rgb(66, 64, 62)', 'Rock').gravity(10, 1,  89),

        new Tile('rgb(56, 54, 52)', 'Rock Barrier').unGravity()
            .state(['Vanilla/Earth', 'Rock'],800,true)
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Earth', 'Rock'], ['Vanilla/Water', 'Water']),
    ]
)

mainTiles.loadSet(
    'Vanilla/Life',
    [
        new Tile('rgb(114, 204, 123)', 'Grass').gravity(10, 1, 91)
            .temperature(0,0.3)
            .combine(['Vanilla/Earth', 'Earth'],  ['Vanilla/Life', 'Grass'], ['Vanilla/Life', 'Grass'], true)
            .state(['Vanilla/Earth', 'Charcoal'],500,true),

        new Tile('rgb(97, 92, 97)', 'Mycelium').gravity(10, 1, 91)
            .temperature(0,0.3)
            .combine(['Vanilla/Earth', 'Earth'],  ['Vanilla/Life', 'Mycelium'], ['Vanilla/Life', 'Mycelium'], true)
            .combine(['Vanilla/Earth', 'Earth'],  ['Vanilla/Earth', 'Soil'],  ['Vanilla/Life', 'Mycelium'])
            .state(['Vanilla/Earth', 'Charcoal'],500,true),

        new Tile('rgb(245,245,245)', 'Alive Conway Cell').life(
            ['Vanilla/Life', 'Alive Conway Cell'],
            ['Vanilla/Life', 'Dead Conway Cell']),

        new Tile('rgb(10,10,10)', 'Dead Conway Cell').life(
            ['Vanilla/Life', 'Alive Conway Cell'],
            ['Vanilla/Life', 'Dead Conway Cell']),
    ]
);

mainTiles.loadSet(
    'Vanilla/Water',
    [

        new Tile('rgb(51, 153, 255)', 'Water').cohesion(2,0.2).gravity(1, 2, 11)
            .temperature(-10,0.05,5)
            .state(['Vanilla/Water', 'Steam'],100,true)
            .combine(['Vanilla/Earth', 'Earth'], ['Vanilla/Earth', 'Mud'], ['Vanilla/Air', 'Air'])
            .combine(['Vanilla/Earth', 'Sand'], ['Vanilla/Earth', 'Wet Sand'], ['Vanilla/Air', 'Air']),

        new Tile('rgb(208,232,237)', 'Steam').gravity(1.2 / 1000, 3, 11)
            .temperature(77,0.1,0.5)
            .state(['Vanilla/Water', 'Water'],100,false),

        new Tile('rgb(145,201,152)', 'Slime').cohesion(5,0.8).gravity(1.5, 2, 16)
    ]
)

mainTiles.loadSet(
    'Vanilla/Fire',
    [
        new Tile('rgb(255, 102, 0)', 'Fire')
            .temperature(1200,1)
            .state(['Vanilla/Air', 'Carbon Dioxide'],500,false)
            .state(['Vanilla/Air', 'Plasma'],3000,true)
            .gravity(1.4 / 1000, 4, 200)
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Water', 'Steam'], ['Vanilla/Air', 'Carbon Dioxide'])
            .combine(['Vanilla/Air', 'Vacuum'], ['Vanilla/Water', 'Steam'], ['Vanilla/Air', 'Methane'])
            .combine(['Vanilla/Air', 'Air'], ['Vanilla/Fire', 'Fire'], ['Vanilla/Air', 'Hot Air']),
        
        new Tile('rgb(255, 90, 16)', 'Lava').cohesion(2,0.2).gravity(1, 2, 11)
            .temperature(1125,0.1)
            .state(['Vanilla/Earth', 'Basalt'],1000,false)
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Water', 'Steam'],  ['Vanilla/Earth', 'Basalt'])
    ]
)

mainTiles.loadSet(
    'Vanilla/Electricity',
    [
        new Tile('rgb(237, 162, 71)', 'Copper')
            .temperature(0,0.1)
    ]
)

mainTiles.loadSet(
    'Vanilla/Sponge',
    [
        new Tile('rgb(158,150,91)', 'Sponge').unGravity()
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Air', 'Air'], ['Vanilla/Sponge', 'Wet Sponge']),

        new Tile('rgb(86,81,39)', 'Wet Sponge').unGravity()
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Water', 'Steam'], ['Vanilla/Sponge', 'Sponge'])
            .combine(['Vanilla/Sponge', 'Sponge'], ['Vanilla/Sponge', 'Wet Sponge'], ['Vanilla/Sponge', 'Sponge']),

        new Tile('rgb(255,255,0)', 'Infinite Sponge').unGravity()
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Air', 'Air'], ['Vanilla/Sponge', 'Infinite Sponge']),
    ]
);

let air = mainTiles.resolveID('Vanilla/Air','Air');
