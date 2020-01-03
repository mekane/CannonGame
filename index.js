// Game Constants
const gridSize = 50;
const gridThickness = 2;

// UI State

// Game Elements
let balls = [];

// Graphics Context from view
let g; //graphics context
let screenWidth = 300;
let screenHeight = 150;

function addBall(x, y) {
    const ball = {
        xPosition: x,
        yPosition: y,
        verticalAcceleration: 1,
        horizontalAcceleration: 0
    };

    //balls.push(ball);
    balls[0] = ball;
}

function click(screenX, screenY) {
    const x = screenX;
    const y = screenHeight - screenY;

    const squareX = Math.floor((x) / gridSize);
    const squareY = Math.floor((y) / gridSize);

    console.log(`click ${x}, ${y} -> square [${squareX}, ${squareY}]`);

    const rectX = 1 + squareX * (gridSize);
    const rectY = screenHeight - (1 + squareY * (gridSize));

    addBall(squareX, squareY);

    redraw();
}

function drawBalls() {
    console.log('draw', balls);
    if (balls.length) {
        balls.forEach(drawBall);
    }
}

function drawBall(ball) {
    const rectX = 1 + ball.xPosition * (gridSize);
    const rectY = screenHeight - (1 + ball.yPosition * (gridSize));

    console.log(`Draw ball (${ball.xPosition}, ${ball.yPosition}) at ${rectX}, ${rectY}`);

    const centerX = rectX + (gridSize / 2);
    const centerY = rectY - (gridSize / 2);
    const radius = (gridSize / 2) - 5;

    g.save();

    g.fillStyle = 'black';

    g.beginPath();
    g.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    g.fill();

    //context.lineWidth = 5;
    //context.strokeStyle = '#003300';
    //context.stroke();

    g.restore();
}

function hover(screenX, screenY) {
    const x = screenX;
    const y = screenHeight - screenY;

    const squareX = Math.floor((x) / gridSize);
    const squareY = Math.floor((y) / gridSize);

    const rectX = 1 + squareX * (gridSize);
    const rectY = screenHeight - (1 + squareY * (gridSize));

    // console.log(`mouse ${x}, ${y} -> square [${squareX}, ${squareY}]`);

    //g.fillStyle = '#dfd';
    //g.fillRect(rectX, rectY - gridSize, gridSize, gridSize)
}

function initGrid(canvasObject) {
    const gc = canvasObject.getContext('2d');

    const w = canvasObject.width;
    const h = canvasObject.height;

    console.log(`Initialize Grid Canvas: dimensions ${w} x ${h}`);

    gc.fillStyle = '#ddd';
    gc.fillRect(0, 0, w, h);

    gc.strokeStyle = 'rgb(30, 30, 30)';
    gc.lineWidth = gridThickness;

    for (let x = 1; x < w; x += gridSize) {
        gc.beginPath();
        gc.moveTo(x, 0);
        gc.lineTo(x, h);
        gc.stroke();
    }

    for (let y = 1; y < h; y += gridSize) {
        gc.beginPath();
        gc.moveTo(0, h - y);
        gc.lineTo(w, h - y);
        gc.stroke();
    }

}

function initMain(canvasObj) {
    g = canvasObj.getContext('2d');
    screenWidth = canvasObj.width;
    screenHeight = canvasObj.height;

    console.log(`Initialize Main Canvas: dimensions ${screenWidth} x ${screenHeight}`);

    reset();
}

function redraw() {
    if (!g) {
        console.error("Canvas not initialized");
        return;
    }
    console.log('redraw');

    g.clearRect(0, 0, screenWidth, screenHeight)

    drawBalls();
}

function reset() {
    console.log('reset')

    balls = [];

    redraw();
}

function step() {
    console.log('step')

    redraw();
}

export default {
    click,
    hover,
    initGrid,
    initMain,
    redraw,
    reset,
    step
};
