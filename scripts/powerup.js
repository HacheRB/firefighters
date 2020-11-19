
//FATHER 
function PowerUp() {
  this.elem = document.getElementById("powerUp");
  this.col = 4;
  this.row = 1;

  this.setRandomRow = function () {
    this.row = Math.floor(Math.random() * 4) + 1;

  }

  // add position to the class.
  this.addPosition = function () {
    this.elem.classList.add(`row${this.row}`);
    this.elem.classList.add(`col${this.col}`);
  }

}
// SONS

function lifePowerUp() {
  PowerUp.call();

  this.setPowerUp = function () {
    this.elem.querySelector("#heart").style.display = "block";
    if (lifes < 5) {
      audio.playSound("extraLife", 0.05);
      lifes++;
      game.updateLifes();
    }
  }
}

lifePowerUp.prototype = Object.create(PowerUp.prototype);
lifePowerUp.prototype.constructor = lifePowerUp;


// slow time 
function slowTime() {
  PowerUp.call();

  this.setPowerUp = function () {
    this.elem.querySelector("#clock").style.display = "block";
    isTimeSlowed = true;
    let currentTime = time * 3;
    game.stopNpcTimer();
    game.stopFireTimer();
    game.setNpcTimer(currentTime);
    game.setFireTimer(currentTime);
    timerPowerUpDuration = setTimeout(game.changeTimersSpeed, 20000, time);
  }
}

slowTime.prototype = Object.create(PowerUp.prototype);
slowTime.prototype.constructor = slowTime;
