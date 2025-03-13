let cirkelX = 830;
let cirkelY = 400;
let cirkelR = 50;

let joyX = 0;
let joyY = 0;

let canvasX = 1705;
let canvasY = 791;

function setup() {
  createCanvas(canvasX, canvasY);
}

function draw() {
  background(200);
  Bevægelse();
}

function Bevægelse() {
  // Nulstil bevægelsen for hver frame
  joyX = 0;
  joyY = 0;

  // Bevægelsestaster
  if (keyIsDown(87)) {
    // W eller op
    joyY = -5;
  }
  if (keyIsDown(83)) {
    // S eller ned
    joyY = 5;
  }
  if (keyIsDown(65)) {
    // A eller venstre
    joyX = -5;
  }
  if (keyIsDown(68)) {
    // D eller højre
    joyX = 5;
  }

  // Opdater position
  cirkelX += joyX;
  cirkelY += joyY;

  // Væggene - wrap around
  if (cirkelX > canvasX) {
    cirkelX = 0;
  }
  if (cirkelX < 0) {
    cirkelX = canvasX;
  }
  if (cirkelY > canvasY) {
    cirkelY = 0;
  }
  if (cirkelY < 0) {
    cirkelY = canvasY;
  }

  // Tegn cirklerne
  circle(cirkelX, cirkelY, cirkelR);
  circle(cirkelX + canvasX, cirkelY, cirkelR);
  circle(cirkelX - canvasX, cirkelY, cirkelR);
  circle(cirkelX, cirkelY - canvasY, cirkelR);
  circle(cirkelX, cirkelY + canvasY, cirkelR);
}
