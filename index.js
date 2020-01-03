// Game Constants
const gridSize = 50;
const gridThickness = 2;

// UI State
let highlightedSquareX = -1;
let highlightedSquareY = -1;

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
        verticalAcceleration: 0,
        horizontalAcceleration: 0
    };

    //balls.push(ball);
    balls[0] = ball;
}

function click(screenX, screenY) {
    const y = screenHeight - screenY;

    const squareX = Math.floor((screenX) / gridSize);
    const squareY = Math.floor((y) / gridSize);

    //console.log(`click ${x}, ${y} -> square [${squareX}, ${squareY}]`);

    addBall(squareX, squareY);

    redraw();
}

function drawBalls() {
    balls.forEach(drawBall);
}

function drawBall(ball) {
    const rectX = 1 + ball.xPosition * (gridSize);
    const rectY = screenHeight - (1 + ball.yPosition * (gridSize));

    //console.log(`Draw ball (${ball.xPosition}, ${ball.yPosition}) at ${rectX}, ${rectY}`);

    const centerX = rectX + (gridSize / 2);
    const centerY = rectY - (gridSize / 2);
    const radius = (gridSize / 2) - 5;

    g.save();

    g.fillStyle = 'black';

    if (ball.crashed)
        g.fillStyle = 'red';

    g.beginPath();
    g.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    g.fill();

    //context.lineWidth = 5;
    //context.strokeStyle = '#003300';
    //context.stroke();

    g.restore();
}

function hover(screenX, screenY) {
    const y = screenHeight - screenY;

    highlightedSquareX = Math.floor((screenX) / gridSize);
    highlightedSquareY = Math.floor((y) / gridSize);

    //console.log(`mouse ${x}, ${y} -> square [${squareX}, ${squareY}]`);

    redraw();
}

function initGrid(canvasObject) {
    const gc = canvasObject.getContext('2d');

    const w = canvasObject.width;
    const h = canvasObject.height;

    console.log(`Initialize Grid Canvas: dimensions ${w} x ${h}`);

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

    g.clearRect(0, 0, screenWidth, screenHeight)

    //Highlight square
    g.fillStyle = '#d0d0d0';
    const rectX = 2 + highlightedSquareX * (gridSize);
    const rectY = screenHeight - (highlightedSquareY * (gridSize));
    g.fillRect(rectX, rectY - gridSize, gridSize - 2, gridSize - 2);

    drawBalls();
}

function reset() {
    console.log('reset');

    balls = [];

    redraw();
}

function step() {
    console.log('step');

    //do physics loop
    balls.forEach((ball) => {
        ball.verticalAcceleration -= 1; //gravity!

        ball.xPosition += ball.horizontalAcceleration;
        ball.yPosition += ball.verticalAcceleration;

        if (ball.verticalAcceleration < -3) //terminal velocity
            ball.verticalAcceleration = -3;

        if (ball.yPosition <= 0) {
            ball.verticalAcceleration = 0;
            ball.horizontalAcceleration -= 3;

            if (ball.horizontalAcceleration < 0)
                ball.horizontalAcceleration = 0;

            ball.yPosition = 0;
            ball.crashed = true;
        }
    });

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
