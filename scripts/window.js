// Window Constructor

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.fire = false;
  this.npc = false;
  this.timerNpcBurning = null;

  this.setFire = function () {
    this.elem.querySelector(".fire").style.display = "block";
    this.fire = true;
    this.npcBurning();
  }

  this.removeFire = function () {
    this.elem.querySelector(".fire").style.display = "none";
    this.fire = false;
    this.stopNpcBurning();
  }

  this.setNpc = function () {
    this.elem.classList.add("npcOnWindow");
    this.npc = true;
    this.npcBurning();
  }

  this.removeNpc = function () {
    this.elem.classList.remove("npcOnWindow");
    this.npc = false;
    this.stopNpcBurning();
  }

  this.npcBurning = function () {
    if (this.npc && this.fire) {
      this.timerNpcBurning = setTimeout(this.npcDies, 1000);
    }
  }

  this.stopNpcBurning = function () {
    clearTimeout(this.timerNpcBurning);
    this.timerNpcBurning = null;
  }

  this.npcDies = function () {
    //sonido de muerte 
    console.log(" muerte un npc");
    this.removeNpc();
    lifes--;
    game.updateLifes(); // GLOBAL SCOPE, CUIDADO AL MOVERLA
    if (lifes <= 0) {
      game.setButtonStart();
      game.resetGame();// GLOBAL SCOPE, CUIDADO AL MOVERLA
      return; //
    }
  }.bind(this);

  this.resetWindow = function () {
    this.removeFire();
    this.removeNpc();
  }
}