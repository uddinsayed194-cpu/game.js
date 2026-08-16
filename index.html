<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
<title>ARIF FOOTBALL</title>

<style>
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
}

html,body{
  width:100%;
  height:100%;
  overflow:hidden;
  background:#111;
  font-family:Arial,sans-serif;
}

canvas{
  display:block;
  width:100%;
  height:100%;
  touch-action:none;
}

#score{
  position:fixed;
  top:12px;
  left:50%;
  transform:translateX(-50%);
  z-index:10;
  background:rgba(0,0,0,.75);
  color:white;
  padding:10px 22px;
  border-radius:15px;
  font-size:20px;
  font-weight:bold;
}

#info{
  position:fixed;
  bottom:15px;
  left:50%;
  transform:translateX(-50%);
  background:rgba(0,0,0,.7);
  color:white;
  padding:9px 16px;
  border-radius:20px;
  font-size:14px;
  z-index:10;
  white-space:nowrap;
}
</style>
</head>

<body>

<div id="score">ARIF FC 0 : 0 RIVAL FC</div>

<canvas id="game"></canvas>

<div id="info">⚽ বলের ওপর চাপ দিয়ে টেনে ছেড়ে দে</div>

<script>

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let W=0,H=0;

function resize(){
  W=window.innerWidth;
  H=window.innerHeight;
  canvas.width=W;
  canvas.height=H;
}

window.addEventListener("resize",resize);
resize();

let scoreA=0;
let scoreB=0;

const players=[
  {x:.22,y:.50,color:"#ffffff",num:10},
  {x:.38,y:.35,color:"#ffffff",num:7},
  {x:.38,y:.65,color:"#ffffff",num:11},

  {x:.68,y:.35,color:"#e53935",num:9},
  {x:.70,y:.65,color:"#e53935",num:10},
  {x:.82,y:.50,color:"#e53935",num:7}
];

const ball={
  x:W*.28,
  y:H*.50,
  r:10,
  vx:0,
  vy:0
};

let dragging=false;
let startX=0;
let startY=0;
let aimX=0;
let aimY=0;

function pxX(v){
  return v*W;
}

function pxY(v){
  return 70+v*(H-100);
}

function drawField(){

  ctx.fillStyle="#16883b";
  ctx.fillRect(0,0,W,H);

  const stripe=50;

  for(let x=0;x<W;x+=stripe*2){
    ctx.fillStyle="rgba(255,255,255,.025)";
    ctx.fillRect(x,70,stripe,H-100);
  }

  ctx.strokeStyle="white";
  ctx.lineWidth=4;

  ctx.strokeRect(15,70,W-30,H-100);

  ctx.beginPath();
  ctx.moveTo(W/2,70);
  ctx.lineTo(W/2,H-30);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(W/2,H/2,75,0,Math.PI*2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(W/2,H/2,5,0,Math.PI*2);
  ctx.fillStyle="white";
  ctx.fill();

  // Left penalty area
  ctx.strokeRect(15,H/2-120,130,240);

  // Right penalty area
  ctx.strokeRect(W-145,H/2-120,130,240);

  // Goals
  ctx.strokeRect(0,H/2-65,15,130);
  ctx.strokeRect(W-15,H/2-65,15,130);

}

function drawPlayer(p){

  const x=pxX(p.x);
  const y=pxY(p.y);

  ctx.beginPath();
  ctx.arc(x,y,23,0,Math.PI*2);

  ctx.fillStyle=p.color;
  ctx.fill();

  ctx.lineWidth=3;
  ctx.strokeStyle="#111";
  ctx.stroke();

  ctx.fillStyle=p.color=="#ffffff"?"#111":"white";

  ctx.font="bold 14px Arial";
  ctx.textAlign="center";
  ctx.textBaseline="middle";

  ctx.fillText(p.num,x,y);
}

function drawBall(){

  ctx.beginPath();
  ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);

  ctx.fillStyle="white";
  ctx.fill();

  ctx.strokeStyle="#111";
  ctx.lineWidth=2;
  ctx.stroke();

  // black patches
  ctx.fillStyle="#222";

  ctx.beginPath();
  ctx.arc(ball.x-3,ball.y-3,2.5,0,Math.PI*2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(ball.x+4,ball.y+3,2.5,0,Math.PI*2);
  ctx.fill();
}

function drawAim(){

  if(!dragging)return;

  ctx.beginPath();
  ctx.moveTo(ball.x,ball.y);
  ctx.lineTo(aimX,aimY);

  ctx.strokeStyle="#ffe600";
  ctx.lineWidth=6;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(aimX,aimY,9,0,Math.PI*2);

  ctx.fillStyle="#ffe600";
  ctx.fill();
}

function update(){

  ball.x+=ball.vx;
  ball.y+=ball.vy;

  ball.vx*=.985;
  ball.vy*=.985;

  if(Math.abs(ball.vx)<.05)ball.vx=0;
  if(Math.abs(ball.vy)<.05)ball.vy=0;

  // top bottom
  if(ball.y<82){
    ball.y=82;
    ball.vy*=-.65;
  }

  if(ball.y>H-38){
    ball.y=H-38;
    ball.vy*=-.65;
  }

  // left
  if(ball.x<20){

    if(ball.y>H/2-65 && ball.y<H/2+65){

      scoreB++;

      updateScore();

      resetBall();

    }else{

      ball.x=20;
      ball.vx*=-.65;

    }
  }

  // right
  if(ball.x>W-20){

    if(ball.y>H/2-65 && ball.y<H/2+65){

      scoreA++;

      updateScore();

      resetBall();

    }else{

      ball.x=W-20;
      ball.vx*=-.65;

    }
  }

  // opponent movement
  players[3].y += (ball.y/H-players[3].y)*.001;
  players[4].y += (ball.y/H-players[4].y)*.001;

}

function resetBall(){

  ball.x=W*.28;
  ball.y=H*.50;

  ball.vx=0;
  ball.vy=0;
}

function updateScore(){

  document.getElementById("score").innerText=
  "ARIF FC "+scoreA+" : "+scoreB+" RIVAL FC";

}

function loop(){

  drawField();

  update();

  for(let p of players){
    drawPlayer(p);
  }

  drawBall();

  drawAim();

  requestAnimationFrame(loop);
}

function pointerPosition(e){

  const rect=canvas.getBoundingClientRect();

  return{
    x:e.clientX-rect.left,
    y:e.clientY-rect.top
  };

}

canvas.addEventListener("pointerdown",function(e){

  const p=pointerPosition(e);

  const d=Math.hypot(
    p.x-ball.x,
    p.y-ball.y
  );

  if(d<45){

    dragging=true;

    startX=p.x;
    startY=p.y;

    aimX=p.x;
    aimY=p.y;

    canvas.setPointerCapture(e.pointerId);

  }

});

canvas.addEventListener("pointermove",function(e){

  if(!dragging)return;

  const p=pointerPosition(e);

  aimX=p.x;
  aimY=p.y;

});

canvas.addEventListener("pointerup",function(e){

  if(!dragging)return;

  const dx=ball.x-aimX;
  const dy=ball.y-aimY;

  const distance=Math.hypot(dx,dy);

  if(distance>10){

    const power=Math.min(distance/9,20);

    ball.vx=(dx/distance)*power;
    ball.vy=(dy/distance)*power;

  }

  dragging=false;

});

canvas.addEventListener("pointercancel",function(){

  dragging=false;

});

loop();

</script>

</body>
</html>
