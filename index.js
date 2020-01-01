let drawGrid = true;

function redraw() {
    console.log('redraw')
}

function reset() {
    console.log('reset')
}

function step() {
    console.log('step')
}

function toggleGrid() {
    drawGrid = !drawGrid;
    console.log(`grid ${drawGrid ? 'on' : 'off'}`)
}

export default {
    toggleGrid,
    redraw,
    reset,
    step
};
