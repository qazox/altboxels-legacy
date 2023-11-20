/*
    Code for basic blocks that don't require 
    any unique or fancy attributes. 
    
    Think dirt, stone, etc.
*/

mainTiles.loadSet(
    'Vanilla/Core',
    [
        new Tile('rgba(0, 0, 0, 0)', 'Air').gravity(1.204, 4),
        new Tile('rgb(153, 102, 51)', 'Earth').gravity(1000, 1),

        new Tile('rgb(255, 102, 0)', 'Fire').gravity(1.15, 3)
            .combine(['Vanilla/Core', 'Water'],['Vanilla/Core','Steam'],['Vanilla/Core','Smoke']),

        new Tile('rgb(51, 153, 255)', 'Water').cohesion().gravity(900, 2)
            .combine(['Vanilla/Core', 'Earth'],['Vanilla/Core','Mud'],['Vanilla/Core','Air'])
            .combine(['Vanilla/Core', 'Sand'],['Vanilla/Core','Wet Sand'],['Vanilla/Core','Air']),
            
        new Tile('rgb(53,46,32)', 'Mud').gravity(950, 1.5),
        new Tile('rgb(252,224,133)', 'Sand').gravity(1500, 1),
        new Tile('rgb(117,111,86)', 'Wet Sand').gravity(1200, 1),
        new Tile('rgb(208,232,237)', 'Steam').gravity(1.09, 3),
        new Tile('rgb(175,175,175)', 'Smoke').gravity(0.99, 3),
        new Tile('rgb(255,0,0)', 'Barrier')
    ]
);
