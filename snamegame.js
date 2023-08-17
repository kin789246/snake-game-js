/* https://www.educative.io/blog/javascript-snake-game-tutorial */

const board_border = 'black';
const board_background = '#F1F1F1';
const snake_col = 'lightblue';
const snake_border = 'darkblue';
const food_color = 'lightgreen';
const food_border = 'darkgreen';
const snake_size = 10;
const food_size = 10;
const game_fps = 1000/15;

let changing_direction = false;
let dx = 10;
let dy = 0;
let food_x;
let food_y;
let score = 0;
const snakeboard = document.getElementById("gameCanvas");
const snakeboard_ctx = gameCanvas.getContext("2d");

let snake = [ 
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
];

document.addEventListener("keydown", changeDirection);

main();
genFood();
function main()
{
    if (hasGameEnded()) return;

    changing_direction = false;
    setTimeout(gameUpdate, game_fps)
}

function gameUpdate()
{
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    main();
}

function clearCanvas()
{
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

function hasGameEnded()
{
    for (let i=1; i<snake.length; i++)
    {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }
    const hit_left_wall = snake[0].x < 0;
    const hit_right_wall = snake[0].x > snakeboard.width - 10;
    const hit_top_wall = snake[0].y < 0;
    const hit_bottom_wall = snake[0].y > snakeboard.height - 10;
    
    return hit_left_wall || hit_right_wall || hit_top_wall || hit_bottom_wall;
}

function drawSnakePart(snake_part)
{
    snakeboard_ctx.fillStyle = snake_col;
    snakeboard_ctx.strokestyle = snake_border;
    snakeboard_ctx.fillRect(snake_part.x, snake_part.y, snake_size, snake_size);
    snakeboard_ctx.strokeRect(snake_part.x, snake_part.y, snake_size, snake_size);
}

function drawSnake()
{
    snake.forEach(drawSnakePart);
}

function moveSnake()
{
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head); /* add the new head in front of the snake body */
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food)
    {
        score += 10;
        document.getElementById('score').innerHTML = score;
        genFood();
    }
    else
    {
        snake.pop();
    }
}

function changeDirection(event)
{
    if (changing_direction) return;
    changing_direction = true;

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingLeft = dx === -10;
    const goingRight = dx === 10;
    
    if ((event.key === "ArrowLeft") && !goingRight)
    {
        dx = -10;
        dy = 0;
    }
    if ((event.key === "ArrowRight") && !goingLeft) {
        dx = 10;
        dy = 0;
    }
    if ((event.key === "ArrowDown") && !goingUp) {
        dx = 0;
        dy = 10;
    }
    if ((event.key === "ArrowUp") && !goingDown) {
        dx = 0;
        dy = -10;
    }
}

function randomFood(min, max)
{
    return Math.round((Math.random() * (max-min) + min) / 10) *10;
}

function genFood()
{
    food_x = randomFood(0, snakeboard.width-10);
    food_y = randomFood(0, snakeboard.height-10);
    // check if new food location is where the currently snake's body
    snake.forEach( function hasSnakeEatenFood(part)
    {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten)
            genFood();
    });
}

function drawFood()
{
    snakeboard_ctx.fillStyle = food_color;
    snakeboard_ctx.strokestyle = food_border;
    snakeboard_ctx.fillRect(food_x, food_y, food_size, food_size);
    snakeboard_ctx.strokeRect(food_x, food_y, food_size, food_size);
}