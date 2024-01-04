let canvasplayer = document.getElementById("player");
let context = canvasplayer.getContext("2d")
let playerX = 0;
let playerY = 0;
let playerSize = 10;
let playercolor = "lightblue";
let speed = 3;
let keys = [];
let keyX = 100;
let keyY = 100;
let keySize = 20;
let score = 0;
let quotes = [];

// check the deprecation warning: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
window.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true
})
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false
})
async function fetchQuote() {
    try {
        const response = await fetch('https://api.whatdoestrumpthink.com/api/v1/quotes/random');
        const data = await response.json();
        return data.quote;
    } catch (error) {
        console.error('Error:', error);
    }
}

function init() {    //player starting position
    playerX = Math.random() * (600 - playerSize);
    playerY = Math.random() * (600 - playerSize);
    keyX = Math.random() * (600 - keySize);
    keyY = Math.random() * (600 - keySize);
}
function loop() {
    update()
    render()
}
function update() { //player movement/score
    if (keys[87] == true) {   //up (w)
        playerY = playerY - speed
    }
    if (keys[65] == true) {   //left (a)
        playerX = playerX - speed
    }
    if (keys[83] == true) {   //down (s)
        playerY = playerY + speed
    }
    if (keys[68] == true) {   //right (d)
        playerX = playerX + speed
    }
    // dieses if statement in einer Funktion kapseln und diese sinnvoll benennen
    if (playerX + playerSize > keyX && playerY + playerSize > keyY && keyX + keySize > playerX && keyY + keySize > playerY) {
        playerCollectedKey()
    }
    // hier holt ihr euch im loop immer wieder einen neuen Spruch, das führt nach einer Weile zu einem Fehler
    if (score > 0 && score % 1 == 0) {
        fetchQuote().then(quote => {
            quotes.push(quote);
        });
    }

}


function playerCollectedKey() { // benennt die Funktion nach dem was sie tutm nicht wann sie aufgerufen wird.
    keyX = Math.random() * (600 - keySize);
    keyY = Math.random() * (600 - keySize);
    score = score + 1;
}
function render() {      //creating viewable objects
    context.clearRect(0, 0, 1000, 1000)
    context.fillStyle = playercolor     //player
    context.fillRect(playerX, playerY, playerSize, playerSize)

    context.fillStyle = "yellow"    //key
    context.beginPath()
    context.arc(keyX + keySize / 2, keyY + keySize / 2, keySize / 2, keySize / 2, 0, 360)
    context.fill()

    context.fillStyle = "white"     //score
    context.font = "20px Impact"
    context.fillText("Score: " + score, 0, 20)

    if (quotes.length > 0) {     //api
        context.fillStyle = "white";
        context.font = "20px Impact";
        context.fillText(quotes[quotes.length - 1], 0, 50);
    }
}
function clearPlayer() {
    drawPlayer(player.initialX, player.initialY, player.size);
}
window.setInterval(loop, 1000 / 60)
init() // ungewöhnlich die Initialisierung nach dem Starten des Game Loops zu machen
