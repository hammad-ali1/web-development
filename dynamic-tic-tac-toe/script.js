var Counters = class {
    constructor(arraySize){
        this.rows = new Array(arraySize).fill(0);
        this.cols = new Array(arraySize).fill(0);
        this.mainDiagonal = 0;
        this.alternateDiagonal = 0;
    }
    updateCounters(rowIndex, colIndex){
        this.rows[rowIndex]++;
        this.cols[colIndex]++;
        if(rowIndex === colIndex)
            this.mainDiagonal++;
        if(Game.alternateDiagonalEntries[rowIndex] === colIndex)
            this.alternateDiagonal++;
    }
    checkWinner(){
        if(this.mainDiagonal === Game.gridSize || 
            this.alternateDiagonal === Game.gridSize)
            return true;
        if(this.rows.indexOf(Game.gridSize) !== -1 || this.cols.indexOf(Game.gridSize) !== -1)
            return true;
    }
}


var Game = class{
    static player = "X";
    static gridSize;
    static player1Counter; //change to grid size
    static player2Counter; //same
    static moves = 0;
    static alternateDiagonalEntries = {};
    static gameEnded = false;
    static initializeArrays(n){
        Game.rows = new Array(n).fill(0);
        Game.cols = new Array(n).fill(0);
    }
    static createAlternateDiagonalEntries(n){
        for(var i = 0; i < n; i++){
            Game.alternateDiagonalEntries[i] = (n-1) - i;
        }
    }
    static changePlayer(){
        if(Game.player === "X"){
            Game.player = "O";
        }
        else if(Game.player === "O"){
            Game.player = "X";
        }
    }
    static play(button){
        if(!button.value){
            updateMessage();
            button.value = Game.player;
            if(Game.player === "X"){
                Game.player1Counter.updateCounters(button.rowIndex, button.colIndex);
                if(Game.player1Counter.checkWinner())
                    return "X";
            }
            else if(Game.player === "O"){
                Game.player2Counter.updateCounters(button.rowIndex, button.colIndex);
                if(Game.player2Counter.checkWinner())
                    return "O";
            }
            Game.moves++;
            if(Game.moves === Game.gridSize*Game.gridSize)
                return "tie";

            Game.changePlayer();
        }
    }
    
};

//register event handler with all boxes
var msgDiv = document.querySelector("#message"); //message div
function initializeGameStaticMembers(gridSize){
    Game.gridSize = gridSize;
    Game.player1Counter = new Counters(gridSize);
    Game.player2Counter = new Counters(gridSize);
    Game.createAlternateDiagonalEntries(gridSize);
}
function registerEventHandlers(){
    var nodeList = document.querySelectorAll(".box");
    var row = -1, col = 0;
    for(var i=0; i < nodeList.length; i++){
        if((i%Game.gridSize) === 0){ //i+1 % n; n is grid size
            col = 0;
            row++;
        }
        nodeList[i].rowIndex = row;
        nodeList[i].colIndex = col++;
        nodeList[i].addEventListener("click", buttonHandler);
    }
}
function start(){
    var gridSize = document.getElementById("gridSize").value;
    addBoxes(gridSize);
    rearrangeBoxes(gridSize);
    initializeGameStaticMembers(parseInt(gridSize));
    registerEventHandlers();
}
function addBoxes(n){
    var box = '<div class="container">'
    + '<input class="box" type="text" readonly></div>';
    var grid = document.getElementById("grid");
    grid.innerHTML = "";
    for(var i = 0; i < n*n; i++){
        grid.innerHTML += box;
    }
    var reloadButton = '<button id="reload" onclick="location.reload();">Reload</button>'
    grid.innerHTML += reloadButton;
}
function rearrangeBoxes(n){
    var grid = document.getElementById("grid");
    grid.style.width = "" + (n*50 + 50);
    var containerWidth = (100/n) + "%";
    var containers = document.querySelectorAll(".container");
    for(var i = 0; i < containers.length; i++){
        containers[i].style.width = containerWidth;
    }
}





function buttonHandler(event){
    if(Game.gameEnded)
        return;
    var result = Game.play(this);
    if(result)
        Game.gameEnded = true;
    if(result === "X"){
        msgDiv.innerText = "Player 1 Won";
    }else if(result === "O"){
        msgDiv.innerText = "Player 2 Won";
    }else if(result === "tie"){
        msgDiv.innerText = "Match Tie";
    }
}


function updateMessage(){
    var player1Turn = "Player 1 Turn (X)";
    var player2Turn = "Player 2 Turn (O)";
    if(msgDiv.textContent.includes(player1Turn))
        msgDiv.textContent = player2Turn;
    else    
        msgDiv.textContent = player1Turn;
}