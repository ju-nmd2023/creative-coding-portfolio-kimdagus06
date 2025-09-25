// Variation of: https://codepen.io/pixelkind/pen/poqEaoG
// -------------------- References --------------------
// Reference 1: Blanchette, M. (n.d.). Fireworks simulation [Code]. In J. Heglund (Animations). The Coding Train. https://thecodingtrain.com/challenges/27-fireworks
// Reference 2: Heglund, J. (n.d.). Fireworks sketch [Online sketch]. p5.js Editor. https://editor.p5js.org/codingtrain/sketches/O2M0SO-WO

let particles = [];
let t = 0; // time variable
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  background(0);
  strokeWeight(2);
}

function draw() {
  fill(0, 0, 0, 20);
  noStroke();
  rect(0, 0, width, height);

  if (frameCount % 10 === 0) {
    let x = width / 2 + sin(t) * (width / 3);
    let y = random(height * 0.1, height);
    createParticles(x, height, 0);
    t += 0.1;
  }

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].draw();
    particles[i].move();
    if (particles[i].life >= particles[i].maxLife) {
      let p = particles[i];
      particles.splice(i, 1);
      // chain reaction
      if (p.generation < 1) {
        createParticles(p.x, p.y, p.generation + 1);
      }
    }
  }
}

// -------------------- Particle Class --------------------
class Particle {
  constructor(x, y, degree, r, g, b, generation) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.degree = degree;
    this.maxLife = 10 + Math.floor(Math.random() * 20);
    this.r = r;
    this.g = g;
    this.b = b;
    this.life = 0;
    this.generation = generation;

    // velocity and gravity
    let speed = random(3, 8);
    this.vel = createVector(
      Math.cos((degree / 180) * PI) * speed,
      Math.sin((degree / 180) * PI) * speed - 5
    );
  }

  move() {
    this.lastX = this.x;
    this.lastY = this.y;
    this.vel.add(gravity);
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.life++;
  }

  draw() {
    stroke(this.r, this.g, this.b, 0.2);
    line(this.lastX, this.lastY, this.x, this.y);
  }
}

// -------------------- Create particle --------------------
function createParticles(x, y, generation) {
  let r = random(360);
  let g = random(50, 100);
  let b = random(50, 100);
  let numParticles = 50 + Math.floor(Math.random() * 50);
  for (let i = 0; i < numParticles; i++) {
    let degree = map(i, 0, numParticles, 0, 360);
    particles.push(new Particle(x, y, degree, r, g, b, generation));
  }
}
