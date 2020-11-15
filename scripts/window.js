
function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  this.fire = false;
  this.npc = false;
  this.timerNpcBurning = null;
  this.setFire = function () {
    this.elem.classList.add("fireOnWindow");
    this.fire = true;
    this.npcBurning();
  }
  this.removeFire = function () {
    this.elem.classList.remove("fireOnWindow");
    this.fire = false;
    console.log(stopNpcTimer());  // ESTO DA UNDEFINED
    stopNpcTimer();
  }
  this.setNpc = function () {
    this.elem.classList.add("npcOnWindow");
    this.npc = true;
    this.npcBurning();
  }
  this.removeNpc = function () {
    this.elem.classList.remove("npcOnWindow");
    this.npc = false;
    stopNpcTimer();
  }
  this.resetWindow = function () {
    this.removeFire();
    this.removeNpc();
  }
  this.npcBurning = function () {
    if (this.npc && this.fire) {
      this.timerNpcBurning = setTimeout(this.npcDies, 1000);
    }
  }
  this.npcDies = function () {
    //sonido de muerte 
    console.log(" muerte un npc");
    this.removeNpc();
    lifes--;
    updateLifes(); // GLOBAL SCOPE, CUIDADO AL MOVERLA
    if (lifes <= 0) {
      resetGame(game);// GLOBAL SCOPE, CUIDADO AL MOVERLA
      return;
    }
  }.bind(this); //
}