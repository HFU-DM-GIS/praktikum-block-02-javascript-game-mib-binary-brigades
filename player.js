let canvasplayer = document.getElementById("player");
let context = canvasplayer.getContext("2d")
let playerX = 0; 
let playerY = 0;
let playerSize = 20;
let playercolor = "green";
let speed = 3;
let keys = [];
let keyX = 100;
let keyY = 100;
let keySize = 20;

window.addEventListener("keydown",function(e){
    keys[e.keyCode] = true
})
window.addEventListener("keyup",function(e) {
    keys[e.keyCode] = false
})

function init(){    //player starting position
    playerX = 50
    playerY = 50
}
function loop(){    
    update()
    render()
}
function update(){ //player movement/score
    if(keys[87] == true){   //up (w)
        playerY = playerY - speed
    }
    if(keys[65] == true){   //left (a)
        playerX = playerX - speed
    }
     if(keys[83] == true){   //down (s)
        playerY = playerY + speed
    }
    if(keys[68] == true){   //right (d)
        playerX = playerX + speed
    }
    if(playerX + playerSize > keyX && playerY + playerSize > keyY && keyX + keySize > playerX && keyY + keySize > playerY) {
        playerCollectedKey()
    }
 
}

function playerCollectedKey(){
    keyX = 1500;
    keyY = 1500;
    playercolor = "lightblue";


}
function render(){
    context.clearRect(0,0,1000,1000)
    context.fillStyle = playercolor     //player color
    context.fillRect(playerX,playerY,playerSize,playerSize)
    
    context.fillStyle = "yellow"    //key color
    context.beginPath()
    context.arc(keyX + keySize/2,keyY + keySize/2,keySize/2,keySize/2,0,360)
    context.fill()
}
function clearPlayer() {
    drawPlayer(player.initialX, player.initialY, player.size);
}
window.setInterval(loop,1000/60)
init()
