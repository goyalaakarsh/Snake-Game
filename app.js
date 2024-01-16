// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
let scoreDisp = document.querySelector("#score");
const feedSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let plg = document.querySelector("#playground");
let speed = 9;
let started = false;
let score = 0;
let highScore = 0;
let lastPaintTime = 0;
food = { x: 6, y: 7 };
let snakeArr = [
    { x: 13, y: 15 }
];

// Game Functions 

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide() {
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x === -snakeArr[i].x || snakeArr[0].y === -snakeArr[i].y) {
            continue;
        } else if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
            return true;
        }
    }
    
    // If you bump into the walls of the playground
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }

    started = false;
}

function gameEngine() {
    if ((isCollide(snakeArr))) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        score = 0;
        scoreDisp.innerText = `Score: ${score}\nHighscore: ${highScore}`;
        alert("Game Over! Press Enter to play again.");
        started = false;
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // When food is eaten - increament the code, increase the length of the snake and regenerate the food
    if (food.x === snakeArr[0].x && food.y === snakeArr[0].y) {
        feedSound.play();
        score += 5;
        if (score >= highScore) {
            highScore = score;
        }
        scoreDisp.innerText = `Score: ${score}\nHighscore: ${highScore}`;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display the snake
    plg.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake_body");
        }
        plg.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    plg.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener("keypress", (event) => {
    if (started === false) {
        if (event.key === "Enter") {
            if (started == false) {
                console.log("Game started.");
                musicSound.play();
                started = true;
                runGame(started);
                inputDir = { x: 0, y: -1 }; // Starts the game
                moveSound.play();
            }
        }
    }
});

function runGame(started) {
    if (started === true) {
        window.addEventListener("keydown", (event) => {
            moveSound.play();
            switch (event.key) {
                case "ArrowUp":
                    console.log("ArrowUp");
                    moveSound.play();
                    inputDir.x = 0;
                    inputDir.y = -1;
                    break;

                case "ArrowDown":
                    console.log("ArrowDown");
                    moveSound.play();
                    inputDir.x = 0;
                    inputDir.y = 1;
                    break;

                case "ArrowLeft":
                    console.log("ArrowLeft");
                    moveSound.play();
                    inputDir.x = -1;
                    inputDir.y = 0;
                    break;

                case "ArrowRight":
                    console.log("ArrowRight");
                    moveSound.play();
                    inputDir.x = 1;
                    inputDir.y = 0;
                    break;
                default:
                    break;
            }
        });
    }
}