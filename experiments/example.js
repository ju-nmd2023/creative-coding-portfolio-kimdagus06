const size = 80;
const gap = 30;
const amount = 40;

function setup() {
  createCanvas(innerWidth, innerHeight);
  rectMode(CENTER);
}

function drawGrid(rotation, iteration) {
  const centerX = width / 2;
  const centerY = height / 2;

  for (let x = -Math.floor(amount / 2); x < Math.ceil(amount / 2); x++) {
    for (let y = -Math.floor(amount / 2); y < Math.ceil(amount / 2); y++) {
      let xPosition = centerX + x * (size + gap);
      let yPosition = centerY + y * (size + gap);

      if (amount % 2 === 0) {
        xPosition += size / 2;
      }

      push();
      translate(xPosition, yPosition);
      rotate(rotation);

      // Random color fill 30% of the time
      if (Math.random() > 0.7) {
        let fillColor = color(
          random(100, 255),
          random(50, 255),
          random(50, 255),
          200
        );
        fill(fillColor);
        stroke(fillColor);
        rotate((Math.PI / 20) * Math.random());
      } else {
        noFill();
        stroke(0, 0, 10, 100);
      }

      if (iteration % 2 === 0) {
        square(0, 0, size);
      } else {
        ellipse(0, 0, size);

        // Draw points in a circle
        strokeWeight(4);
        for (let a = 0; a < 360; a += 15) {
          let r = (size / 2) * 0.7;
          let px = cos(radians(a)) * r;
          let py = sin(radians(a)) * r;
          point(px, py);
        }
      }

      pop();
    }
  }
}

function draw() {
  background(255);
  strokeWeight(1);

  for (let i = 0; i < 30; i++) {
    drawGrid(i * 0.5, i);
  }

  noLoop();
}
