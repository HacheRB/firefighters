//Constantes del juego
const game = new Game();
const audio = new audioPlayer();

// variables globales del juego
var gameOn = false;               //si está en partida o no
var howToOn = false;              // si estás en el menu how to
var musicOn = false;
var lifes = 5;                    //vidas
var level = 0;                    //nivel actual
var points = 0;                   //puntos totales
var totalPoints = 0;              //var para mostrar los puntos por pantalla, antes de reiniciarlos
var time = 3000;                  //variable tiempo para los timers
var countNpc = 0;                 //contador de NPCs salvados(usada para calcular la subida de nivel cuando vale 3)
var timerFireGen = null;          // timer generador de fuego
var timerNpcGen = null;           // timer generador de npcs
var isPowerUpActive = false;
var isTimeSlowed = false;         // variable para controlar si el tiempo está relentizado(powerup)
var timerPowerUpDuration = null;  // timer del generador de power up
var timerDeletePowerUp = null; //
var npcWindowHadFire = false;     // si habia fuego en la ventana del npc cuando lo recogiste.
var block = "block";
const IMAGES = {
  lifePowerUp: "assets/images/heart.png",
  slowTime: "assets/images/clock.png",
}

//EVENT LISTENERS 
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") { game.fireman.move("right") }
  if (event.code === "ArrowUp") { game.fireman.move("up") }
  if (event.code === "ArrowDown") { game.fireman.move("down") }
  if (event.code === "ArrowLeft") { game.fireman.move("left") }
  if (event.code === "KeyA") { game.extinguishFire() }
  if (event.code === "Space") {
    game.checkWindow();
    game.checkPowerUpRow();
  }
  //console.log(event.code);
})

//Boton Start/End
const button = document.getElementById('start')
//.querySelector("h2");
const bth2 = button.querySelector("h3");
button.addEventListener("click", function (event) {
  if (!gameOn) {
    audio.playSound("pause_in", 0.1);
    bth2.innerText = 'End'
    game.hideById("howToBt");
    game.hideById("title");
    game.newGame();
    gameOn = true;
  } else {
    audio.playSound("pause_out", 0.1);
    bth2.innerText = 'Start';
    game.showById("howToBt", block);
    game.resetGame();
    gameOn = false;
  }
})

//Boton how to
const btHow = document.getElementById('howToBt')
//.querySelector("h3");
const bth3 = btHow.querySelector("h3");
btHow.addEventListener("click", function (event) {
  if (!howToOn && !gameOn) {
    audio.playSound("pause_in", 0.1);
    bth3.innerText = 'Back';
    game.hideById("start");
    game.hideById("title");
    game.hideById("gameOver")
    game.showById("howToPlay", block);
    howToOn = true;
  }
  else {
    audio.playSound("pause_out", 0.1);
    bth3.innerText = 'How to';
    game.showById("start", block);
    game.hideById("howToPlay");
    game.showById("title", block);
    howToOn = false;
  }
})

//Button Music
const btMusic = document.getElementById('music');
btMusic.addEventListener("click", function (event) {
  if (!musicOn) {
    audio.loopSound("music", 0.025)
    musicOn = true;
    btMusic.style.backgroundColor = "red";
  }
  else {
    audio.pauseSound("music")
    btMusic.style.backgroundColor = "green";
    musicOn = false;
  }
})
