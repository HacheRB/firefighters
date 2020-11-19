
//FATHER 
function PowerUp() {
  this.canvas = document.getElementById("game");
  this.col = 4;
  this.row = 1;

  this.setRandomRow = function () {
    this.row = Math.floor(Math.random() * 4) + 1;
  }
}
// SONS

function lifePowerUp() {
  PowerUp.call();

  this.setPowerUp = function () {
    if (lifes < 5) {
      audio.playSound("extraLife", 0.05);
      lifes++;
      game.updateLifes();
    }
  }
}

// lifePowerUp.prototype = Object.create(PowerUp.prototype);
// lifePowerUp.prototype.constructor = lifePowerUp;


// slow time 
function slowTime() {
  PowerUp.call();

  this.setPowerUp = function () {
    isTimeSlowed = true;
    let currentTime = time * 3;
    game.stopNpcTimer();
    game.stopFireTimer();
    game.setNpcTimer(currentTime);
    game.setFireTimer(currentTime);
    timerPowerUpDuration = setTimeout(game.changeTimersSpeed, 20000, time);
  }
}

// slowTime.prototype = Object.create(PowerUp.prototype);
// slowTime.prototype.constructor = slowTime;
