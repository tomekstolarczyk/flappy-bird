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
let pipeImage;
let pipeArray = [];

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


}

