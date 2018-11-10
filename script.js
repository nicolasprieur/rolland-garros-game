// Canvas variables
var c=document.getElementById('canvas');
var ctx=c.getContext('2d');
var W = canvas.width;
var H = canvas.height;

// Button variables

var start_button = document.getElementById('start_button');

document.getElementById('start_button').onclick = function() {
    start_game();
    draw();
    setInterval(draw, 10);
};

var restart_button = document.getElementById('restart_button');

var playerFace = new Image();
playerFace.src = "./Images/roger_federer.jpg";

var computerFace = new Image();
computerFace.src = "./Images/computer.jpg";

function drawPlayer (){
    if (play_game==false && (score_player1 >= winning_score)) {
    ctx.drawImage(playerFace, (W-150)/2 , (H-150)/2, 150, 150);
    };
    if (play_game==false && (score_player2 >= winning_score)) {
    ctx.drawImage(computerFace, (W-150)/2 , (H-150)/2, 150, 150);
    }
};

var remove_intro = document.getElementById('intro');

// Player class

var players = document.getElementsByClassName("player-button");

for( var i = 0; i < players.length; i++ ) {
    players[i].onclick = function() {        
     for(var j = 0; j < players.length; j++ ){
        players[j].classList.remove("face-style");
        };
       playerFace.src = this.querySelector("img").src;
       this.classList.add("face-style");
   }
}

// Sound variables

var start_sound = new Audio("./Images/tennisserve.wav");
var winner_is_sound = new Audio("./Images/winning.wav");

// Play variable

var play_game = true;

// Ball variable

var ballX = c.width/2;
var ballY = c.height/2;
var ballSpeedX = 6;
var ballSpeedY = 2;
var ballRad = 10;

// Tennis player's racket variable

var racketHeight = 150;
var racketThickness = 30;
var p_racketY = 150;
var c_racketY = 150;
var racketY = (H-racketHeight)/2;

// Score variables

var score_player1 = 0;
var score_player2 = 0;
var winning_score = 2;

// Keys functions

var keyDown = false;
var keyUp = false;

document.addEventListener("keydown", keyDownFn, false);
document.addEventListener("keyup", keyUpFn, false);

function keyDownFn(e) {
    if(e.keyCode == 40) {
        keyDown = true;
    }
    else if(e.keyCode == 38) {
        keyUp = true;
    }
}

// Key up function
function keyUpFn(e) {
    if(e.keyCode == 40) {
        keyDown = false;
    }
    else if(e.keyCode == 38) {
        keyUp = false;
    }
}

// Start Game
function start_game(){
    start_button.style.display = 'none';
    remove_intro.style.display = 'none'; 
    start_sound.play();
}

// Draw the ball
function drawBall (){
    ctx.beginPath();
    ctx.fillStyle="yellow";
    ctx.arc(ballX, ballY, ballRad, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath(); 
};

function drawScore(a,x,y,z) {
        ctx.font = "25px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(a+"= "+x, y, z);
}

function colorRect(leftX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
}

function colorRectwinner(leftX, topY, width, height, drawColor) {
    ctx.fillStyle = drawColor;
    ctx.fillRect(leftX, topY, width, height);
    restart_button.style.opacity = 100;
    drawPlayer();
    winner_is_sound.play();
}

function drawNet() {
    for (var i = 0; i < H; i += 40) {
      colorRect(W / 2 - 1, i, 2, 20, 'white');
    }
}

function computerMovement() {
    var paddle2YCenter = c_racketY + (racketHeight / 2);
    if (paddle2YCenter < ballY - 35) {
        c_racketY += 5;
    } else if (paddle2YCenter > ballY + 35) {
        c_racketY -= 5;
    }
}

function resetball() {
    if (score_player1 >= winning_score || score_player2 >= winning_score) {
        play_game = false;
      }
    ballSpeedX = -ballSpeedX;
    ballX = W / 2;
    ballY = H / 2;
  }

function move(){
    computerMovement();
    if (ballX < 30) {
        if (ballY > p_racketY &&
          ballY < p_racketY + racketHeight) {
          ballSpeedX = -ballSpeedX;
    
          var deltaY = ballY - (p_racketY + racketHeight / 2);
          ballSpeedY = deltaY * 0.2;
        } else {
            score_player2++;
            resetball()
        }
      }

    if (ballX > W-30) {
        if (ballY > c_racketY &&
          ballY < c_racketY + racketHeight) {
          ballSpeedX = -ballSpeedX;
    
          var deltaY = ballY - (c_racketY + racketHeight / 2);
          ballSpeedY = deltaY * 0.1;
        } else {
            score_player1++;
            resetball()
        }
      }

    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
      }
      if (ballY > H) {
        ballSpeedY = -ballSpeedY;
      }

    if(keyDown && p_racketY < H -racketHeight) {
        p_racketY += 7;
    }
    else if(keyUp && p_racketY > 0) {
        p_racketY-= 7;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function draw() {
  if (play_game==true){
    ctx.clearRect(0, 0, W, H);
    //drawPitch();
    colorRect(0,0,800,600,'orange'); 
    //player1
    colorRect(0,p_racketY,racketThickness,racketHeight, 'white');
    //player2 (computer)
    colorRect(W-racketThickness,c_racketY,racketThickness,racketHeight, 'white');
    drawBall();
    drawNet();
    move();
    //Score player1
    drawScore("player ",score_player1,75,20);
    //Score player2
    drawScore("computer ",score_player2,600,20);
  } else {   
    colorRectwinner(0,0,800,600,'orange');   
    ctx.fillStyle = 'white';
    if (score_player1 >= winning_score) {
    ctx.fillText('You Won!', W/2.5, H/4);
    } else if (score_player2 >= winning_score) {
    ctx.fillText('Computer Won!', W/2.5, H/4);
    }
    return;
  }
}



