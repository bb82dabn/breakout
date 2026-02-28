const canvas = document.getElementById("gameCanvas");
const ctx = canvas?.getContext("2d");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart");

if (!canvas || !ctx || !scoreElement || !livesElement || !statusElement || !restartButton) {
  throw new Error("Breakout canvas or HUD elements are missing.");
}

const paddle = {
  width: 140,
  height: 16,
  x: (canvas.width - 140) / 2,
  y: canvas.height - 40,
  speed: 8,
};

const ball = {
  radius: 10,
  x: canvas.width / 2,
  y: canvas.height - 60,
  dx: 5,
  dy: -5,
function collisionDetection(ball, object) {
  return !((ball.y + ball.radius < object.y) ||
    (ball.y - ball.radius > object.y + object.height) ||
    (ball.x + ball.radius < object.x) ||
    (ball.x - ball.radius > object.x + object.width));
}

const brickSettings = {
  rows: 5,
  columns: 10,
  height: 20,
  padding: 10,
  offsetTop: 40,
  offsetLeft: 32,
};

brickSettings.width =
  (canvas.width - brickSettings.offsetLeft * 2 - (brickSettings.columns - 1) * brickSettings.padding) /
  brickSettings.columns;

const brickColors = ["#f97316", "#facc15", "#38bdf8", "#a855f7", "#22d3ee"];
const totalBricks = brickSettings.rows * brickSettings.columns;
const goalScore = totalBricks * 10;

let bricks = [];
let score = 0;
let lives = 3;
let running = true;
let animationId;
const keys = { left: false, right: false };

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const createBricks = () => {
  const grid = [];

  for (let col = 0; col < brickSettings.columns; col += 1) {
    grid[col] = [];

    for (let row = 0; row < brickSettings.rows; row += 1) {
      const x = brickSettings.offsetLeft + col * (brickSettings.width + brickSettings.padding);
      const y = brickSettings.offsetTop + row * (brickSettings.height + brickSettings.padding);

      grid[col][row] = {
        x,
        y,
        active: true,
        color: brickColors[row % brickColors.length],
      };
    }
  }

  return grid;
};

const updateHud = () => {
  scoreElement.textContent = String(score);
  livesElement.textContent = String(lives);
};

const resetBall = () => {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 60;
  const angle = (Math.random() - 0.5) * (Math.PI / 3);
  const speed = 5;
  ball.dx = Math.sin(angle) * speed;
  ball.dy = -Math.cos(angle) * speed;
};

const resetPaddle = () => {
  paddle.x = (canvas.width - paddle.width) / 2;
};

const restartGame = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  score = 0;
  lives = 3;
  running = true;
  bricks = createBricks();
  updateHud();
  resetPaddle();
  resetBall();
  statusElement.textContent = "Use the arrow keys or drag the paddle to keep the ball alive.";
  animationId = requestAnimationFrame(loop);
};

const movePaddle = () => {
  if (keys.left) {
    paddle.x -= paddle.speed;
  }

  if (keys.right) {
    paddle.x += paddle.speed;
  }

  paddle.x = clamp(paddle.x, 0, canvas.width - paddle.width);
};

const drawPaddle = () => {
  ctx.fillStyle = "#38bdf8";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
};

const drawBall = () => {
  ctx.fillStyle = "#f97316";
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
};

const drawBricks = () => {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (!brick.active) {
        return;
      }

      ctx.fillStyle = brick.color;
      ctx.strokeStyle = "rgba(15, 23, 42, 0.7)";
      ctx.lineWidth = 2;
      ctx.fillRect(brick.x, brick.y, brickSettings.width, brickSettings.height);
      ctx.strokeRect(brick.x, brick.y, brickSettings.width, brickSettings.height);
    });
  });
};

const detectBrickCollision = () => {
  for (let col = 0; col < brickSettings.columns; col += 1) {
    for (let row = 0; row < brickSettings.rows; row += 1) {
      const brick = bricks[col][row];

      if (!brick.active) {
        continue;
      }

      if (
        ball.x + ball.radius > brick.x &&
        ball.x - ball.radius < brick.x + brickSettings.width &&
        ball.y + ball.radius > brick.y &&
        ball.y - ball.radius < brick.y + brickSettings.height
      ) {
        brick.active = false;
        ball.dy *= -1;
        score += 10;
        updateHud();
        statusElement.textContent = "Brick cleared!";

        if (score === goalScore) {
          running = false;
          statusElement.textContent = "You cleared the wall! Press Restart to play again.";
        }

        return;
      }
    }
  }
};

const detectPaddleCollision = () => {
  if (
    ball.y + ball.radius >= paddle.y &&
    ball.y - ball.radius <= paddle.y + paddle.height &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width &&
    ball.dy > 0
  ) {
    const relativeIntersect = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
    const bounceAngle = relativeIntersect * (Math.PI / 3);
    const speed = Math.min(Math.sqrt(ball.dx ** 2 + ball.dy ** 2) + 0.25, 8);
    ball.dx = Math.sin(bounceAngle) * speed;
    ball.dy = -Math.cos(bounceAngle) * speed;
    statusElement.textContent = "Paddle rebound";
  }
};

const handleWallCollision = () => {
  if (ball.x + ball.radius >= canvas.width) {
    ball.x = canvas.width - ball.radius;
    ball.dx *= -1;
  }

  if (ball.x - ball.radius <= 0) {
    ball.x = ball.radius;
    ball.dx *= -1;
  }

  if (ball.y - ball.radius <= 0) {
    ball.y = ball.radius;
    ball.dy *= -1;
  }
};

const loseLife = () => {
  lives -= 1;
  updateHud();

  if (lives <= 0) {
    running = false;
    statusElement.textContent = "Game over. Press Restart to try again.";
    return;
  }

  statusElement.textContent = `Life lost — ${lives} remaining.`;
  resetBall();
  resetPaddle();
};

const loop = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();

  if (!running) {
    return;
  }

  movePaddle();
  ball.x += ball.dx;
  ball.y += ball.dy;
  handleWallCollision();

  if (ball.y + ball.radius >= canvas.height) {
    loseLife();
  } else {
    detectPaddleCollision();
    detectBrickCollision();
  }

  if (running) {
    animationId = requestAnimationFrame(loop);
  }
};

restartButton.addEventListener("click", restartGame);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    keys.left = true;
  }

  if (event.key === "ArrowRight") {
    keys.right = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    keys.left = false;
  }

  if (event.key === "ArrowRight") {
    keys.right = false;
  }
});

canvas.addEventListener("pointermove", (event) => {
  event.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const pointerX = event.clientX - rect.left;
  paddle.x = clamp(pointerX - paddle.width / 2, 0, canvas.width - paddle.width);
});

restartGame();

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let paddle = { x: canvas.width/2 - 50, y: canvas.height - 20, width: 100, height: 10 };
let ball = { x: canvas.width/2, y: canvas.height - 30, radius: 10, speed: 5, dx: 5, dy: -5 };
let bricks = [];
let score = 0;
let lives = 3;
const brickRowCount = 5;
const brickColumnCount = 7;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let gameOver = false;
let keys = {};
document.addEventListener('keydown', function(e) {
  keys[e.key] = true;
});
document.addEventListener('keyup', function(e) {
  keys[e.key] = false;
});
function createBricks() {
  bricks = [];
  for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
      bricks[c][r] = { x: c*(brickWidth + brickPadding) + brickOffsetLeft, y: r*(brickHeight + brickPadding) + brickOffsetTop, status: 1 };
    }
  }
}
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for(let c=0; c<brickColumnCount; c++) {
    for(let r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status === 1) {
        let brickX = bricks[c][r].x;
        let brickY = bricks[c][r].y;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#888';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('Score: ' + score, 8, 20);
}
function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#000';
  ctx.fillText('Lives: ' + lives, canvas.width-65, 20);
}
function collision Detection(ball, object) {
  return !((ball.y + ball.radius < object.y) ||
    (ball.y - ball.radius > object.y + object.height) ||
    (ball.x + ball.radius < object.x) ||
    (ball.x - ball.radius > object.x + object.width));
}
function update() {
  if(keys['ArrowLeft'] && paddle.x > 0) {
    paddle.x -= 7;
  } else if(keys['ArrowRight'] && paddle.x + paddle.width < canvas.width) {
    paddle.x += 7;
  }
  if(!gameOver) {
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }
    if(ball.y - ball.radius < 0) {
      ball.dy = -ball.dy;
    } else if(ball.y + ball.radius > canvas.height) {
      if(lives > 1) {
        lives--;
        ball.x = canvas.width/2;
        ball.y = canvas.height - 30;
        ball.dx = 5;
        ball.dy = -5;
      } else {
        gameOver = true;
        ctx.font = '30px Arial';
        ctx.fillText('GAME OVER', canvas.width/2 - 80, canvas.height/2);
      }
    }
    if(collisionDetection(ball, paddle)) {
      ball.dy = -ball.dy;
    }
    for(let c=0; c<brickColumnCount; c++) {
      for(let r=0; r<brickRowCount; r++) {
        let brick = bricks[c][r];
        if(brick.status === 1 && collisionDetection(ball, brick)) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score += 10;
          if(score === brickRowCount*brickColumnCount) {
            gameOver = true;
            ctx.font = '30px Arial';
            ctx.fillText('YOU WIN', canvas.width/2 - 70, canvas.height/2);
          }
        }
      }
    }
  }
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  update();
  if(!gameOver) {
    requestAnimationFrame(gameLoop);
  }
}
createBricks();
gameLoop();