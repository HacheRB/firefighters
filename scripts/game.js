//Variables
const game = new Game();

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.npc = false;
  this.fire = false;

  this.setFire = function () {
    this.elem.classList.add("fireOnWindow");
    this.fire = true;
  }

  this.removeFire = function () {
    this.elem.classList.remove("fireOnWindow");
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
}

function Fireman() {
  this.elem = document.getElementById("fireman");
  this.col = 4;
  this.row = 4;
  this.npc = false;

  this.setNpc = function () {
    this.elem.classList.add("withNpc");
    this.npc = true;
  }

  this.removeNpc = function () {
    this.elem.classList.remove("withNpc");
    this.npc = false;
  }

  this.move = function (dir) {
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
    if(!fireman.npc){
      this.elem.classList = `row${this.row} col${this.col}`
    }
    if (fireman.npc){
      this.elem.classList = `row${this.row} col${this.col }withNpc`
    }
    //this.elem.classList = `row${this.row} col${this.col}`
  }
}

function Game() {
  this.fireman = new Fireman();
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

function checkWindow(windowsArr, fireman) {
  let firemanRow = `row${game.fireman.row}`;
  let firemanCol = `col${game.fireman.col}`;
  for (let i = 0; i < windowsArr.length; i++) {
    if ((windowsArr[i].elem.classList.contains(firemanRow)) && (windowsArr[i].elem.classList.contains(firemanCol))) {
      checkNpc(windowsArr[i], fireman);
    }
    if (fireman.row === 4  && fireman.npc ){
      dropNpc(fireman);
    }
  }
}

function checkNpc(window, fireman) {
  if (window.npc){
    window.removeNpc();
    fireman.setNpc();
  }
}

function dropNpc(fireman){
    fireman.removeNpc();
    //sumar puntos, actualizar contadores 
  }

function generateNpc(windowsArr){
  let randomNpc = Math.floor(Math.random()*8 );
  let ISFULL = (item) => item.npc === true;   
  if (windowsArr.every(ISFULL)){
    return;
  }
  else if(!windowsArr[randomNpc].npc){
    windowsArr[randomNpc].setNpc();
  }
  else{
    generateNpc(windowsArr);
  }
}
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") { game.fireman.move("right") }
  if (event.key === "ArrowUp") { game.fireman.move("up") }
  if (event.key === "ArrowDown") { game.fireman.move("down") }
  if (event.key === "ArrowLeft") { game.fireman.move("left") }
  if (event.key === " ") { checkWindow(game.windows, game.fireman) }
  //console.log(event);
})

//PRUEBAS 
//game.windows[1].setNpc();
//game.windows[2].setNpc();
game.windows[3].setNpc();
game.windows[4].setNpc();
game.windows[5].setNpc();
game.windows[6].setNpc();
game.windows[7].setNpc();
game.windows[8].setNpc();
game.windows[0].setNpc();
console.log(game.windows[0]);
generateNpc(game.windows);
