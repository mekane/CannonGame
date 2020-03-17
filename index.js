// Game Constants
const cannonBarrelLength = 125;
const cannonBarrelWidth = 8;
const cannonBodyRadius = 50;
const cannonOffsetX = 75;

const towerWidth = 100;
const towerHeight = 100;

const minPower = 50;
const maxPower = 100;
const minAngle = 5;
const maxAngle = 85;

const G = -4;
const terminalVelocity = -24;

// Game Elements
let balls = [];

// Graphics Context from view
let g; //main graphics context
let backgroundGraphicsContext;
let screenWidth = 300;
let screenHeight = 150;
let towerX = screenWidth;
let towerY = screenHeight;

let gunAngle = 45;
let gunPower = 30;

let barrelEndX = 0;
let barrelEndY = 0;

const twoPiOver180 = Math.PI / 180;

function addBall(x, y, horizontalAcceleration = 0, verticalAcceleration = 0) {
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
    //console.log(`Draw ball (${ball.xPosition}, ${screenHeight - ball.yPosition})`);

    g.beginPath();
    g.arc(ball.xPosition, screenHeight - ball.yPosition, 5, 0, 2 * Math.PI);
    g.fillStyle = '#999';

    if (ball.hit) {
        g.fillStyle = '#11ff11';
    }
    else if (ball.crashed) {
        g.fillStyle = '#997777';
    }

    g.fill();

    /*
    const radius = 80;

    g.beginPath();

    g.fillStyle = 'black';

    if (ball.hit) {
        g.fillStyle = '#11ff11';
    }
    else if (ball.crashed) {
        g.fillStyle = 'red';
    }

    g.arc(ball.positionX, screenHeight - ball.positionY, radius, 0, 2 * Math.PI, false);
    g.fill();
    g.strokeStyle = '#990000';
    g.stroke();
    */
}

function drawCannonBarrel(degrees) {
    const rads = degrees * twoPiOver180;
    const xPart = Math.cos(rads);
    const yPart = Math.sin(rads);

    const barrelBaseX = cannonOffsetX + xPart * cannonBodyRadius;
    const barrelBaseY = yPart * cannonBodyRadius;

    barrelEndX = cannonOffsetX + (cannonBarrelLength * xPart);
    barrelEndY = cannonBarrelLength * yPart;

    g.beginPath();
    g.strokeStyle = "black";
    g.lineWidth = cannonBarrelWidth;
    g.moveTo(barrelBaseX, screenHeight - barrelBaseY);
    g.lineTo(barrelEndX, screenHeight - barrelEndY);
    g.stroke();
}

function drawCannonBody() {
    backgroundGraphicsContext.save();

    backgroundGraphicsContext.beginPath();
    backgroundGraphicsContext.fillStyle = '#333';
    backgroundGraphicsContext.arc(cannonOffsetX, screenHeight, cannonBodyRadius, Math.PI, 0, false);
    backgroundGraphicsContext.fill();

    backgroundGraphicsContext.restore();
}

function drawTower() {
    backgroundGraphicsContext.save();

    backgroundGraphicsContext.strokeStyle = 'rgb(30, 30, 30)';
    backgroundGraphicsContext.lineWidth = 3;

    towerX = screenWidth - 30;

    backgroundGraphicsContext.translate(towerX, screenHeight);
    backgroundGraphicsContext.rotate(Math.PI);

    const turretHeight = 35;
    const turretStart = towerHeight - turretHeight;
    const battlementHeight = 20;
    const battlementBottom = towerHeight - battlementHeight;

    backgroundGraphicsContext.beginPath();
    backgroundGraphicsContext.moveTo(20, 0);
    backgroundGraphicsContext.lineTo(20, turretStart);
    backgroundGraphicsContext.lineTo(0, battlementBottom);
    backgroundGraphicsContext.lineTo(0, towerHeight);
    backgroundGraphicsContext.lineTo(15, towerHeight);
    backgroundGraphicsContext.lineTo(15, battlementBottom);
    backgroundGraphicsContext.lineTo(29, battlementBottom);
    backgroundGraphicsContext.lineTo(29, towerHeight);
    backgroundGraphicsContext.lineTo(43, towerHeight);
    backgroundGraphicsContext.lineTo(43, battlementBottom);
    backgroundGraphicsContext.lineTo(57, battlementBottom);
    backgroundGraphicsContext.lineTo(57, towerHeight);
    backgroundGraphicsContext.lineTo(71, towerHeight);
    backgroundGraphicsContext.lineTo(71, battlementBottom);
    backgroundGraphicsContext.lineTo(85, battlementBottom);
    backgroundGraphicsContext.lineTo(85, towerHeight);
    backgroundGraphicsContext.lineTo(100, towerHeight);
    backgroundGraphicsContext.lineTo(100, battlementBottom);
    backgroundGraphicsContext.lineTo(80, turretStart);
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

    //console.log(`Initialize Background Canvas: dimensions ${canvasObject.width} x ${canvasObject.height}`);

    drawCannonBody();
    drawTower();
}

function initMain(canvasObj) {
    g = canvasObj.getContext('2d');
    screenWidth = canvasObj.width;
    screenHeight = canvasObj.height;

    //console.log(`Initialize Main Canvas: dimensions ${screenWidth} x ${screenHeight}`);

    reset();
}

function redraw() {
    if (!g) {
        console.error("Canvas not initialized");
        return;
    }

    g.clearRect(0, 0, screenWidth, screenHeight);

    drawBalls();

    drawCannonBarrel(gunAngle);
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
    else if (eventType === 'changeGunAngle') {
        const direction = eventProperties.direction;
        if (direction === 'up')
            gunAngle = Math.min(maxAngle, gunAngle + 1);
        else if (direction === 'down')
            gunAngle = Math.max(minAngle, gunAngle - 1);

        console.log(`angle ${gunAngle}`);
    }
    else if (eventType === 'changeGunPower') {
        const direction = eventProperties.direction;
        if (direction === 'up')
            gunPower = Math.min(maxPower, gunPower + 1);
        else if (direction === 'down')
            gunPower = Math.max(minPower, gunPower - 1);

        console.log(`power ${gunPower}`);
    }
    else if (eventType === 'fire') {
        const rads = gunAngle * twoPiOver180;
        const xPart = Math.cos(rads);
        const yPart = Math.sin(rads);

        const xAccel = (xPart * gunPower);
        const yAccel = (yPart * gunPower);

        addBall(barrelEndX, barrelEndY, xAccel, yAccel);
    }
    else {
        console.log(`event: ${eventType} `, eventProperties);
        return;
    }

    redraw();
}

function step() {
    //do physics loop
    balls.forEach(ball => {
        console.log(`ball (${ball.xPosition}, ${ball.yPosition}) => [${ball.horizontalAcceleration}, ${ball.verticalAcceleration}]`);

        ball.verticalAcceleration += G;

        ball.xPosition += ball.horizontalAcceleration;
        ball.yPosition += ball.verticalAcceleration;

        //check for collisions
        //TODO: put this in a general-purpose object list with an encapsulated hit() method
        if (ball.xPosition >= towerX && ball.xPosition <= (towerX + towerWidth) && ball.yPosition <= towerHeight) {
            ball.hit = true;
            ball.horizontalAcceleration = 0;
            ball.verticalAcceleration = 0;
        }

        if (ball.verticalAcceleration < terminalVelocity)
            ball.verticalAcceleration = terminalVelocity;

        if (ball.yPosition <= 0) { //hit ground
            ball.verticalAcceleration = 0;
            ball.horizontalAcceleration -= (Math.ceil(ball.horizontalAcceleration / 3)); //slow down but can still roll

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
