// Fireman Constructor

function Fireman() {
  this.elem = document.getElementById("fireman");
  this.col = 4;
  this.row = 4;
  this.npc = false;

  this.setNpc = function () {
    this.elem.querySelector(".npcBasket").style.display = "block";
    this.npc = true;
  }
  this.removeNpc = function () {
    this.elem.querySelector(".npcBasket").style.display = "none";
    this.npc = false;
  }
  //Checks if windows has npc and fireman doesn´t 
  this.checkNpc = function (window) {
    if (window.npc && !window.fire && !this.npc) {
      npcWindowHadFire = false;
      window.removeNpc();
      this.setNpc();
    }
    if (window.npc && window.fire && !this.npc) {
      npcWindowHadFire = true;
      window.removeNpc();
      this.setNpc();
    }
  }

  this.dropNpc = function () {
    this.removeNpc();
    game.addPoints();
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
}