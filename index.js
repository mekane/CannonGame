// Game Constants
const gridSize = 50;
const gridThickness = 2;
const gridColor = 'rgb(30, 30, 30)';

// UI State
let showGrid = true;

// Graphics Context from view
let g; //graphics context
let screenWidth = 300;
let screenHeight = 150;

function click(screenX, screenY) {
    const x = screenX;
    const y = screenHeight - screenY;

    console.log(`click ${x}, ${y}`);
}

function drawBackground() {
    g.save();

    g.fillStyle = '#eee';
    g.fillRect(0, 0, screenWidth, screenHeight);

    g.restore();
}

function drawGrid() {
    if (!showGrid)
        return;

    g.save();

    g.strokeStyle = gridColor;
    g.lineWidth = gridThickness;

    for (let x = 1; x < screenWidth; x += gridSize) {
        g.moveTo(x, 0);
        g.lineTo(x, screenHeight);
        g.stroke();
    }

    for (let y = 1; y < screenHeight; y += gridSize) {
        g.moveTo(0, screenHeight - y);
        g.lineTo(screenWidth, screenHeight - y);
        g.stroke();
    }

    g.restore();
}

function init(canvasObj) {
    g = canvasObj.getContext('2d');

    screenWidth = canvasObj.width;
    screenHeight = canvasObj.height;

    console.log('context', g);
    console.log(`dimensions ${screenWidth} x ${screenHeight}`);

    reset();
}

function redraw() {
    if (!g) {
        console.error("Canvas not initialized");
        return;
    }
    console.log('redraw');

    drawBackground();
    drawGrid();
}

function reset() {
    console.log('reset')
}

function step() {
    console.log('step')
}

function toggleGrid() {
    showGrid = !showGrid;
    console.log(`grid ${showGrid ? 'on' : 'off'}`);
    redraw();
}

export default {
    click,
    init,
    toggleGrid,
    redraw,
    reset,
    step
};
