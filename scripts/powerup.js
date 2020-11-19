
function powerUp() {
  this.canvas = document.getElementById("game");
  this.col = 4;
  this.row = 1;
}

powerUp.prototype.setRandomRow = function () {
  this.row = Math.floor(Math.random() * 4) + 1;
}


function lifePowerUp() {
  powerUp.call();

}

lifePowerUp.prototype = Object.create(powerUp.prototype);
lifePowerUp.prototype.constructor = lifePowerUp;



