// Window Constructor

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.fire = false;
  this.npc = false;
  this.timerNpcBurning = null;

  this.fireBurning = function () {
    audio.playSound("fire1", 0.1);
  }

  this.stopFireBurning = function () {
    audio.pauseSound("fire1");
  }

  this.setFire = function () {
    this.elem.querySelector(".fire").style.display = "block";
    this.fire = true;
    this.npcBurning();
    this.fireBurning();
  }

  this.removeFire = function () {
    this.elem.querySelector(".fire").style.
      display = "none";
    this.fire = false;
    this.stopNpcBurning();
    this.stopFireBurning();
  }

  this.setNpc = function () {
    this.elem.querySelector(".npc").style.display = "block";
    this.npc = true;
    this.npcBurning();
  }

  this.removeNpc = function () {
    this.elem.querySelector(".npc").style.display = "none";
    this.npc = false;
    this.stopNpcBurning();
  }

  this.npcBurning = function () {
    if (this.npc && this.fire) {
      this.timerNpcBurning = setTimeout(this.npcDies, 3000);
    }
  }

  this.stopNpcBurning = function () {
    clearTimeout(this.timerNpcBurning);
    this.timerNpcBurning = null;
  }

  //Mover a game
  this.npcDies = function () {
    audio.playSound("npcMuere", 0.1);
    this.removeNpc();
    lifes--;
    game.updateLifes();
    if (lifes <= 0) {
      audio.playSound("npcMuere", 0.1);
      game.setButtonStart();
      audio.playSound("gameOver", 0.1);
      game.resetGame();
      return;
    }
  }.bind(this);

  this.resetWindow = function () {
    this.removeFire();
    this.removeNpc();

  }
}
