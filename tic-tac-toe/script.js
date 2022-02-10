document.addEventListener("DOMContentLoaded", handler);

function handler(event){
    var value = "X";
    var msgDiv = document.querySelector("#message");
    var countRowX = new Array(3).fill(0), countColX = new Array(3).fill(0);
    var countRowO = new Array(3).fill(0), countColO = new Array(3).fill(0);
    var diagonal1X = 0, diagonal2X = 0;
    var diagonal1O = 0, diagonal2O = 0;
    var alternateDiagonalEntries = {
        0 : 2,
        1 : 1,
        2 : 0
    };
    var turns = 0;


    function checkWinner(player){
        if(player === 'X'){
            if(diagonal1X === 3 || diagonal2X === 3)
                return true;
            for(var i = 0; i < countRowX.length; i++){
                if (countRowX[i] === 3)
                    return true;
            }  
            for(var i = 0; i < countColX.length; i++){
                if (countColX[i] === 3)
                    return true;
            }
        }else if(player === 'O'){
            if(diagonal1O === 3 || diagonal2O === 3)
                return true;
            for(var i = 0; i < countRowO.length; i++){
                if (countRowO[i] === 3)
                    return true;
            }
            for(var i = 0; i < countColO.length; i++){
                if (countColO[i] === 3)
                    return true;
            }
        }
            
    }

    function incrementCountersX(row, col){
        countRowX[row]++; 
        countColX[col]++;
        if(row === col){
            diagonal1X++;
        }
        if(alternateDiagonalEntries[row] === col)
            diagonal2X++;
        
    }

    function incrementCountersO(row, col){
        countRowO[row]++; 
        countColO[col]++;
        if(row === col){
            diagonal1O++;
        }
        if(alternateDiagonalEntries[row] === col)
            diagonal2O++;
        
    }

    function playGame(button){
        //change box value
        if(!button.value){ //check if box is already filled
            if(value === "X"){ //if current player is X
                incrementCountersX(button.row, button.col); // increment counters
                button.value = "X"; //set value in box
                value = "O";    //change value for next turn
                msgDiv.innerText = "Player 2 Turn (O)";
                if(checkWinner("X")) //see winner
                    return "X";
            }else if(value === "O"){ //if current player is O
                incrementCountersO(button.row, button.col);
                button.value = "O";
                value = "X";
                msgDiv.innerText = "Player 1 Turn (X)";
                if(checkWinner("O"))
                    return "O";
            }
            if(turns++ === 8)
                return "tie";
        }
    }

    // handler for each individual button / box
    function buttonHandler(event){
        var result = playGame(this);
        if(result === "X"){
            msgDiv.innerText = "Player 1 Won";
        }else if(result === "O"){
            msgDiv.innerText = "Player 2 Won";
        }else if(result === "tie"){
            msgDiv.innerText = "Match Tie";
        }
        
    };


    //register event handler with all boxes
    var nodeList = document.querySelectorAll(".box");
    var row = -1, col = 0;
    for(var i=0; i < nodeList.length; i++){
        if((i)%3 === 0){ //i+1 % n; n is grid size
            col = 0;
            row++;
        }
        nodeList[i].row = row;
        nodeList[i].col = col++;
        nodeList[i].addEventListener("click", buttonHandler);
    }
};


