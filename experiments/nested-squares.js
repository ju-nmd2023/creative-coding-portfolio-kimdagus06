// Variation of: https://codepen.io/pixelkind/pen/WNLraMw and variation 2
// -------------------- Inspirations --------------------
// Inspired by: https://www.youtube.com/watch?v=xw79GO2yk2Y&list=PLbLdd1fdNg5yp0x3_oRWeBur0FVX8PvFH&index=94
// (YouTube - DRAWING MACHINE 17 | Grid with line thicknesses, time-lapse (Pen Plotter Art w/ AxiDraw, Processing))
const size = 65;
const gap = 22;
const amount = 20;
const nestedSquares = 7;
const rotationMax = 15;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  noLoop();
  noFill();
}

function drawTile(x, y, baseSize) {
  push();
  translate(x, y);

  // Rotate randomly within a range
  let rotation = radians(random(-rotationMax, rotationMax));
  rotate(rotation);

  fill(random(150, 255), random(150, 255), random(150, 255), 180);

  // Nested squares
  for (let k = 0; k < nestedSquares; k++) {
    let s = baseSize * (1 - k * 0.15) * random(0.9, 1.05);
    strokeWeight(random(0.5, 2));
    stroke(random(200, 255), random(200, 255), random(200, 255), 180);
    square(0, 0, s);
  }

  pop();
}

function draw() {
  background(8, 7, 7); // Dark background

  const startX = (width - (size + gap) * amount) / 2 + size / 2;
  const startY = (height - (size + gap) * amount) / 2 + size / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = sqrt(sq(width / 2) + sq(height / 2));

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      let x = startX + i * (size + gap);
      let y = startY + j * (size + gap);

      // Size variation based on distance to center
      let dx = x - centerX;
      let dy = y - centerY;
      let distCenter = sqrt(dx * dx + dy * dy);
      let dynamicSize = size * (0.7 + 0.3 * (distCenter / maxDist));

      drawTile(x, y, dynamicSize);
    }
  }
}
