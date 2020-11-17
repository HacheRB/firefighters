//Variables del juego
const game = new Game();
var time = 3000;
const audio = new audioPlayer();

var gameOn = false;
var howToOn = false;
var lifes = 5;
var points = 0;
var level = 0;
var countNpc = 0;
var totalPoints = 0;
var timerFireGen = null;
var timerNpcGen = null;
var npcWindowHadFire = false; 
var block = "block";
game.mainMenu();




//EVENT LISTENERS 
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") { game.fireman.move("right") }
  if (event.code === "ArrowUp") { game.fireman.move("up") }
  if (event.code === "ArrowDown") { game.fireman.move("down") }
  if (event.code === "ArrowLeft") { game.fireman.move("left") }
  if (event.code === "KeyA") { game.extinguishFire() }
  if (event.code === "Space") { game.checkWindow() }
  //console.log(event.code);
})


//Boton Start/End
const button = document.getElementById('start').querySelector("h2")
button.addEventListener("click", function (event) {
  if (!gameOn) {
    audio.playSound("pause_in", 0.1);
    console.log(!gameOn + " if");
    button.innerText = 'End'
    gameOn = true;
    game.newGame();
  } else {
    audio.playSound("pause_out", 0.1);
    console.log(gameOn + " else");
    button.innerText = 'Start';
    game.resetGame();
    gameOn = false;
  }
})

//Boton how to
const btHow = document.getElementById('howToBt').querySelector("h3")
btHow.addEventListener("click", function (event) {
  if (!howToOn) {
    audio.playSound("pause_in", 0.1);
    btHow.innerText = 'Back';
    game.hideById("start");
    game.hideById("title");
    howToOn = true;
  } 
  else {
    audio.playSound("pause_out", 0.1);
    btHow.innerText = 'How to';
    game.showById("start", block);
    game.showById("title", block);
    howToOn = false;
  }
})




