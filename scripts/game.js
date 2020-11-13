//Variables
var points = 0;
var gameOn = null;
var timerNpCGen = null;
var timerFireGen = null;
const game = new Game();
const time = 2000;
mainMenu();

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.npc = false;
  this.fire = false;
  this.countNpc = 0;

  this.setFire = function () {
    this.elem.classList.add("fireOnWindow");
    this.fire = true;
    //this.timerDuration = setTimeout(this.removeFire, 5000);
  }
  this.removeFire = function () {
    this.elem.classList.remove("fireOnWindow");
    //console.log(this.elem);
    this.fire = false;
  }
  this.setNpc = function () {
    this.elem.classList.add("npcOnWindow");
    this.npc = true;
  }
  this.removeNpc = function () {
    this.elem.classList.remove("npcOnWindow");
    this.npc = false;
  }
  this.countState = function () {
    console.log("pendiente");
  }

}
function Fireman() {
  this.elem = document.getElementById("fireman");
  this.col = 4;
  this.row = 4;
  this.npc = false;

  this.setNpc = function () {
    this.elem.classList.remove("withoutNpc");
    this.elem.classList.add("withNpc");
    this.npc = true;
  }
  this.removeNpc = function () {
    this.elem.classList.remove("withNpc");
    this.elem.classList.add("withoutNpc");
    this.npc = false;
  }
  this.move = function (dir) {
    this.elem.classList.remove(`row${this.row}`);
    this.elem.classList.remove(`col${this.col}`);

    if (dir === "right" && this.col < 4) {
      this.col++;
    }
    if (dir === "up" && this.row > 1) {
      this.row--;
    }
    if (dir === "left" && this.col > 1) {
      this.col--;
    }
    if (dir === "down" && this.row < 4) {
      this.row++;
    }
    this.elem.classList.add(`row${this.row}`);
    this.elem.classList.add(`col${this.col}`);
  }
}

function mainMenu() {
  //ocultar live y points
  document.getElementById("lifes").style.display = "none";
  document.getElementById("score").style.display = "none";
}

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

function setFireTimer(time) {
  timerFireGen = setInterval(generateFire, time);
}
function setNpcTimer(time) {
  timerNpcGen = setInterval(generateNpc, time);
}
function stopFireTimer() {
  clearInterval(timerFireGen);
  timerFireGen = null;
}

function stopNpcTimer() {
  clearInterval(timerNpCGen);
  timerNpCGen = null;
}

function newGame() {
  document.getElementById("lifes").style.display = "block";
  document.getElementById("score").style.display = "block";
  setFireTimer(time);
  setNpcTimer(time);
}

function resetGame() {
  let totalPoints = points;
  stopFireTimer();
  stopNpcTimer();
  points = 0;
}

function checkWindow(windowsArr, fireman) {
  let firemanRow = `row${fireman.row}`;
  let firemanCol = `col${fireman.col}`;
  for (let i = 0; i < windowsArr.length; i++) {
    if ((windowsArr[i].elem.classList.contains(firemanRow)) && (windowsArr[i].elem.classList.contains(firemanCol))) {
      checkNpc(windowsArr[i], fireman);
    }
    if (fireman.row === 4 && fireman.npc) {
      dropNpc(fireman);
    }
  }
}

function checkNpc(window, fireman) {
  if (window.npc && !fireman.npc) {
    window.removeNpc();
    fireman.setNpc();
  }
}

function dropNpc(fireman) {
  fireman.removeNpc();
  points += 100;
  //actualizar contador
}

function generateNpc() {
  let randomNpc = Math.floor(Math.random() * 9);
  let ISFULL = (item) => item.npc === true;
  if (game.windows.every(ISFULL)) {
    stopNpcTimer()
    return;
  }
  else if (!game.windows[randomNpc].npc) {
    game.windows[randomNpc].setNpc();
  }
  else {
    generateNpc(game.windows);
  }
}

//Funcion que vale para generar tanto fuego como npc
// EN PROCESO?
function generate(param) {
  let capitalParam = param.charAt(0).toUpperCase + param.slice(1);
  console.log(capitalParam);
  let randomNpc = Math.floor(Math.random() * 9);
  let ISFULL = (item) => item.param === true;
  if (game.windows.every(ISFULL)) {
    stopNpcTimer()
    return;
  }
  else if (!game.windows[randomNpc].param) {
    game.windows[randomNpc].setNpc();
  }
  else {
    generateNpc(game.windows);
  }
}

//refactorizar las 2 funciones generateNpc y generateFire, 
//tened en cuenta que el fuego necesitamos 2 contadores npc y fire
//el npc le pondremos un math random para que muera a un tiempo 
function generateFire() {
  let randomFire = Math.floor(Math.random() * 9);
  let ISFULL = (item) => item.fire === true;
  if (game.windows.every(ISFULL)) {
    console.log("GAME OVER");

    resetGame(game);
    return;
  }
  else if (!game.windows[randomFire].fire) {
    game.windows[randomFire].setFire();
    //let timerDuration = setTimeout(windowsArr[randomFire].removeFire, 5000);
  }
  else {
    generateFire(game.windows);
  }
}

//funcion añada fuego a celdas que tienen NPC,

function extinguishFire(windowsArr, fireman) {
  let firemanRow = `row${fireman.row}`;
  let firemanCol = `col${fireman.col}`;
  for (let i = 0; i < windowsArr.length; i++) {
    if ((windowsArr[i].elem.classList.contains(firemanRow)) && (windowsArr[i].elem.classList.contains(firemanCol))) {
      windowsArr[i].removeFire();
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowRight") { game.fireman.move("right") }
  if (event.code === "ArrowUp") { game.fireman.move("up") }
  if (event.code === "ArrowDown") { game.fireman.move("down") }
  if (event.code === "ArrowLeft") { game.fireman.move("left") }
  if (event.code === "KeyA") { extinguishFire(game.windows, game.fireman) }
  if (event.code === "Space") { checkWindow(game.windows, game.fireman) }
  //console.log(event.code);
})

const button = document.getElementById('start').querySelector("h2")
button.addEventListener("click", function (event) {
  if (gameOn === null) {
    button.innerText = 'Reset'
    newGame();
  } else {
    button.innerText = 'Start'
    //funcion reset
    resetGame(game);
    gameOn = null;
  }
})
















