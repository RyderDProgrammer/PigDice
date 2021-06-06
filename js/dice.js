window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    $("roll").onclick = rollDie;
    $("hold").onclick = holdDie;
};
function generateRandomValue(minValue, maxValue) {
    minValue = Math.ceil(minValue);
    maxValue = Math.ceil(maxValue);
    var random = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return random;
}
function changeColor(color) {
    document.body.style.background = color;
}
function changePlayers() {
    var currentPlayerName = $("current");
    var player1Name = getInputElem("player1").value;
    var player2Name = getInputElem("player2").value;
    var player1Color = getInputElem("player1Color").value;
    var player2Color = getInputElem("player2Color").value;
    if (currentPlayerName.innerText == player1Name) {
        changeColor(player2Color);
        currentPlayerName.innerText = player2Name;
    }
    else {
        changeColor(player1Color);
        currentPlayerName.innerText = player1Name;
    }
}
function createNewGame() {
    var goodGame = true;
    getInputElem("score1").value = "0";
    getInputElem("score2").value = "0";
    if (getInputElem("player1").value == "" || getInputElem("player2").value == "") {
        alert("Need 2 players names");
        goodGame = false;
    }
    if (goodGame) {
        $("turn").classList.add("open");
        getInputElem("total").value = "0";
        $("player1").setAttribute("disabled", "disabled");
        $("player2").setAttribute("disabled", "disabled");
        $("player1Color").setAttribute("disabled", "disabled");
        $("player2Color").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function rollDie() {
    var currTotal = parseInt(getInputElem("total").value);
    var diceRoll = generateRandomValue(1, 6);
    var element = $("dice-box1");
    var numberOfDice = +[1];
    var values = [diceRoll];
    var options = { element: element, numberOfDice: numberOfDice, values: values, callback: response };
    rollADie(options);
    if (diceRoll == 1) {
        currTotal = 0;
        changePlayers();
    }
    else {
        currTotal += diceRoll;
    }
    getInputElem("die").value = diceRoll.toString();
    getInputElem("total").value = currTotal.toString();
}
function response(res) {
    console.log(res);
}
function holdDie() {
    var currTotal = parseInt($("total").value);
    var playerScore = 0;
    if ($("current").innerHTML == getInputElem("player1").value) {
        playerScore = parseInt(getInputElem("score1").value);
    }
    else {
        playerScore = parseInt(getInputElem("score2").value);
    }
    if ($("current").innerHTML == getInputElem("player1").value) {
        playerScore += currTotal;
        getInputElem("score1").value = playerScore.toString();
    }
    else {
        playerScore += currTotal;
        getInputElem("score2").value = playerScore.toString();
    }
    getInputElem("total").value = "0";
    winningNumber();
    changePlayers();
}
function winningNumber() {
    var player1Score = parseInt(getInputElem("score1").value);
    var player2Score = parseInt(getInputElem("score2").value);
    if (player1Score >= 100) {
        alert("Player 1 wins!");
        getInputElem("score1").value = "0";
        getInputElem("score2").value = "0";
        changePlayers();
    }
    if (player2Score >= 100) {
        alert("Player 2 wins!");
        getInputElem("score1").value = "0";
        getInputElem("score2").value = "0";
    }
}
function $(id) {
    return document.getElementById(id);
}
function getInputElem(id) {
    return $(id);
}
