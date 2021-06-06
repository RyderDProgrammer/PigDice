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
        getInputElem("total").value = "0";
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
    //Creating the visual die roll.
    //Had to leave it as a - instead of camelcasing like I normally do
    //otherwise the rollADie() doesn't like that.
    const element = $("dice-box1");
    //Needed to be an array so I just made it an array of 1.
    const numberOfDice = +[1];
    const values = [diceRoll];
    const options = {element,numberOfDice,values,callback:response};
    //@ts-ignore
    rollADie(options)
    //if the roll is 1
    //  change players
    //  set current total to 0
    if(diceRoll == 1)
    {
        currTotal = 0;
        changePlayers();
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
//I tried looking into this with some research to try
//and avoid this pointless function but unfortunately
//I couldn't find anywhere to avoid it.
function response(res) {
    // returns an array of the values from the dice
    console.log(res)
  }

function holdDie():void{
    //get the current turn total
    let currTotal = parseInt((<HTMLInputElement>$("total")).value);
    //determine who the current player is
    let playerScore = 0;
    if($("current").innerHTML == getInputElem("player1").value)
    {
        playerScore = parseInt(getInputElem("score1").value);
    }
    else
    {
        playerScore = parseInt(getInputElem("score2").value);
    }
    //add the current turn total to the player's total score
    if($("current").innerHTML == getInputElem("player1").value)
    {
        playerScore += currTotal;
        getInputElem("score1").value = playerScore.toString();
    }
    else
    {
        playerScore += currTotal;
        getInputElem("score2").value = playerScore.toString()
    }
    //reset the turn total to 0
    getInputElem("total").value = "0";
    //Right before changing players sees if one player has 
    //A total of 100 or not.
    winningNumber();
    //change players
    changePlayers();
}

function winningNumber()
{
    let player1Score = parseInt(getInputElem("score1").value);
    let player2Score = parseInt(getInputElem("score2").value);

    if(player1Score >= 100)
    {
        alert("Player 1 wins!");
        //player1Score = 0 doesnt work?
        getInputElem("score1").value = "0";
        getInputElem("score2").value = "0";
        changePlayers();

    }
    if(player2Score >= 100)
    {
        alert("Player 2 wins!");
        getInputElem("score1").value = "0";
        getInputElem("score2").value = "0";
    }
}

function $(id:string)
{
    return document.getElementById(id);
}
function getInputElem(id:string):HTMLInputElement
{
    return <HTMLInputElement>$(id);
}