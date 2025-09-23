// Variation of: https://codepen.io/pixelkind/pen/poqEaoG
let particles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();
  createParticles(width / 2, height / 2, 0);
}

class Particle {
  constructor(x, y, degree, generation) {
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.degree = degree + random(-5, 5);
    this.maxLife = 10 + Math.floor(Math.random() * 10);
    this.life = 0;
    this.generation = generation;
    this.alpha = 0.5;
  }

  move() {
    this.lastX = this.x;
    this.lastY = this.y;
    let speed = random(0.5, 2);
    this.x += cos(radians(this.degree)) * speed;
    this.y += sin(radians(this.degree)) * speed;
    this.life++;
    this.alpha *= 0.95; // fade
  }

  draw() {
    stroke(200, 50, 100, this.alpha);
    strokeWeight(1.2);
    line(this.lastX, this.lastY, this.x, this.y);
  }
}

function createParticles(x, y, generation) {
  let numParticles = 30;
  for (let i = 0; i < numParticles; i++) {
    let angle = (360 / numParticles) * i;
    particles.push(new Particle(x, y, angle, generation));
  }
}

function draw() {
  background(0, 0, 0, 0.05); // Leave a fading trail

  // Randomly create new particle bursts
  if (frameCount % 15 === 0) {
    createParticles(random(width), random(height), 0);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.draw();
    p.move();

    if (p.life >= p.maxLife) {
      particles.splice(i, 1);
      if (p.generation < 1) {
        // Small chance to create new particles upon death
        for (let j = 0; j < 2; j++) {
          let newAngle = p.degree + random(-20, 20);
          particles.push(new Particle(p.x, p.y, newAngle, p.generation + 1));
        }
      }
    }
  }
}
