let cirkelX = 830; let cirkelY = 400; let cirkelD = 25;
let joyX = 0; let joyY = 0;
let canvasX = 1705; let canvasY = 791;
let cirkelCanvas; 
let cirkler = [];

function setup() {
  createCanvas(canvasX, canvasY);
  cirkelCanvas = createGraphics(width, height); // Opret ekstra canvas til de tilfældige cirkler
  tegnCirkler();
  opdaterCanvas(); 

  genstartKnap = createButton("Genstart").position(width / 2 - 50, height / 2 + 60).size(100, 40).hide();
}

function draw() {
  if (cirkelD < 20 || cirkler.length < 1) {
    background(200); textAlign(CENTER, CENTER);
    textSize(50); text("GAME OVER", width / 2, height / 2);
    genstartKnap.show();
    return; 
  }

  background(200);
  image(cirkelCanvas, 0, 0); // Tegn den ekstra canvas på den primære canvas
  Bevægelse();
  tjekKollision();
}

function tegnCirkler() {
  let antalCirkler = floor(random(40, 60));

  for (let i = 0; i < antalCirkler; i++) {
    let x = random(width);
    let y = random(height);
    let diameter = round(random(20, 40));
    let farve = color(random(255), random(255), random(255));

    cirkler.push({ x, y, diameter, farve });
    cirkelCanvas.fill(farve);
    cirkelCanvas.noStroke();
    cirkelCanvas.circle(x, y, diameter);
    
    // Cirklernes diameter vises på cirklerne 
    cirkelCanvas.fill(0); cirkelCanvas.textAlign(CENTER, CENTER);
    cirkelCanvas.textSize(diameter / 2); cirkelCanvas.text(diameter, x, y+1) 
  }
}

function Bevægelse() {
  joyX = 0; joyY = 0; // Nulstil bevægelsen for hver frame

  // Bevægelsestaster
  if (keyIsDown(87)) { joyY = -6 }; // W eller op
  if (keyIsDown(83)) { joyY = 6 }; // S eller ned
  if (keyIsDown(65)) { joyX = -6 }; // A eller venstre
  if (keyIsDown(68)) { joyX = 6 }; // D eller højre

  // Lige hurtigt bevægelse i hver retning
  let hastighed = 6; let længde = sqrt(joyX * joyX + joyY * joyY);
  if (længde > 0) { joyX = joyX / længde * hastighed; joyY = joyY / længde * hastighed; }
  
  cirkelX += joyX; cirkelY += joyY; // Opdater position

  // Væggene
  if (cirkelX > canvasX) { cirkelX = 0 };
  if (cirkelX < 0) { cirkelX = canvasX };
  if (cirkelY > canvasY) { cirkelY = 0 };
  if (cirkelY < 0) { cirkelY = canvasY };

  circle(cirkelX, cirkelY, cirkelD); // Tegn den bevægelige cirkel
  textAlign(CENTER, CENTER); textSize(cirkelD / 2); text(cirkelD, cirkelX, cirkelY+1); // Den bevægelige cirkels diameter vises 
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

    if (cirkelD >= c.diameter) {
      cirkelCanvas.stroke(0, 255, 0); // Grøn kant hvis man er større
    } else {
      cirkelCanvas.stroke(255, 0, 0); // Rød kant hvis den er farlig
    }

    cirkelCanvas.strokeWeight(2); cirkelCanvas.fill(c.farve); cirkelCanvas.circle(c.x, c.y, c.diameter); 
    cirkelCanvas.noStroke(); cirkelCanvas.fill(0); cirkelCanvas.textAlign(CENTER, CENTER); 
    cirkelCanvas.textSize(c.diameter / 2); cirkelCanvas.text(c.diameter, c.x, c.y + 1);
  }
}

function mousePressed() {
  if (genstartKnap.mousePressed()) {
    cirkelD = 25; cirkelX = canvasX / 2; cirkelY = canvasY / 2; cirkler = [];
    tegnCirkler();
    opdaterCanvas();
    genstartKnap.hide(); 
  }
}

