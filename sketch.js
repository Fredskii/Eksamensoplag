function setup() {
  createCanvas(1705, 791);
}
let cirkelX = 830;
let cirkelY = 400;
let cirkelR = 50;

let joyX = 0;
let joyY = 0;

let canvasX = 1705;
let canvasY = 791;

function draw(){
  background(200);
  circle(cirkelX,cirkelY,cirkelR);
  circle(cirkelX+canvasX, cirkelY,cirkelR);
  circle(cirkelX-canvasX, cirkelY,cirkelR);
  circle(cirkelX,cirkelY-canvasY, cirkelR);
  circle(cirkelX,cirkelY+canvasY, cirkelR);
  
  // Bevægelse
  let joyX = 0;
  let joyY = 0;

 // Bevægelsestaster
 if(keyIsDown(87)){
  // W eller op
  joyY = -3;
 }
 if(keyIsDown(83)){
  // S eller ned
  joyY = 3;
}
  if(keyIsDown(65)){
    // A eller venstre
    joyX = -3;
  }
  if(keyIsDown(68)){
    // D eller højre
    joyX = 3;
  }
  cirkelX += joyX;
  cirkelY += joyY;

  // Væggene
  if(cirkelX > canvasX){
    cirkelX = 0;
  }
  if(cirkelX < 0){
    cirkelX = canvasX;
  }
  if(cirkelY > canvasY){
    cirkelY = 0;
  }
  if(cirkelY < 0){
    cirkelY = canvasY;
  }

}
