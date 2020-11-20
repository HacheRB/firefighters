
//FATHER 
function PowerUp() {
  this.elem = document.getElementById("powerUp");
  this.col = 4;
  this.row = 1;

  this.setRandomRow = function () {
    this.elem.classList.remove(`row${this.row}`);
    this.row = Math.floor(Math.random() * 4) + 1;
    this.elem.classList.add(`row${this.row}`);
  }
}

// SONS

function lifePowerUp() {
  PowerUp.call(this);

  this.showPowerUp = function () {
    this.elem.querySelector("#heart").style.display = "block";
    isPowerUpActive = true;

  }

  this.hidePowerUp = function () {
    this.elem.querySelector("#heart").style.display = "none";
    isPowerUpActive = false;
    timerDeletePowerUp = null;

  }

  this.setPowerUp = function () {
    if (lifes < 5) {
      audio.playSound("extraLife", 0.05);
      lifes++;
      game.updateLifes();
      this.hidePowerUp();
    }
  }

  this.deletePowerUp = function () {
    this.hidePowerUp();
    isPowerUpActive = false;
    game.stopPowerUpTimer();
    timerDeletePowerUp = null;
  }
}

// slow time 
function slowTime() {
  PowerUp.call(this);

  this.showPowerUp = function () {
    this.elem.querySelector("#clock").style.display = "block";
    isPowerUpActive = true;

  }

  this.hidePowerUp = function () {
    this.elem.querySelector("#clock").style.display = "none";
    isPowerUpActive = false;
    timerDeletePowerUp = null;

  }

  this.setPowerUp = function () {
    isTimeSlowed = true;
    let currentTime = time * 3;
    game.stopNpcTimer();
    game.stopFireTimer();
    game.setNpcTimer(currentTime);
    game.setFireTimer(currentTime);
    // timerPowerUpDuration = setTimeout(, 20000, time);
  }
}

// slowTime.prototype = Object.create(PowerUp.prototype);
// slowTime.prototype.constructor = slowTime;
