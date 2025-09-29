// -------------------- Inspirations --------------------
// Variation of: https://codepen.io/pixelkind/pen/qBLbzoW

const size = 90;
const gap = 10;
const amount = 7;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  noLoop();
}

function drawTile(x, y) {
  push();
  translate(x, y);

  // The outer square border
  fill(color(20, 30, 60));
  stroke(0);
  strokeWeight(2);
  square(0, 0, size);

  // Inside square layers
  let layers = 5;
  for (let i = 1; i < layers; i++) {
    let s = size - (i * size) / layers;
    let rot = (PI / 12) * i;

    push();
    rotate(rot);

    let palette = [
      color(255, 179, 186, 220),
      color(255, 223, 186, 220),
      color(255, 255, 186, 220),
      color(186, 255, 201, 220),
      color(186, 225, 255, 220),
      color(220, 186, 255, 220),
    ];
    let c = random(palette);

    fill(c);
    stroke(255);
    square(0, 0, s);

    pop();
  }

  pop();
}

function draw() {
  background(255);
  let y = (height - size * amount - gap * (amount - 1)) / 2;
  for (let i = 0; i < amount; i++) {
    let x = (width - size * amount - gap * (amount - 1)) / 2;
    for (let k = 0; k < amount; k++) {
      drawTile(x + size / 2, y + size / 2);
      x += size + gap;
    }
    y += size + gap;
  }
}
