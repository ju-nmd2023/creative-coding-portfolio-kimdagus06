// Used some code from Daniel Shiffmans Nature of code: https://github.com/nature-of-code/noc-examples-p5.js/blob/master/chp06_agents/NOC_6_09_Flocking/boid.js
class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  flock(boids) {
    let separation = this.separate(boids);
    let align = this.align(boids);
    let cohesion = this.cohesion(boids);

    // You can play with this values to change the behavior
    separation.mult(1.5);
    align.mult(1.0);
    // cohesion.mult(1.0);

    this.applyForce(separation);
    this.applyForce(align);
    this.applyForce(cohesion);
  }

  separate(boids) {
    let desiredseparation = 25.0;
    let steer = createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = p5.Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    let neighbordist = 50;
    let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = p5.Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }

  seek(target) {
    let desiredDirection = p5.Vector.sub(target, this.position);
    desiredDirection.normalize();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());

    let speedCol = map(this.velocity.mag(), 0, this.maxSpeed, 150, 255);
    fill(speedCol, 50, 200, 180);
    noStroke();

    let size = map(sin(frameCount * 0.1), -1, 1, 8, 30);

    beginShape();
    vertex(0, -size / 2);
    bezierVertex(size / 2, -size, size, -size / 2, 0, size / 2);
    bezierVertex(-size, -size / 2, -size / 2, -size, 0, -size / 2);
    endShape(CLOSE);

    stroke(speedCol, 50);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );

    pop();
  }
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  generateAgents();
}

function generateAgents() {
  for (let i = 0; i < 100; i++) {
    let boid = new Boid(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      3,
      0.05
    );
    boids.push(boid);
  }
}

let boids = [];

function draw() {
  background(255, 255, 255);
  for (let boid of boids) {
    boid.flock(boids);
    boid.update();
    boid.checkBorders();
    boid.draw();
  }
}
