// Variation of: https://codepen.io/pixelkind/pen/poqEaoG

// -------------------- References --------------------
// Reference 1: Blanchette, M. (n.d.). Fireworks simulation [Code]. In J. Heglund (Animations). The Coding Train. https://thecodingtrain.com/challenges/27-fireworks
// Reference 2: Heglund, J. (n.d.). Fireworks sketch [Online sketch]. p5.js Editor. https://editor.p5js.org/codingtrain/sketches/O2M0SO-WO

const fireworks = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  gravity = createVector(0, 0.2);
  strokeWeight(2);
  background(0);
}

function draw() {
  colorMode(RGB);
  background(0, 0, 0, 25); // fading trail

  if (random(1) < 0.04) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();

    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

// -------------------- Firework Class --------------------
class Firework {
  constructor() {
    this.hu = random(360);
    this.firework = new Particle(random(width), height, true, this.hu);
    this.exploded = false;
    this.particles = [];
  }

  done() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      let p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        false,
        this.hu
      );
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    for (let p of this.particles) {
      p.show();
    }
  }
}

// -------------------- Particle Class --------------------
class Particle {
  constructor(x, y, firework, hu) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.hu = hu;
    this.alpha = 1;
    this.size = firework ? 8 : random(2, 5);
    if (firework) {
      this.vel = createVector(0, random(-12, -8));
    } else {
      const angle = random(TWO_PI);
      const speed = random(2, 10);
      this.vel = p5.Vector.fromAngle(angle);
      this.vel.mult(speed);
    }
    this.acc = createVector(0, 0);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.9); // air resistance for exploded particles
      this.alpha -= 0.02;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  done() {
    return this.alpha < 0;
  }

  show() {
    colorMode(HSB);
    if (!this.firework) {
      stroke(this.hu, 255, 255, this.alpha);
      strokeWeight(2);
    } else {
      stroke(this.hu, 255, 255);
      strokeWeight(this.size);
    }
    point(this.pos.x, this.pos.y);
  }
}
