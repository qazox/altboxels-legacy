/*
    Code for most implemented blocks. 

    This code isn't in JSON form for reading purposes.

    If you want to add a modification, use the JSON format
    documented in [js/loader.js].
*/

mainTiles.loadSet(
    'Vanilla/Air',
    [
        new Tile('none', 'Air').gravity(1.204, 4, 9800),
        new Tile('rgb(175,175,175)', 'Smoke').gravity(0.99, 3, 9800),
    ]
);


mainTiles.loadSet(
    'Vanilla/Earth',
    [
        new Tile('rgb(153, 102, 51)', 'Earth').gravity(1000, 1, 9800),
        new Tile('rgb(53,46,32)', 'Mud').cohesion(2).gravity(950, 1.5, 9800),
        new Tile('rgb(252,224,133)', 'Sand').gravity(1500, 1, 9800)
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Air', 'Air'], ['Vanilla/Earth', 'Sand']),

        new Tile('rgb(117,111,86)', 'Wet Sand').cohesion(2).gravity(2000, 1, 18100)
            .combine(['Vanilla/Fire', 'Fire'], ['Vanilla/Air', 'Air'], ['Vanilla/Earth', 'Sand']),
    ]
)

mainTiles.loadSet(
    'Vanilla/Water',
    [

        new Tile('rgb(51, 153, 255)', 'Water').cohesion(2).cohesion(2, true).gravity(900, 2, 9800)
            .combine(['Vanilla/Earth', 'Earth'], ['Vanilla/Earth', 'Mud'], ['Vanilla/Air', 'Air'])
            .combine(['Vanilla/Earth', 'Sand'], ['Vanilla/Earth', 'Wet Sand'], ['Vanilla/Air', 'Air']),

        new Tile('rgb(208,232,237)', 'Steam').gravity(1.09, 3, 9800),
    ]
)

mainTiles.loadSet(
    'Vanilla/Fire',
    [
        new Tile('rgb(255, 102, 0)', 'Fire').gravity(1.15, 3, 9800)
            .combine(['Vanilla/Water', 'Water'], ['Vanilla/Water', 'Steam'], ['Vanilla/Air', 'Smoke']),
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


mainTiles.loadSet(
    'Vanilla/Misc',
    [
        new Tile('rgb(255,0,0)', 'Barrier').unGravity(),
        new Tile('rgb(145,201,152)', 'Slime').cohesion(5, true).gravity(900, 2, 9800)
    ]
);

mainTiles.loadSet(
    'Vanilla/Conway\'s Game of Life',
    [
        new Tile('rgb(245,245,245)', 'Alive Cell').life(
            ['Vanilla/Conway\'s Game of Life', 'Alive Cell'],
            ['Vanilla/Conway\'s Game of Life', 'Dead Cell']),

        new Tile('rgb(10,10,10)', 'Dead Cell').life(
            ['Vanilla/Conway\'s Game of Life', 'Alive Cell'],
            ['Vanilla/Conway\'s Game of Life', 'Dead Cell']),
    ]
);
