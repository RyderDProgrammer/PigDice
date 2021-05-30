function generateRandomValue(minValue:number, maxValue:number):number
{
    minValue = Math.ceil(minValue);
    maxValue = Math.ceil(maxValue);

    var random = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return random;
}


function changePlayers():void{
    let currentPlayerName = $("current");
    let player1Name = getInputElem("player1").value;
    let player2Name = getInputElem("player2").value;

    //currentPlayerName.innerHTML = player1Name.toString();
    //Why doesnt this work if leaving currentPlayerName as 
    //$("current").innerText;
    //currentPlayer = player1Name;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if(currentPlayerName.innerText == player1Name)
    {
        currentPlayerName.innerText = player2Name;
    }
    else
    {
        currentPlayerName.innerText = player1Name;
    }
}

window.onload = function(){
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;

    $("roll").onclick = rollDie;
    $("hold").onclick = holdDie;
}

function createNewGame()
{
    let goodGame = true;
    //set player 1 and player 2 scores to 0
    getInputElem("score1").value = "0";
    getInputElem("score2").value = "0";
    //verify each player has a name
    //if both players don't have a name display error
    if(getInputElem("player1").value == "" || getInputElem("player2").value == "")
    {
        alert("Need 2 players names");
        goodGame = false;
    }
    //if both players do have a name start the game!
    if(goodGame)
    {
        document.getElementById("turn").classList.add("open");
        (<HTMLInputElement>document.getElementById("total")).value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}

function rollDie():void
{
    let currTotal = parseInt(getInputElem("total").value);
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    let diceRoll = generateRandomValue(1,6);
    //if the roll is 1
    //  change players
    //  set current total to 0
    if(diceRoll == 1)
    {
        //currTotal = 0;
        //changePlayers();
    }
    //if the roll is greater than 1
    //  add roll value to current total
    else
    {
        currTotal += diceRoll;
    }

    //set the die roll to value player rolled
    getInputElem("die").value = diceRoll.toString();
    //display current total on form
    getInputElem("total").value = currTotal.toString();
}

function holdDie():void{
    //get the current turn total
    let currTotal = parseInt((<HTMLInputElement>$("total")).value);
    //determine who the current player is
    let currentPlayer = 0;
    if($("current").innerHTML == getInputElem("player1").value)
    {
        currentPlayer = parseInt(getInputElem("score1").value);
    }
    else
    {
        currentPlayer = parseInt(getInputElem("score2").value);
    }
    //add the current turn total to the player's total score
    currentPlayer += currTotal;

    //reset the turn total to 0
    getInputElem("total").value = "0";
    //change players
    changePlayers();
}

function $(id:string)
{
    return document.getElementById(id);
}
function getInputElem(id:string):HTMLInputElement
{
    return <HTMLInputElement>$(id);
}