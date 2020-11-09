//Array posiciones de ventanas 





//Function´s
function Windows(){
  this.window1 = document.getElementById("window11");
  this.window2 = document.getElementById("window12");
  this.window3 = document.getElementById("window13");
  this.window4 = document.getElementById("window21");
  this.window5 = document.getElementById("window22");
  this.window6 = document.getElementById("window23");
  this.window7 = document.getElementById("window31");
  this.window8 = document.getElementById("window32");
  this.window9 = document.getElementById("window33");

  this.getRandomWindow = function (){
    var windowSel = Math.floor(Math.random()*9)+1;
    //console.log(windowSel);
    return windowSel;
  }
}




function Fireman() {
  this.elem = document.getElementById('fireman')
  this.col = 4;
  this.row = 4;
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
  this.windows = new Windows();

}

const game = new Game();

console.log(game.windows.getRandomWindow());  //style.backgroundColor = 'red';

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") { game.fireman.move("right") }
  if (event.key === "ArrowUp") { game.fireman.move("up") }
  if (event.key === "ArrowDown") { game.fireman.move("down") }
  if (event.key === "ArrowLeft") { game.fireman.move("left") }
})