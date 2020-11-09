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
}

const game = new Game();

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") { game.fireman.move("right") }
  if (event.key === "ArrowUp") { game.fireman.move("up") }
  if (event.key === "ArrowDown") { game.fireman.move("down") }
  if (event.key === "ArrowLeft") { game.fireman.move("left") }
})