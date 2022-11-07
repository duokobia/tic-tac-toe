// Accept custom players names

function setPlayersNames(){
    var x = document.getElementById("playerX").value;
    document.getElementById("playX").innerHTML = x;

    var y = document.getElementById("playerY").value;
    document.getElementById("playY").innerHTML = y;
};


// All winning conditions

const winingConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Create an array of ["", "", "", "", "", "", "", "", ""]
let boxIndexValues = new Array(9).fill("");
let nextMove = 'X';
let gameOver = false;

const winnerMessageElement = document.querySelector('.winner');
const nextMoveElement = document.querySelector('.turn');

const winnerMessage = () => `Winner is: ${nextMove}`;
const nextMoveMessage = () => `Next move: ${nextMove}`;

//Add click listeners to each box
document
    .querySelectorAll(".box")
    .forEach((box) => 
        box.addEventListener("click", (event) => handleBoxClick(event))
);

//Handling the click event
function handleBoxClick(event){
    const target = event.target;
    const boxIndex = target.dataset.boxIndex;

    //Check if box is empty or gameOver
    if(gameOver || boxIndexValues[boxIndex] != ""){
        return
    }else{
        boxIndexValues[boxIndex] = nextMove;
        target.innerHTML = nextMove;
        checkWinner();
        changeNextMove();
    };

};

//Handling player change
function changeNextMove(){
    nextMove = nextMove === 'X' ? '0': 'X';
    nextMoveElement.innerHTML = nextMoveMessage();
};

//Logic to check the winner

function checkWinner(){
    for (i = 0; i <= 7; i++){
        const winingCondition = winingConditions[i];
        if( 
            boxIndexValues[winingCondition[0]] == "" ||
            boxIndexValues[winingCondition[1]] == "" || 
            boxIndexValues[winingCondition[2]] == ""
            ){
                gameOver = false;
                continue;
            };
        if( boxIndexValues[winingCondition[0]] == boxIndexValues[winingCondition[1]] && 
            boxIndexValues[winingCondition[1]] == boxIndexValues[winingCondition[2]]
            ){
                gameOver = true;
                winnerMessageElement.innerHTML = winnerMessage();
                break;
            };
        // Handling draw scenerio

        if (!boxIndexValues.includes("") && !gameOver){
            winnerMessageElement.innerHTML = "Draw.";

        }
    };
};