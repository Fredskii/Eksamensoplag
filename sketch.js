let cirkelX = 830;
let cirkelY = 400;
let cirkelR = 50;

let joyX = 0;
let joyY = 0;

let canvasX = 1705;
let canvasY = 791;

// Opret ekstra canvas til de tilfældige cirkler
let cirkelCanvas;

function setup() {
  createCanvas(canvasX, canvasY);
  
  // Opret en ekstra canvas til de tilfældige cirkler
  cirkelCanvas = createGraphics(width, height);
  
  tegnCirkler();
}

function draw() {
  background(200);

  // Tegn den ekstra canvas på den primære canvas
  image(cirkelCanvas, 0, 0);
  
  Bevægelse();
}

function tegnCirkler() {
  let antalCirkler = floor(random(30, 40));
  
  for (let i = 0; i < antalCirkler; i++) {
    let x = random(width);
    let y = random(height);
    let radius = random(20, 40);
    let farve = color(random(255), random(255), random(255));
    
    cirkelCanvas.fill(farve);
    cirkelCanvas.circle(x, y, radius);
  }
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

  // Tegn den bevægelige cirkel
  circle(cirkelX, cirkelY, cirkelR);
}
