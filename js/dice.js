function generateRandomValue(minValue, maxValue) {
    minValue = Math.ceil(minValue);
    maxValue = Math.ceil(maxValue);
    var random = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return random;
}
function changePlayers() {
    var currentPlayerName = $("current");
    var player1Name = getInputElem("player1").value;
    var player2Name = getInputElem("player2").value;
    if (currentPlayerName.innerText == player1Name) {
        currentPlayerName.innerText = player2Name;
    }
    else {
        currentPlayerName.innerText = player1Name;
    }
}
window.onload = function () {
    var newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    $("roll").onclick = rollDie;
    $("hold").onclick = holdDie;
};
function createNewGame() {
    var goodGame = true;
    getInputElem("score1").value = "0";
    getInputElem("score2").value = "0";
    if (getInputElem("player1").value == "" || getInputElem("player2").value == "") {
        alert("Need 2 players names");
        goodGame = false;
    }
    if (goodGame) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function rollDie() {
    var currTotal = parseInt(getInputElem("total").value);
    var diceRoll = generateRandomValue(1, 6);
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
function holdDie() {
    var currTotal = parseInt(getInputElem("total").value);
    getInputElem("total").value = "0";
    changePlayers();
}
function $(id) {
    return document.getElementById(id);
}
function getInputElem(id) {
    return $(id);
}
