// Variation of: https://codepen.io/pixelkind/pen/qBLbzoW

const size = 60;
const gap = 30;
const amount = 6;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noLoop();
}

function drawCirclePattern(x, y, baseSize) {
  push();
  translate(x, y);

  for (let i = 0; i < 6; i++) {
    let col = color(
      random(50, 255),
      random(50, 255),
      random(50, 255),
      50 // Transparency
    );
    fill(col);
    stroke(0, 32);
    strokeWeight(random(0.5, 1.5));

    rotate(radians(15 * i));
    ellipse(0, 0, baseSize * (1 + i * 0.3), baseSize * (1 + i * 0.3));
  }

  pop();
}

// -------------------- Background --------------------
function drawRadialGradient() {
  let centerX = width / 2;
  let centerY = height / 2;
  noStroke();
  for (let r = max(width, height); r > 0; r -= 5) {
    let inter = map(r, 0, max(width, height), 0, 1);
    let c = lerpColor(color(23, 97, 130), color(0, 0, 0), inter);
    fill(c);
    ellipse(centerX, centerY, r * 2, r * 2);
  }
}

function draw() {
  drawRadialGradient(); // Draw gradient background

  const startX = (width - (size + gap) * amount) / 2;
  const startY = (height - (size + gap) * amount) / 2;

  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < amount; j++) {
      let x = startX + i * (size + gap);
      let y = startY + j * (size + gap);

      drawCirclePattern(x, y, size);
    }
  }
}
