// -------------------- Inspirations --------------------
// Inspired by:  https://type-01.com/creative-coding-processes-and-sci-fi-inspirations-with-vivek-thakker/
// -------------------- References --------------------
// Reference 1: https://codepen.io/ruijadom/pen/jGKjML blackhole effect
const style = document.createElement("style");
style.innerHTML = `
body, html { height: 100%; margin:0; }
body { background-color: rgba(25,25,25,1); overflow:hidden; }
#blackhole { height: 100%; width: 100%; position: relative; display: flex; }
canvas { position: absolute; top:0; left:0; width:100%; height:100%; }
`;
document.head.appendChild(style);

// -------------------- Black hole --------------------
const blackholeDiv = document.createElement("div");
blackholeDiv.id = "blackhole";
document.body.appendChild(blackholeDiv);

const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
blackholeDiv.appendChild(canvas);
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letterObjects = [];

// -------------------- Initiate characters --------------------
for (let i = 0; i < letters.length; i++) {
  letterObjects.push({
    char: letters[i],
    angle: Math.random() * Math.PI * 2,
    radius: 100 + Math.random() * 150,
    speed: (0.002 + Math.random() * 0.008) * (Math.random() < 0.5 ? 1 : -1),
  });
}

function loop() {
  ctx.fillStyle = "rgba(25,25,25,0.12)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "30px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  letterObjects.forEach((obj) => {
    obj.angle += obj.speed;
    const x = centerX + Math.cos(obj.angle) * obj.radius;
    const y = centerY + Math.sin(obj.angle) * obj.radius;
    ctx.fillText(obj.char, x, y);
  });

  requestAnimationFrame(loop);
}

loop();
