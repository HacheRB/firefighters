//Variables
const game = new Game();
const time = 2000;

var gameOn = false;
var lifes = 5;
var points = 0;
var totalPoints = 0;
var timerFireGen = null;
var timerNpcGen = null;

mainMenu();

// FUNCTION GAME
function Game() {
  this.fireman = new Fireman();
  this.fireman.removeNpc();
  this.windows = [
    new windowObj(11),
    new windowObj(12),
    new windowObj(13),
    new windowObj(21),
    new windowObj(22),
    new windowObj(23),
    new windowObj(31),
    new windowObj(32),
    new windowObj(33)
  ];
}
// ESTO IRIA DENTRO DE GAME --------------------------------------------------------------

function updateScore() {
  document.getElementById("score").querySelector("h2").innerHTML = `Points : ${points}`;
}

function updateLifes() {
  document.getElementById("lifes").querySelector("h2").innerHTML = `Lifes left : ${lifes}`;
}

function mainMenu() {
  //ocultar live y points
  document.getElementById("lifes").style.display = "none";
  document.getElementById("score").style.display = "none";
}
function showUi() {
  document.getElementById("lifes").style.display = "block";
  document.getElementById("score").style.display = "block";
}

function hideUi() {
  document.getElementById("lifes").style.display = "none";
  document.getElementById("score").style.display = "none";
}
function showTitle() {
  var title = document.getElementById("title");
  console.log(title)
  title.style.display = "block";
  var header = title.querySelector("h1");
  console.log(header);
  header.innerText = `GAME OVER!
    You got ${points} points!`;
}

function hideTitle() {
  document.getElementById("title").style.display = "none";
}


function setNpcTimer(time) {
  timerNpcGen = setInterval(generateNpc, time); // GLOBAL SCOPE, CUIDADO AL MOVERLA
}

function stopNpcTimer() {
  clearInterval(timerNpcGen);
  timerNpcGen = null;
}

function setFireTimer(time) {
  timerFireGen = setInterval(generateFire, time); // GLOBAL SCOPE, CUIDADO AL MOVERLA
}

function stopFireTimer() {
  clearInterval(timerFireGen);
  timerFireGen = null;
}

function newGame() {
  game.fireman.resetFireman();
  showUi();
  hideTitle();
  setFireTimer(time);// GLOBAL SCOPE, CUIDADO AL MOVERLA
  setNpcTimer(time);  // GLOBAL SCOPE, CUIDADO AL MOVERLA
}

function resetGame(game) {
  totalPoints = points;
  stopNpcTimer();  // GLOBAL SCOPE, CUIDADO AL MOVERLA
  stopFireTimer(); // GLOBAL SCOPE, CUIDADO AL MOVERLA
  game.fireman.resetFireman();
  for (let i = 0; i < game.windows.length; i++) {
    game.windows[i].resetWindow();
  }
  lifes = 5;
  updateLifes();
  updateScore();
  hideUi();
  showTitle();
  points = 0;

}

// ESTO IRIA DENTRO DE GAME --------------------------------------------------------------


function checkWindow(game) {
  let firemanRow = `row${game.fireman.row}`;
  let firemanCol = `col${game.fireman.col}`;
  for (let i = 0; i < game.windows.length; i++) {
    if ((game.windows[i].elem.classList.contains(firemanRow)) && (game.windows[i].elem.classList.contains(firemanCol))) {
      game.fireman.checkNpc(game.windows[i]);
    }
    if (game.fireman.row === 4 && game.fireman.npc) {
      game.fireman.dropNpc();
    }
  }
}

function generateNpc() {
  let randomNpc = Math.floor(Math.random() * 9);
  let ISFULL = (item) => item.npc === true;
  if (game.windows.every(ISFULL)) {
    stopNpcTimer();
    
    return;
  }
  else if (!game.windows[randomNpc].npc) {
    game.windows[randomNpc].setNpc();
  }
  else {
    generateNpc();
  }
}

function generateFire() {
  let randomFire = Math.floor(Math.random() * 9);
  let ISFULL = (item) => item.fire === true;
  if (game.windows.every(ISFULL)) {
    setButtonStart();
    resetGame(game);
    return;
  }
  else if (!game.windows[randomFire].fire) {
    game.windows[randomFire].setFire();
  }
  else {
    generateFire(game.windows);
  }
}

function extinguishFire(windowsArr, fireman) {
  let firemanRow = `row${fireman.row}`;
  let firemanCol = `col${fireman.col}`;
  for (let i = 0; i < windowsArr.length; i++) {
    if ((windowsArr[i].elem.classList.contains(firemanRow)) && (windowsArr[i].elem.classList.contains(firemanCol))) {
      windowsArr[i].removeFire();
    }
  }
}

//EVENT LISTENERS 
document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") { game.fireman.move("right") }
  if (event.code === "ArrowUp") { game.fireman.move("up") }
  if (event.code === "ArrowDown") { game.fireman.move("down") }
  if (event.code === "ArrowLeft") { game.fireman.move("left") }
  if (event.code === "KeyA") { extinguishFire(game.windows, game.fireman) }
  if (event.code === "Space") { checkWindow(game) }
  //console.log(event.code);
})




const button = document.getElementById('start').querySelector("h2")

button.addEventListener("click", function() {
  if (!gameOn) {
    console.log(!gameOn + " if");
    button.innerText = 'End'
    gameOn = true;
    newGame();
  } else {
    console.log(gameOn + " else")
    button.innerText = 'Start'
    resetGame(game);
    gameOn = false;
  }
})

function setButtonStart(){
  button.innerText = 'Start';
  gameOn = false; 
}


