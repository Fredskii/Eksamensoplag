let cirkelX = 830;
let cirkelY = 400;
let cirkelD = 25;

let joyX = 0;
let joyY = 0;

let canvasX = 1705;
let canvasY = 791;

// Opret ekstra canvas til de tilfældige cirkler
let cirkelCanvas;
let cirkler = [];

function setup() {
  createCanvas(canvasX, canvasY);
  
  cirkelCanvas = createGraphics(width, height);
  cirkelCanvas.noStroke();
  tegnCirkler();
}

function draw() {
  background(200);

  image(cirkelCanvas, 0, 0); // Tegn den ekstra canvas på den primære canvas

  Bevægelse();
  tjekKollision();
}

function tegnCirkler() {
  let antalCirkler = floor(random(40, 50));

  for (let i = 0; i < antalCirkler; i++) {
    let x = random(width);
    let y = random(height);
    let diameter = random(20, 40);
    let farve = color(random(255), random(255), random(255));

    cirkler.push({ x, y, diameter, farve });

    cirkelCanvas.fill(farve);
    cirkelCanvas.noStroke();
    cirkelCanvas.circle(x, y, diameter);
  }
}

function Bevægelse() {
  // Nulstil bevægelsen for hver frame
  joyX = 0;
  joyY = 0;

  // Bevægelsestaster
  if (keyIsDown(87)) { joyY = -5 }; // W eller op
  if (keyIsDown(83)) { joyY = 5 }; // S eller ned
  if (keyIsDown(65)) { joyX = -5 }; // A eller venstre
  if (keyIsDown(68)) { joyX = 5 }; // D eller højre

  // Opdater position
  cirkelX += joyX;
  cirkelY += joyY;

  // Væggene
  if (cirkelX > canvasX) { cirkelX = 0 };
  if (cirkelX < 0) { cirkelX = canvasX };
  if (cirkelY > canvasY) { cirkelY = 0 };
  if (cirkelY < 0) { cirkelY = canvasY };

  // Tegn den bevægelige cirkel
  circle(cirkelX, cirkelY, cirkelD);
}

function tjekKollision() {
  for (let i = cirkler.length - 1; i >= 0; i--) {
    let c = cirkler[i];
    let afstand = dist(cirkelX, cirkelY, c.x, c.y);
     
    // Hvis afstanden mellem de to cirkler er mindre end summen af deres radier udføres følgende
    if (afstand < (cirkelD / 2 + c.diameter / 2)) {
      if (cirkelD >= c.diameter) {
        cirkelD += 3; // Vokser hvis den er større
      } else {
        cirkelD -= 5; // Bliver mindre hvis den er mindre
        if (cirkelD < 20) { cirkelD = 20 }; // Minimumstørrelse
      }
      cirkler.splice(i, 1);
      opdaterCanvas(); // Fjerner alt indhold på cirkelCanvas, før der tegnes noget nyt
    }
  }
}

function opdaterCanvas() {
  cirkelCanvas.clear();
  for (let i = 0; i < cirkler.length; i++) {
    let c = cirkler[i];
    cirkelCanvas.fill(c.farve);
    cirkelCanvas.noStroke();
    cirkelCanvas.circle(c.x, c.y, c.diameter);
  }
}
