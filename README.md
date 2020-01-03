# Cannon Game

This is a toy app to play around with the simplified simulated
physics of shooting projectiles out of a cannon.

## Getting Started

Just clone the repo! No JS libraries are being used, so there's nothing to npm install.

## Running the App

Just open index.html in a browser. Any browser sufficiently modern should pick up on
the JS module syntax and find the JavaScript.

## Features

Currently, you can toggle the grid on and off, you can hover a square to see it
highlighted, you can click to place a single ball in a square, and you can click
reset to clear the board.

You can also step to proceed with one step of the physics, which will update
positions and redraw. The physics include acceleration due to gravity, a terminal
velocity, and crash detection (the ball turns red).

At present, clicking to add a ball just sets it in space with no initial acceleration.


