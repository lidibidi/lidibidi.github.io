$(document).ready(function() {




init();
walkerHead();
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
$(document).mousemove(onMouseMove);

});//end of document.ready

// all of the variables
var x = 25;
var y = 250;
var dx = -2;
var dy = 2;
var ctx;
var wdt;
var hgt;

var paddlex;
var paddleh = 10;
var paddlew = 75;
var rightDown = false;
var leftDown = false;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;
var heads; //(bricks)
var Nrows = 5;
var Ncols = 5;
var brickwidth = (wdt/Ncols) - 1;
var brickheight = 30;
var padding = 1 ;
var ballr = 10;
var rowcolors = ["#5f7842", "#32533f", "#99956d", "#75796e", "#86745a" ];
var paddlecolor = "#030000";
var ballcolor = "#60c10a";
var backcolor = "rgba(36, 32, 32, 0.5)";
var score = '0';
var lives = '3';

function init(){
ctx = $('#canvas')[0].getContext("2d");
wdt = $('#canvas').width();
hgt = $('#canvas').height();
paddlex = wdt / 2;
brickwidth = (wdt/Ncols) - 1;
canvasMinX = $('#canvas').offset().left;
canvasMaxX = canvasMinX + wdt;
intervalId = setInterval(draw, 10);//this makes the ball move around, gives the illusion of movement
}

function weapon(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}//this draws the ball

function rect(x, y, w, h){
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}//this draw the rectangle the weapon lives in

function clear() {
  ctx.fillStyle = backcolor;
  ctx.clearRect(0, 0, wdt, hgt);
  rect(0, 0, wdt, hgt);
}//this restarts

function onKeyDown(evt) {
  if(evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}//control with left/right arrow keys //things happen when arrow keys pressed

function onKeyUp(evt) {
  if(evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}//things happen when arrow keys are let go



function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX){
    paddlex = Math.max(evt.pageX - canvasMinX - (paddlew/2), 0);
    paddlex = Math.min(wdt - paddlew, paddlex);
    // to control the paddle with the mouse!
  }
}

function walkerHead () {
  heads = new Array(Nrows);
  for (i = 0; i < Nrows; i++) {
    heads[i] = new Array(Ncols);
    for (j=0; j < Ncols; j++) {
      heads[i][j] = 1;
    }
  }
}
function draw() {
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  weapon(x, y, ballr);//creates the path the weapon goes in(illusion og)

  if(rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  ctx.fillStyle = paddlecolor;
  rect(paddlex, hgt-paddleh, paddlew, paddleh);
  //drawheads
  for (i = 0; i < Nrows; i++){
    ctx.fillStyle = rowcolors[i];
  for(j = 0; j < Ncols; j++) {
    if(heads[i][j] == 1) {
      rect((j * (brickwidth + padding)) + padding,
           (i * (brickheight + padding)) + padding,
           brickwidth, brickheight);
      }
    }
  }
//if you hit heads
rowheight = brickheight + padding;
colwidth = brickwidth + padding;
row = Math.floor(y/rowheight);
col = Math.floor(x/colwidth);
//if you do, reverse ball, mark brick as broken
if (y < Nrows * rowheight && row >= 0 && col >= 0 && heads[row][col] == 1) {
  dy = -dy;
  heads[row][col] = 0;
  if (heads[row][col] = 0);
    score++;
    $('#score').text('Score: ' +score);
    if(score > 24){
      alert("You Win!!!");
      document.location.reload();
    }
}

  if (x + dx  + ballr > wdt || x + dx -ballr < 0)
  dx = -dx;
  if (y + dy - ballr < 0)
  dy = -dy;
  else if (y + dy + ballr > hgt - paddleh) {
    if(x > paddlex && x < paddlex + paddlew){
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
    dy = -dy;
  }
  else{
    lives --;
    $('#lives').text('Lives: ' +lives);
    if(lives == 0) {
      alert("Game Over, Click 'OK' to try again");
      document.location.reload();

    }
    else{
      x = wdt/2;
      y = hgt -30;
      dx = 3;
      dy = -3;
      paddleX = (wdt-paddlew)/2;
    }
  }
    // else if (y + dy + ballr > hgt)
    //   clearInterval(intervalId);
      // alert('Game over!');
    }
    x += dx;
    y += dy;

}

var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'Media/The Walking Dead Theme.mp3');
audioElement.setAttribute('autoplay', 'autoplay');
//
// $.get();
// audioElement.addEventListener("load", function(){
//   audioElement.Play();
// }, true);
//
// $('.Play').click(function (){
//   audioElement.Play();
// });
//
// $('.Pause').click(function(){
//   audioElement.Pause();
// });


















//track when you win(score), once you win player 2 start





// var firstIMG = new Image();
//    firstIMG.onload = function() {
//    ctx.drawImage(firstIMG, xvalue, yvalue);
//    }
//    firstIMG.src = firstIMGsrc;
