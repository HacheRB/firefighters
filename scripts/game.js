//Variables
var points = 0;
var lifes = 5;
var gameOn = false;
var timerNpCGen = null;
var timerFireGen = null;
const game = new Game();
const time = 2000;
mainMenu();

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.npc = false;
  this.fire = false;
  this.timerNpcBurning = null;
  

  this.setFire = function () {
    this.elem.classList.add("fireOnWindow");
    this.fire = true;
    this.npcBurning();
  }
  this.removeFire = function () {
    this.elem.classList.remove("fireOnWindow");
    this.fire = false;
    clearTimeout(this.timerNpcBurning);
    this.timerNpcBurning = null;
  }
  this.setNpc = function () {
    this.elem.classList.add("npcOnWindow");
    this.npc = true;
    this.npcBurning();
  }
  this.removeNpc = function () {
    this.elem.classList.remove("npcOnWindow");
    this.npc = false;
    clearTimeout(this.timerNpcBurning);
    this.timerNpcBurning = null;
  }
  this.resetWindow = function () {
    this.removeFire();
    this.removeNpc();
  }
  this.npcBurning = function () {
    if (this.npc && this.fire){
      this.timerNpcBurning = setTimeout(this.npcDies, 1000);
    }
  }
  this.npcDies = function(){
    //sonido de muerte 
    console.log(" muerte un npc");
    this.removeNpc();
    lifes--;
    updateLifes();
    if (lifes <= 0){
      resetGame(game);
      return
    }
  }.bind(this); //
}

function updateScore (){
  document.getElementById("score").querySelector("h2").innerHTML =`Points : ${points}`;
}

function updateLifes (){
  document.getElementById("lifes").querySelector("h2").innerHTML =`Lifes left : ${lifes}`;
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
    this.resetFireman = function(){
      this.elem.classList.remove(`row${this.row}`);
      this.elem.classList.remove(`col${this.col}`); 
      this.row = 4;
      this.col = 4;
      this.removeNpc();
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
  game.fireman.resetFireman();
  document.getElementById("lifes").style.display = "block";
  document.getElementById("score").style.display = "block";
  setFireTimer(time);
  setNpcTimer(time);


}

function resetGame(game) {
  let totalPoints = points;
  console.log("game over - reset")
  stopFireTimer();
  stopNpcTimer();
  game.fireman.resetFireman();
  for (let i = 0; i < game.windows.length; i++ ){
    game.windows[i].resetWindow();

  }
  points = 0;
  lifes = 5;
  document.getElementById("score").querySelector("h2").innerHTML =`Points : ${points}`;
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
 
  addPoints();
}

function addPoints(){
  points += 100;
  updateScore();
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
//funcion añada fuego a celdas que tienen NPC
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
  if (!gameOn) {
    button.innerText = 'Reset'
    gameOn = true;
    newGame();
  } else {
    button.innerText = 'Start'
    //funcion reset
    resetGame(game);
    gameOn = false;
  }
})
















