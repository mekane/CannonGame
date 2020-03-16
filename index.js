// Game Constants

// Game Elements
let balls = [];

// Graphics Context from view
let g; //main graphics context
let backgroundGraphicsContext;
let screenWidth = 300;
let screenHeight = 150;

function addBall(x, y, verticalAcceleration = 0, horizontalAcceleration = 0) {
    const ball = {
        xPosition: x,
        yPosition: y,
        verticalAcceleration,
        horizontalAcceleration
    };

    balls.push(ball);
    //balls[0] = ball;
}

function drawBalls() {
    balls.forEach(drawBall);
}

function drawBall(ball) {
    //console.log(`Draw ball (${ball.xPosition}, ${ball.yPosition}) at ${rectX}, ${rectY}`);

    const radius = 15;

    g.fillStyle = 'black';

    if (ball.hit) {
        g.fillStyle = '#11ff11';
    }
    else if (ball.crashed) {
        g.fillStyle = 'red';
    }

    g.beginPath();
    g.arc(ball.positionX, ball.positionY, radius, 0, 2 * Math.PI, false);
    g.strokeStyle = '#990000';
    g.stroke();
    g.fill();
    g.stroke();
}

function drawCastle() {
    backgroundGraphicsContext.save();

    backgroundGraphicsContext.strokeStyle = 'rgb(30, 30, 30)';
    backgroundGraphicsContext.lineWidth = 3;

    backgroundGraphicsContext.translate(screenWidth - 30, screenHeight);
    backgroundGraphicsContext.rotate(Math.PI);

    backgroundGraphicsContext.beginPath();
    backgroundGraphicsContext.moveTo(20, 0);
    backgroundGraphicsContext.lineTo(20, 65);
    backgroundGraphicsContext.lineTo(0, 80);
    backgroundGraphicsContext.lineTo(0, 100);
    backgroundGraphicsContext.lineTo(15, 100);
    backgroundGraphicsContext.lineTo(15, 80);
    backgroundGraphicsContext.lineTo(29, 80);
    backgroundGraphicsContext.lineTo(29, 100);
    backgroundGraphicsContext.lineTo(43, 100);
    backgroundGraphicsContext.lineTo(43, 80);
    backgroundGraphicsContext.lineTo(57, 80);
    backgroundGraphicsContext.lineTo(57, 100);
    backgroundGraphicsContext.lineTo(71, 100);
    backgroundGraphicsContext.lineTo(71, 80);
    backgroundGraphicsContext.lineTo(85, 80);
    backgroundGraphicsContext.lineTo(85, 100);
    backgroundGraphicsContext.lineTo(100, 100);
    backgroundGraphicsContext.lineTo(100, 80);
    backgroundGraphicsContext.lineTo(80, 65);
    backgroundGraphicsContext.lineTo(80, 0);
    backgroundGraphicsContext.stroke();

    backgroundGraphicsContext.fillStyle = '#d0d0d0';
    backgroundGraphicsContext.fill();

    backgroundGraphicsContext.restore();
}

function initBackground(canvasObject) {
    backgroundGraphicsContext = canvasObject.getContext('2d');
    screenWidth = canvasObject.width;
    screenHeight = canvasObject.height;

    console.log(`Initialize Background Canvas: dimensions ${canvasObject.width} x ${canvasObject.height}`);

    drawCastle();
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

    g.clearRect(0, 0, screenWidth, screenHeight);

    drawCastle();

    drawBalls();
}

function reset() {
    console.log('reset');

    balls = [];

    redraw();
}

function sendEvent(eventType, eventProperties) {
    if (eventType === 'click') {
        const x = eventProperties.x;
        const y = screenHeight - eventProperties.y;

        console.log(`click ${x}. ${y}`);
    }
    else {
        console.log(`event: ${eventType} `, eventProperties);
        return;
    }

    redraw();
}

function step() {
    console.log('step');

    //do physics loop
    balls.forEach(ball => {
        console.log(`ball (${ball.xPosition}, ${ball.yPosition})`);

        ball.verticalAcceleration -= 1; //gravity!

        ball.xPosition += ball.horizontalAcceleration;
        ball.yPosition += ball.verticalAcceleration;

        //check for collisions
        //TODO: put this in a general-purpose object list with an encapsulated hit() method
        if (ball.xPosition >= 59 && ball.xPosition <= 62 && ball.yPosition <= 3) {
            ball.hit = true;
            ball.horizontalAcceleration = 0;
            ball.verticalAcceleration = 0;
        }

        if (ball.verticalAcceleration < -3) //terminal velocity
            ball.verticalAcceleration = -3;

        if (ball.yPosition <= 0) { //hit ground
            ball.verticalAcceleration = 0;
            ball.horizontalAcceleration -= 3; //slow down but can still roll

            if (ball.horizontalAcceleration < 0)
                ball.horizontalAcceleration = 0;

            ball.yPosition = 0;
            ball.crashed = true;
        }
    });

    redraw();
}

export default {
    addBall,
    initBackground,
    initMain,
    redraw,
    reset,
    sendEvent,
    step
};
