document.addEventListener("DOMContentLoaded", handler)

function handler(event){
    var value = "X";
    var msgDiv = document.querySelector("#message");
    function buttonHandler(event){
        //change box value
        if(!this.value){
            if(value === "X"){
                this.value = "X";
                value = "O";
                msgDiv.innerText = "Player 2 Turn (O)";
            }else if(value === "O"){
                this.value = "O";
                value = "X";
                msgDiv.innerText = "Player 1 Turn (X)";
            }
        }
        
            
    };

    //buttonHandler.prototype.value = "X";

    //register event handler with all boxes
    var nodeList = document.querySelectorAll(".box");
    for(var i=0; i < nodeList.length; i++){
        nodeList[i].addEventListener("click", buttonHandler);
    }
};