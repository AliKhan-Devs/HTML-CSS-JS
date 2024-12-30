
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

const bgsound = new Audio('./background.mp3');
const gameover = new Audio('./gameover.mp3');
const eat = new Audio('./eat.mp3');
// Game constants
const GRID_SIZE = 20;
const GAME_SIZE = 400;
canvas.width = GAME_SIZE;
canvas.height = GAME_SIZE;

// Game state
let snake = [];
let food = {};
let direction = 'right';
let nextDirection = 'right';
let gameLoop = null;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
highScoreElement.textContent = highScore;

// Initialize game
function initGame() {
  snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
  ];
  score = 0;
  scoreElement.textContent = score;
  direction = 'right';
  nextDirection = 'right';
  generateFood();
}

// Generate food at random position
function generateFood() {
  food = {
    x: Math.floor(Math.random() * (GAME_SIZE / GRID_SIZE)),
    y: Math.floor(Math.random() * (GAME_SIZE / GRID_SIZE))
  };
  // Ensure food doesn't spawn on snake
  while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    food = {
      x: Math.floor(Math.random() * (GAME_SIZE / GRID_SIZE)),
      y: Math.floor(Math.random() * (GAME_SIZE / GRID_SIZE))
    };
  }
}

// Game loop
function gameStep() {
  direction = nextDirection;
  const head = { ...snake[0] };

  switch (direction) {
    case 'up': head.y--; break;
    case 'down': head.y++; break;
    case 'left': head.x--; break;
    case 'right': head.x++; break;
  }

  // Check collision with walls or self
  if (head.x < 0 || head.x >= GAME_SIZE / GRID_SIZE ||
    head.y < 0 || head.y >= GAME_SIZE / GRID_SIZE ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // Check if snake ate food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    eat.play();
    scoreElement.textContent = score;
    if (score > highScore) {
      highScore = score;
      highScoreElement.textContent = highScore;
      localStorage.setItem('snakeHighScore', highScore);
    }
    generateFood();
  } else {
    snake.pop();
  }

  draw();
}

// Draw game state
function draw() {
  // Clear canvas
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, GAME_SIZE, GAME_SIZE);

  // Draw grid
  ctx.strokeStyle = '#333333';
  for (let i = 0; i < GAME_SIZE; i += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, GAME_SIZE);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(GAME_SIZE, i);
    ctx.stroke();
  }

  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0
      ? '#4CAF50'
      : `hsl(122, 39%, ${50 - (index * 2)}%)`;
    ctx.fillRect(
      segment.x * GRID_SIZE,
      segment.y * GRID_SIZE,
      GRID_SIZE - 1,
      GRID_SIZE - 1
    );
  });

  // Draw food
  ctx.fillStyle = '#FF5252';
  ctx.beginPath();
  ctx.arc(
    food.x * GRID_SIZE + GRID_SIZE / 2,
    food.y * GRID_SIZE + GRID_SIZE / 2,
    GRID_SIZE / 2 - 1,
    0,
    2 * Math.PI
  );
  ctx.fill();
}

// Game over
function gameOver() {
  bgsound.pause();
  gameover.play();
  clearInterval(gameLoop);
  gameLoop = null;
  showMessage();
  startBtn.disabled = false;
  startBtn.textContent = 'Play Again';
}

function showMessage() 
{ 
  ctx.fillStyle = 'white'; 
  ctx.font = '30px Arial'; 
  ctx.textAlign = 'center'; 
  if (score>=highScore) 
    { ctx.fillText('Game over! New High Score', GAME_SIZE / 2, GAME_SIZE / 2 + 40); 

    }
    else{

      ctx.fillText("Game over", GAME_SIZE / 2, 
        GAME_SIZE / 2); 
    }
     
  }


// Start game
function startGame() {
  startBtn.textContent = 'Playing...';
  gameover.pause();

  bgsound.play();
  bgsound.loop = true;
  if (gameLoop) return;
  initGame();
  gameLoop = setInterval(gameStep, 100);
  gameover.clearInterval();
  startBtn.disabled = true;

}

// Event listeners
startBtn.addEventListener('click', startGame);

// Keyboard controls
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction !== 'down') nextDirection = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') nextDirection = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') nextDirection = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') nextDirection = 'right';
      break;
  }
});

// Mobile controls
document.getElementById('upBtn').addEventListener('click', () => {
  if (direction !== 'down') nextDirection = 'up';
});
document.getElementById('downBtn').addEventListener('click', () => {
  if (direction !== 'up') nextDirection = 'down';
});
document.getElementById('leftBtn').addEventListener('click', () => {
  if (direction !== 'right') nextDirection = 'left';
});
document.getElementById('rightBtn').addEventListener('click', () => {
  if (direction !== 'left') nextDirection = 'right';
});

// Initial draw
draw();