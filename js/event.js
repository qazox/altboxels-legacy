/*
    Code for handling events.
*/

function GameEvent(type, target, data, canvas) {
    this.type = type;
    this.data = data;
    this.canvas = canvas;
    this.target = target;

    for (let interaction in target.interactions) {
        target.interactions[interaction](this);
    }
}