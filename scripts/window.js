// Window Constructor

  function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.fire = false;
  this.npc = false;
  this.timerNpcBurning = null;
  this.timerfireBurning = null;
/*
  this.fireBurning = function () {
      
      this.timerfireBurning = setTimeout(playSound("fire1", 0.1),0);


    
  }

  this.stopFireBurning = function () {
    clearTimeout(this.timerNpcBurning);
    this.timerNpcBurning = null;
  }
*/

  this.setFire = function () {
   // this.fireBurning = loopSound("fire1", 0.1);
    this.elem.querySelector(".fire").style.display = "block";
    this.fire = true;
    this.npcBurning();
  }

  this.removeFire = function () {
    this.elem.querySelector(".fire").style.
    display = "none";
    this.fire = false;
    this.stopNpcBurning();
   // this.stopFireBurning();
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
      this.timerNpcBurning = setTimeout(this.npcDies, 1000);
    }
  }

  this.stopNpcBurning = function () {
    clearTimeout(this.timerNpcBurning);
    this.timerNpcBurning = null;
  }

  //Mover a game
  this.npcDies = function () {
    audio.playSound("npcMuere", 0.1);
    console.log(" muerte un npc");
    this.removeNpc();
    lifes--;
    game.updateLifes(); // GLOBAL SCOPE, CUIDADO AL MOVERLA
    if (lifes <= 0) {
      audio.playSound("npcMuere", 0.1);
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