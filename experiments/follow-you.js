// -------------------- Inspirations --------------------
// Inspired by:  https://type-01.com/creative-coding-processes-and-sci-fi-inspirations-with-vivek-thakker/
// Inspired by: https://examples.motion.dev/react/cursor-floating-target?utm_source=embed
// -------------------- References --------------------
// Reference 1: Nandugokul-K-N. (n.d.). Cursor following dot. CodePen. https://codepen.io/Nandugokul-K-N/pen/MWLxWoV

let letters = "WE ARE FOLLOWING YOU".split("");
let letterObjects = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  textFont("monospace");
  textSize(24);
  textAlign(CENTER, CENTER);

  // Initialize letter objects at the center
  for (let i = 0; i < letters.length; i++) {
    letterObjects.push({
      char: letters[i],
      x: width / 2,
      y: height / 2,
    });
  }
}

function draw() {
  background(25);

  // Follow mouse effect
  let targetX = mouseX;
  let targetY = mouseY;

  for (let i = 0; i < letterObjects.length; i++) {
    let l = letterObjects[i];

    // Use lerp for smooth movement
    l.x = lerp(l.x, targetX, 0.1 - i * 0.005);
    l.y = lerp(l.y, targetY, 0.1 - i * 0.005);

    fill(255);
    text(l.char, l.x, l.y);

    // The next letter follows the current letter
    targetX = l.x;
    targetY = l.y;
  }
}
