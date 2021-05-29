function generateRandomValue(minValue, maxValue) {
    minValue = Math.ceil(minValue);
    maxValue = Math.ceil(maxValue);
    var random = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
    return random;
}
function changePlayers() {
    var currentPlayerName = document.getElementById("current").innerText;
    var player1Name = document.getElementById("player1").value;
    var player2Name = document.getElementById("player2").value;
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
