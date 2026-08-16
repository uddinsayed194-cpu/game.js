<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Arif Football</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div id="game">
  <div id="scoreboard">
    <span>ARIF FC</span>
    <span id="score">0 - 0</span>
    <span>RIVAL FC</span>
  </div>

  <canvas id="field"></canvas>

  <div id="message">Drag the ball to pass or shoot!</div>
</div>

<script src="game.js"></script>
</body>
</html>* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #111;
  font-family: Arial, sans-serif;
  overflow: hidden;
}

#game {
  width: 100vw;
  height: 100vh;
  position: relative;
}

#field {
  width: 100%;
  height: 100%;
  display: block;
  background: #168a3a;
  touch-action: none;
}

#scoreboard {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;

  min-width: 280px;
  padding: 10px 20px;

  background: rgba(0, 0, 0, 0.75);
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 12px;
  font-weight: bold;
  font-size: 16px;
}

#score {
  font-size: 22px;
  color: #ffd700;
}

#message {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  background: rgba(0, 0, 0, 0.7);
  color: white;

  padding: 10px 18px;
  border-radius: 20px;

  font-size: 14px;
  text-align: center;
  pointer-events: none;
}const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

let W, H;

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

let scoreA = 0;
let scoreB = 0;

const player = {
  x: 250,
  y: 300,
  r: 22,
  color: "#ffffff"
};

const teammate = {
  x: 420,
  y: 220,
  r: 22,
  color: "#ffffff"
};

const opponent = {
  x: 650,
  y: 300,
  r: 22,
  color: "#e53935"
};

const ball = {
  x: player.x + 35,
  y: player.y,
  r: 10,
  vx: 0,
  vy: 0
};

let dragging = false;
let dragX = 0;
let dragY = 0;

function drawField() {
  ctx.fillStyle = "#168a3a";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(255,255,255,0.8)";
  ctx.lineWidth = 4;

  // Outer lines
  ctx.strokeRect(20, 70, W - 40, H - 100);

  // Center line
  ctx.beginPath();
  ctx.moveTo(W / 2, 70);
  ctx.lineTo(W / 2, H - 30);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(W / 2, H / 2, 75, 0, Math.PI * 2);
  ctx.stroke();

  // Goals
  ctx.strokeRect(20, H / 2 - 70, 45, 140);
  ctx.strokeRect(W - 65, H / 2 - 70, 45, 140);
}

function drawPlayer(p, number) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);

  ctx.fillStyle = p.color;
  ctx.fill();

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#111";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(number, p.x, p.y);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);

  ctx.fillStyle = "white";
  ctx.fill();

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawAim() {
  if (!dragging) return;

  ctx.beginPath();
  ctx.moveTo(ball.x, ball.y);
  ctx.lineTo(dragX, dragY);

  ctx.strokeStyle = "#ffff00";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(dragX, dragY, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#ffff00";
  ctx.fill();
}

function updateBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  ball.vx *= 0.97;
  ball.vy *= 0.97;

  if (Math.abs(ball.vx) < 0.05) ball.vx = 0;
  if (Math.abs(ball.vy) < 0.05) ball.vy = 0;

  // Walls
  if (ball.x < 30 || ball.x > W - 30) {
    ball.vx *= -0.7;
  }

  if (ball.y < 80 || ball.y > H - 40) {
    ball.vy *= -0.7;
  }

  // Goal detection
  if (
    ball.x > W - 25 &&
    ball.y > H / 2 - 70 &&
    ball.y < H / 2 + 70
  ) {
    scoreA++;
    resetBall();
  }

  if (
    ball.x < 25 &&
    ball.y > H / 2 - 70 &&
    ball.y < H / 2 + 70
  ) {
    scoreB++;
    resetBall();
  }
}

function resetBall() {
  ball.x = player.x + 35;
  ball.y = player.y;

  ball.vx = 0;
  ball.vy = 0;

  document.getElementById("score").textContent =
    scoreA + " - " + scoreB;
}

function gameLoop() {
  drawField();

  updateBall();

  drawPlayer(player, 10);
  drawPlayer(teammate, 7);
  drawPlayer(opponent, 9);

  drawBall();
  drawAim();

  requestAnimationFrame(gameLoop);
}

function getPointer(e) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

canvas.addEventListener("pointerdown", function(e) {
  const p = getPointer(e);

  const distance = Math.hypot(
    p.x - ball.x,
    p.y - ball.y
  );

  if (distance < 40) {
    dragging = true;
    dragX = p.x;
    dragY = p.y;
  }
});

canvas.addEventListener("pointermove", function(e) {
  if (!dragging) return;

  const p = getPointer(e);

  dragX = p.x;
  dragY = p.y;
});

canvas.addEventListener("pointerup", function() {
  if (!dragging) return;

  const dx = ball.x - dragX;
  const dy = ball.y - dragY;

  const power = Math.min(
    Math.hypot(dx, dy) / 8,
    18
  );

  ball.vx = dx / Math.max(Math.hypot(dx, dy), 1) * power;
  ball.vy = dy / Math.max(Math.hypot(dx, dy), 1) * power;

  dragging = false;
});

gameLoop();
