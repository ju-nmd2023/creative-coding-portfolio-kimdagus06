// Reference and variation of: https://www.tylerxhobbs.com/words/flow-fields
// -------------------- References --------------------
// Reference 1: Pogany. (n.d.). Regular flow field. CodePen. https://codepen.io/giaco/pen/RzERNL
// Reference 2: Hobbs, T. (2020, February 3). Flow fields. Tyler Hobbs. https://www.tylerxhobbs.com/words/flow-fields

let cols, rows;
let scale = 20; // grid cell size
let zoff = 0; // z-offset for 3D noise (time)
let inc = 0.1; // noise increment
let flowfield;
let particles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  cols = floor(width / scale);
  rows = floor(height / scale);

  flowfield = new Array(cols * rows);

  // ---------------- Radial Gradient Background ----------------
  drawRadialGradient();

  // Create particles
  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }
}

function drawRadialGradient() {
  let centerX = width / 2;
  let centerY = height / 2;
  noStroke();
  for (let r = max(width, height); r > 0; r -= 5) {
    let inter = map(r, 0, max(width, height), 0, 1);
    let c = lerpColor(color(15, 14, 26), color(255, 97, 97), inter);
    fill(c);
    ellipse(centerX, centerY, r * 2, r * 2);
  }
}

function draw() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2; // noise -> angle
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.003;

  // Update and show particles
  for (let p of particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    // Control alpha based on y-position for depth effect
    let alpha = map(p.pos.y, 0, height, 5, 25);
    p.show(alpha);
  }
}

// -------------------- Particle Class --------------------
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.prevPos = this.pos.copy();
  }

  // Update particle position by adding acceleration to velocity
  update() {
    this.vel.add(this.acc);
    this.vel.limit(
      this.maxspeed *
        (0.8 +
          0.4 * noise(this.pos.x * 0.01, this.pos.y * 0.01, frameCount * 0.01))
    );
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    let x = floor(this.pos.x / scale);
    let y = floor(this.pos.y / scale);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  show(alphaVal = 20) {
    stroke(20, 255, 169, alphaVal); // Line color
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.prevPos.set(this.pos.x, this.pos.y);
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.prevPos.x = this.pos.x;
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prevPos.x = this.pos.x;
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.prevPos.y = this.pos.y;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prevPos.y = this.pos.y;
    }
  }
}
