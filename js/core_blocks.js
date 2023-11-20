/*
    Code for basic blocks that don't require 
    any unique or fancy attributes. 
    
    Think dirt, stone, etc.
*/

mainTiles.loadSet(
    'Vanilla/Core',
    [
        new Tile('none', 'Air').gravity(1.204, 4, 9800),
        new Tile('rgb(153, 102, 51)', 'Earth').gravity(1000, 1, 9800),

        new Tile('rgb(255, 102, 0)', 'Fire').gravity(1.15, 3, 9800)
            .combine(['Vanilla/Core', 'Water'], ['Vanilla/Core', 'Steam'], ['Vanilla/Core', 'Smoke']),

        new Tile('rgb(51, 153, 255)', 'Water').cohesion(2).cohesion(2, true).gravity(900, 2, 9800)
            .combine(['Vanilla/Core', 'Earth'], ['Vanilla/Core', 'Mud'], ['Vanilla/Core', 'Air'])
            .combine(['Vanilla/Core', 'Sand'], ['Vanilla/Core', 'Wet Sand'], ['Vanilla/Core', 'Air']),

        new Tile('rgb(53,46,32)', 'Mud').cohesion(2).gravity(950, 1.5, 9800),
        new Tile('rgb(252,224,133)', 'Sand').gravity(1500, 1, 9800)
            .combine(['Vanilla/Core', 'Fire'], ['Vanilla/Core', 'Air'], ['Vanilla/Core', 'Sand']),

        new Tile('rgb(117,111,86)', 'Wet Sand').cohesion(2).gravity(2000, 1, 18100)
            .combine(['Vanilla/Core', 'Fire'], ['Vanilla/Core', 'Air'], ['Vanilla/Core', 'Sand']),

        new Tile('rgb(208,232,237)', 'Steam').gravity(1.09, 3, 9800),
        new Tile('rgb(175,175,175)', 'Smoke').gravity(0.99, 3, 9800),
        new Tile('rgb(255,0,0)', 'Barrier').unGravity(),
        new Tile('rgb(145,201,152)', 'Slime').cohesion(5, true).gravity(900, 2, 9800),

        new Tile('rgb(158,150,91)', 'Sponge').unGravity()
            .combine(['Vanilla/Core', 'Water'], ['Vanilla/Core', 'Air'], ['Vanilla/Core', 'Wet Sponge']),

        new Tile('rgb(86,81,39)', 'Wet Sponge').unGravity() 
            .combine(['Vanilla/Core', 'Fire'], ['Vanilla/Core', 'Steam'], ['Vanilla/Core', 'Sponge'])
            .combine(['Vanilla/Core', 'Sponge'], ['Vanilla/Core', 'Wet Sponge'], ['Vanilla/Core', 'Sponge']),

        new Tile('rgb(255,255,0)', 'Infinite Sponge').unGravity()
            .combine(['Vanilla/Core', 'Water'], ['Vanilla/Core', 'Air'], ['Vanilla/Core', 'Infinite Sponge']),
    ]
);
