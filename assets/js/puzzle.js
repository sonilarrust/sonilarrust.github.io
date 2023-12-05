
var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var turns = 0;

// var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var imgOrder = ["assets/img/puzzle/4", "assets/img/puzzle/2", "assets/img/puzzle/8",
    "assets/img/puzzle/5", "assets/img/puzzle/1", "assets/img/puzzle/6", "assets/img/puzzle/7",
    "assets/img/puzzle/9", "assets/img/puzzle/3"];

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {

            //<img id="0-0" src="1.jpg">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles

            document.getElementById("board").append(tile);

        }
    }
}
function checkWin() {
    // Create an array to represent the correct order
    var correctOrder = ["assets/img/puzzle/1", "assets/img/puzzle/2", "assets/img/puzzle/3",
                        "assets/img/puzzle/4", "assets/img/puzzle/5", "assets/img/puzzle/6",
                        "assets/img/puzzle/7", "assets/img/puzzle/8", "assets/img/puzzle/9"];

    // Create an array to store the current order of images on the board
    var currentOrder = [];

    // Loop through the tiles on the board and push their src attributes to the currentOrder array
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            currentOrder.push(tile.src);
        }
    }

    // Compare the current order with the correct order
    var isWin = false;

    for (let i = 0; i < correctOrder.length; i++) {
        if (correctOrder[i] == currentOrder[i]) {
            isWin = true;
            break;
        }
    }

    // If the orders match, the user has won
    if (isWin) {
        alert("Congratulations! You've solved the puzzle!");
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
}

function dragEnd() {

    let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        // turns += 1;
        // document.getElementById("turns").innerText = turns;
    }
    checkWin();


}