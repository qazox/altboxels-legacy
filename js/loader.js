/*
    Secure JSON loader for modding purposes.

    Unless you want to do something really fancy
    or provide a basis for more mods,
    do not use raw JavaScript.
    
    Instead, use a JSON file to contain your mod's
    content, and ask me for essential features to be
    added.

    This isn't finished entirely, but should give a
    decent basis for modding in the future.
*/

legalFuncs = [
    "gravity",
    "cohesion"
]

function loadTiles(stuff) {
    for (item in stuff) {
        let params = stuff[item].params;
        stuff[item] = new Tile(stuff[item].color, stuff[item].name);
        for (let param of params) {
            if (legalFuncs.indexOf(param.func) == -1) {
                console.warn('This function is not supported!');
                continue;
            }
            stuff[item] = stuff[item][param.func](...param.options)
        }
    }
    return stuff;
}

function loadMod(stuff) {
    for (let thing of stuff) {
        mainTiles.loadSet(
            thing.namespace,
            loadTiles(thing.content)
        )
    }
}


/*
loadMod([
    {
        'namespace': 'TestMod/CoolStuff',
        'content': [
            {
                'color': 'rgba(69,69,69)',
                'name': 'Test Item',
                'params': [
                    {
                        'func': 'cohesion',
                        'options': []
                    },
                    {
                        'func': 'gravity',
                        'options': [50000, 7]
                    }
                ]
            }
        ]
    }
])
*/