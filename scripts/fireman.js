
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

  this.removePosition = function () {
    this.elem.classList.remove(`row${this.row}`);
    this.elem.classList.remove(`col${this.col}`);
  }

  this.addPosition = function () {
    this.elem.classList.add(`row${this.row}`);
    this.elem.classList.add(`col${this.col}`);
  }

  this.move = function (dir) {
    this.removePosition();

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
    this.addPosition();
  }

  this.resetFireman = function () {
    this.removePosition();
    this.row = 4;
    this.col = 4;
    this.removeNpc();
    this.addPosition();
  }

  // ANTERIORMENTE - > SCOPE GLOBAL // SUPUESTAMENTE FUNCIONANDO YA
  this.checkNpc = function (window) {
    if (window.npc && !this.npc) {
      window.removeNpc();
      this.setNpc();
    }
  }

  this.dropNpc = function () {
    this.removeNpc();
    this.addPoints();
  }
  this.addPoints = function () {
    points += 100;
    updateScore(); // GLOBAL SCOPE, CUIDADO AL MOVERLA
  }
}