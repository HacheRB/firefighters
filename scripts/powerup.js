
//FATHER 
function PowerUp() {
  this.elem = document.getElementById("powerUp");
  this.col = 4;
  this.row = 1;
  this.powerUpId = "#powerUp"

  this.getPowerUpId = function () {
    return this.powerUpId;
  }
  this.setRandomRow = function () {
    this.elem.classList.remove(`row${this.row}`);
    this.row = Math.floor(Math.random() * 4) + 1;
    this.elem.classList.add(`row${this.row}`);
  }

  this.showPowerUp = function (string) {
    document.querySelector(string).style.display = "block";
    isPowerUpActive = true;
  }

  this.hidePowerUp = function (string) {
    document.querySelector(string).style.display = "none";
    isPowerUpActive = false;
    timerDeletePowerUp = null;
  }
}

// SONS

function lifePowerUp() {
  PowerUp.call(this);
  this.powerUpId = "#heart";

  this.setPowerUp = function () {
    if (lifes < 5) {
      audio.playSound("extraLife", 0.05);
      lifes++;
      game.updateLifes();
      this.hidePowerUp(this.PowerUpId);
    }
    else {
      audio.playSound("errorSound", 0.05);
    }
  }.bind(this)

  this.deletePowerUp = function () {
    this.hidePowerUp(this.getPowerUpId());
    isPowerUpActive = false;
    game.stopPowerUpTimer();
    timerDeletePowerUp = null;
  }
}

// slow time 
function slowTime() {
  PowerUp.call(this);
  this.powerUpId = "#clock";

  this.setPowerUp = function () {
    audio.playSound("extraLife", 0.05);
    this.hidePowerUp(this.powerUpId);
    isTimeSlowed = true;
    let currentTime = time * 10;
    game.stopNpcTimer();
    game.stopFireTimer();
    game.setNpcTimer(currentTime);
    game.setFireTimer(currentTime);
    timerDeletePowerUp = setTimeout(game.changeTimersSpeed, time);
  }
}

// slowTime.prototype = Object.create(PowerUp.prototype);
// slowTime.prototype.constructor = slowTime;
