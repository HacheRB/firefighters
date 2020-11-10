/* Funciones que no usamos
function Windows() {
  this.window1 = document.getElementById("window11");
  this.window2 = document.getElementById("window12");
  this.window3 = document.getElementById("window13");
  this.window4 = document.getElementById("window21");
  this.window5 = document.getElementById("window22");
  this.window6 = document.getElementById("window23");
  this.window7 = document.getElementById("window31");
  this.window8 = document.getElementById("window32");
  this.window9 = document.getElementById("window33");
  this.getRandomWindow = function () {
    var windowSel = Math.floor(Math.random() * 9) + 1;
    //console.log(windowSel);
    return windowSel;
  }
}*/

const game = new Game();

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  //console.log(this.elem);
  this.npc = false;
  this.fire = false;

  this.setFire = function (){
    this.elem.classList.add("fireOnWindow");
    this.fire = true;
  }

  this.removeFire = function () {
    this.elem.classList.remove("fireOnWindow");
    this.fire = false; 
  }

  this.setNpc = function (){
    this.elem.classList.add("npcOnWindow"); 
    this.npc = true;
  }
  this.removeNpc = function (){
    this.elem.classList.remove("npcOnWindow");
    this.npc = false;
  }
}

function Fireman() {
  this.elem = document.getElementById('fireman')
  this.col = 4;
  this.row = 4;
  this.hasNpc = false;
  this.move = function (dir) {
    if (dir === "right" && this.col < 4) { this.col++ }
    if (dir === "up" && this.row > 1) { this.row-- }
    if (dir === "left" && this.col > 1) { this.col-- }
    if (dir === "down" && this.row < 4) { this.row++ }
    this.elem.classList = `row${this.row} col${this.col}`
  }
}

function Game() {
  this.fireman = new Fireman();
  this.window1 = new windowObj(11);
  this.window2 = new windowObj(12);
  this.window3 = new windowObj(13);
  this.window4 = new windowObj(21);
  this.window5 = new windowObj(22);
  this.window6 = new windowObj(23);
  this.window7 = new windowObj(31);
  this.window8 = new windowObj(32);
  this.window9 = new windowObj(33);
}

function checkNpcOnWindow(){
  //tenemos que detectar la posicion de la ventana y comprobar si npc esta e true
  
    var firemanRow = `row${game.fireman.row}`;
    var firemanCol =`col${game.fireman.col}`;
    console.log(firemanRow);
    console.log(firemanCol);
}

checkNpcOnWindow();
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") { game.fireman.move("right") }
  if (event.key === "ArrowUp") { game.fireman.move("up") }
  if (event.key === "ArrowDown") { game.fireman.move("down") }
  if (event.key === "ArrowLeft") { game.fireman.move("left") }

})

console.log(game.window1.npc);
game.window1.setNpc();
game.window2.setFire();

//game.window1.removeNpc();
//game.window2.removeFire();


/*
console.log(game.windows.getRandomWindow());  //style.backgroundColor = 'red';
*/