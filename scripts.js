// plansza i kontekst
let board;
let boardHeight = 640;
let boardWidth = 360;
let context;

//ptak
let birdImage;
let bird = {
    x: boardWidth/8,
    y: boardHeight/2,
    width: 34,
    height: 24
}

//rura
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;
let topPipeImage;
let bottomPipeImage;

//physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

//tutaj inicjalizujemy gre
window.onload = function() {

    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //bird
    birdImage = new Image();
    birdImage.src = "graphics/flappybird.png";
    birdImage.onload = function() {
        context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    };

    //zaladowujemy rure
    topPipeImage = new Image();
    topPipeImage.src = "graphics/toppipe.png";
    bottomPipeImage = new Image();
    bottomPipeImage.src = "graphics/bottompipe.png";

    requestAnimationFrame(update);
    pipeInterval = setInterval(placePipes, 1500);

    document.addEventListener("keydown", function(e) {
        if (e.code === "Space") {
            velocityY = -6;
        }
    });

}


//tutaj tak naprawde dzieje sie cala gra
function update() {

    if (gameOver) {
        clearInterval(pipeInterval);
        context.fillStyle = "white";
        context.font = "20px Arial";
        context.fillText("Game Over :(", boardWidth/2 - 50, boardHeight/2);
        return; 
    }



    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);    
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);
    

    //ruch ptaka
    velocityY += gravity;
    bird.y += velocityY;
    
    //sufit i podloga
    if (bird.y + bird.height/2 >= boardHeight) {
        gameOver = true;
    }
    if (bird.y < 0) bird.y = 0;


    for(let i = 0; i < pipeArray.length; i++) {
        pipeArray[i].x += velocityX;
        context.drawImage(pipeArray[i].image, pipeArray[i].x, pipeArray[i].y, pipeArray[i].width, pipeArray[i].height);

        if (checkCollision(bird, pipeArray[i])) {
            gameOver = true;
        }

        if (pipeArray[i].x + pipeArray[i].width < bird.x && !pipeArray[i].passed) {
            score += 0.5;
            pipeArray[i].passed = true;
        }
    }

    //score
    context.fillStyle = "white";
    context.font = "24px Arial";
    context.fillText("Score: " + score, 10, 30);
    
}


//tutaj nie rysujemy rur ale wpychamy je do tablicy
function placePipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);
    let pipeGap = pipeHeight/4;

    let topPipe = {
        image: topPipeImage,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        image: bottomPipeImage,
        x: pipeX,
        y: randomPipeY + pipeHeight + pipeGap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(bottomPipe);
}

//teraz tutaj bedziemy wykrywac kolizje
function checkCollision(a, b) {
    if (a.x + a.width > b.x && 
        a.x < b.x + b.width && 
        a.y + a.height > b.y && 
        a.y < b.y + b.height) {
        return true;
    }
    return false;
}