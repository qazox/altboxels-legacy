/*
    Code for basic blocks that don't require 
    any unique or fancy attributes. 
    
    Think dirt, stone, etc.
*/

mainTiles.loadSet(
    'Vanilla/Core',
    [
        new Tile('rgba(0, 0, 0, 0)', 'Air').gravity(1.204,4),
        new Tile('rgb(153, 102, 51)', 'Earth').gravity(1000,1),
        new Tile('rgb(255, 102, 0)', 'Fire').gravity(0.8,3),
        new Tile('rgb(51, 153, 255)', 'Water').cohesion().gravity(900,2),
    ]
);
