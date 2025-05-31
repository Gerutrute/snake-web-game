const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
const canvasSize = 400;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = null;
let food = spawnFood();
let score = 0;
let gameInterval;

function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#0f0' : '#fff';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x, food.y, box, box);
    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 390);
}

function update() {
    let head = { x: snake[0].x, y: snake[0].y };
    if (direction === 'LEFT') head.x -= box;
    if (direction === 'UP') head.y -= box;
    if (direction === 'RIGHT') head.x += box;
    if (direction === 'DOWN') head.y += box;

    // Check collision with wall
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        endGame();
        return;
    }
    // Check collision with self
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = spawnFood();
    } else {
        snake.pop();
    }
    snake.unshift(head);
}

function spawnFood() {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
        let overlap = snake.some(part => part.x === newFood.x && part.y === newFood.y);
        if (!overlap) break;
    }
    return newFood;
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over! Your score: ' + score);
    document.location.reload();
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

function gameLoop() {
    update();
    draw();
}

direction = 'RIGHT';
gameInterval = setInterval(gameLoop, 100);
