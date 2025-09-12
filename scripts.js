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

//physics
let velocityX = -2;

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

    requestAnimationFrame(update);
    setInterval(placePipes, 1500);

}


function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, boardWidth, boardHeight);    
    context.drawImage(birdImage, bird.x, bird.y, bird.width, bird.height);

    for(let i = 0; i < pipeArray.length; i++) {
        pipeArray[i].x += velocityX;
        context.drawImage(topPipeImage, pipeArray[i].x, pipeArray[i].y, pipeArray[i].width, pipeArray[i].height);
    }
    
}


function placePipes() {

    let randomPipeY = pipeY - pipeHeight/4 - Math.random() * (pipeHeight/2);

    let topPipe = {
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight
    }

    pipeArray.push(topPipe);
    
}