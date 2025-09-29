// -------------------- Inspirations --------------------
// Inspired by:  https://type-01.com/creative-coding-processes-and-sci-fi-inspirations-with-vivek-thakker/
// -------------------- References --------------------
// Reference 1: Ruijadom. (n.d.). Blackhole. CodePen. https://codepen.io/ruijadom/pen/jGKjML

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letterObjects = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(25);
  centerX = width / 2;
  centerY = height / 2;

  // Create letter objects with random properties
  for (let i = 0; i < letters.length; i++) {
    letterObjects.push({
      char: letters[i],
      angle: random(TWO_PI),
      radius: 100 + random(150),
      // Random direction and speed
      speed: (0.005 + random(0.1)) * (random() < 0.5 ? 1 : -1),
    });
  }

  textAlign(CENTER, CENTER);
  textFont("monospace");
}

function draw() {
  fill(25, 25, 25, 38);
  noStroke();
  rect(0, 0, width, height);

  for (let obj of letterObjects) {
    obj.angle += obj.speed;

    let x = centerX + cos(obj.angle) * obj.radius;
    let y = centerY + sin(obj.angle) * obj.radius;

    let shine = 0.4 + random(0.6);
    let size = 28 + random(6);
    fill(255, 255, 255, shine * 255);
    textSize(size);
    text(obj.char, x, y);
  }
}

function windowResized() {
  resizeCanvas(innerwWidth, innerHeight);
  centerX = width / 2;
  centerY = height / 2;
}
