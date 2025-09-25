// Variation of: https://codepen.io/pixelkind/pen/WNLraMw
// -------------------- Inspirations --------------------
// Inspired by: https://www.youtube.com/watch?v=xw79GO2yk2Y&list=PLbLdd1fdNg5yp0x3_oRWeBur0FVX8PvFH&index=94
// (YouTube - DRAWING MACHINE 17 | Grid with line thicknesses, time-lapse (Pen Plotter Art w/ AxiDraw, Processing))

const size = 75;
const gap = 27;
const amount = 7;
const rotationMax = 15; // Maximum rotation angle in degrees
const nestedSquares = 7;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
  noLoop();
  noFill();

  // Perlin noise background
  // Variation of: https://codepen.io/pixelkind/pen/wvRMVwy
  noiseSeed(0);
  noStroke();
  const divider = 100;
  for (let x = 0; x < innerWidth; x++) {
    for (let y = 0; y < innerHeight; y++) {
      const value = noise(x / divider, y / divider) * 255;
      fill(value * 0.5, value * 0.5, value);
      rect(x, y, 1, 1);
    }
  }
}

function draw() {
  const startX = (width - (size + gap) * amount) / 2;
  const startY = (height - (size + gap) * amount) / 2;
  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      let x = startX + i * (size + gap);
      let y = startY + j * (size + gap);

      let dx = x - centerX;
      let dy = y - centerY;
      let distCenter = sqrt(dx * dx + dy * dy);
      let maxDist = sqrt(sq(width / 2) + sq(height / 2));
      let dynamicSize = size * (0.7 + 0.3 * (distCenter / maxDist));

      // Spin the squares
      let rotation = radians(random(-rotationMax, rotationMax));

      push();
      translate(x, y);
      rotate(rotation);

      // Draw nested squares
      for (let k = 0; k < nestedSquares; k++) {
        let s = dynamicSize * (1 - k * 0.15) * random(0.9, 1.05); // Random size
        strokeWeight(random(0.5, 2)); // Random stroke weight
        // Randomness in stroke color
        stroke(random(200, 255), random(200, 255), random(200, 255), 180);
        square(0, 0, s);
      }

      pop();
    }
  }
}
