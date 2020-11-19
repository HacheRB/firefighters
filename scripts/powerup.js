
//FATHER 
function PowerUp() {
  this.elem = document.getElementById("powerUp");
  this.col = 4;
  this.row = 1;
  this.isActive = false;

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
  }

  this.hidePowerUp = function () {
    this.elem.querySelector("#heart").style.display = "none";
  }

  this.setPowerUp = function () {
    this.isActive = true;
    this.elem.querySelector("#heart").style.display = "block";

    if (lifes < 5) {
      audio.playSound("extraLife", 0.05);
      lifes++;
      game.updateLifes();
    }

  }

  // timerDeletePowerUp = SetTimeout(this.deletePowerUp, 5000);

  this.deletePowerUp = function () {
    this.hidePowerUp();
    this.isActive = false;
    game.stopPowerUpTimer();
    timerDeletePowerUp = null;
  }
}

// slow time 
function slowTime() {
  PowerUp.call();

  this.showPowerUp = function () {
    this.elem.querySelector("#clock").style.display = "block";
  }

  this.hidePowerUp = function () {
    this.elem.querySelector("#clock").style.display = "none";
  }

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

// slowTime.prototype = Object.create(PowerUp.prototype);
// slowTime.prototype.constructor = slowTime;
