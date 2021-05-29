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
    document.getElementById("turn").classList.add("open");
    document.getElementById("total").value = "0";
    document.getElementById("player1").setAttribute("disabled", "disabled");
    document.getElementById("player2").setAttribute("disabled", "disabled");
    changePlayers();
}
function rollDie() {
    var currTotal = parseInt(document.getElementById("total").value);
    var diceRoll = generateRandomValue(1, 6);
    console.log(diceRoll);
    getInputElem("die").value = diceRoll.toString();
}
function holdDie() {
    changePlayers();
}
function $(id) {
    return document.getElementById(id);
}
function getInputElem(id) {
    return $(id);
}
