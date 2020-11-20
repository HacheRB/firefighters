// Constructor Objeto Game

function Game() {
  this.fireman = new Fireman();
  this.fireman.removeNpc();
  this.windows = [
    new WindowObj(11),
    new WindowObj(12),
    new WindowObj(13),
    new WindowObj(21),
    new WindowObj(22),
    new WindowObj(23),
    new WindowObj(31),
    new WindowObj(32),
    new WindowObj(33)
  ];

  this.powerUpTypes = [
    new lifePowerUp()
  ];

  // UI UPDATES --------------------------------------------------------------------------
  this.addPoints = function () {
    if (!npcWindowHadFire) {
      points += 100;
    }
    if (npcWindowHadFire) {
      points += 200;
      npcWindowHadFire = false;
    }
    this.updateScore();
    this.incrementLevel();
  }

  this.showUi = function () {
    document.getElementById("level").style.display = "block";
    document.getElementById("lifes").style.display = "block";
    document.getElementById("score").style.display = "block";
  }

  this.hideUi = function () {
    document.getElementById("lifes").style.display = "none";
    document.getElementById("level").style.display = "none";
    document.getElementById("score").style.display = "none";
  }

  this.showGameOver = function () {
    var gameOv = document.getElementById("gameOver");
    gameOv.style.display = "block";
    var header = gameOv.querySelector("h1");
    header.innerText = `GAME OVER!
    You got ${points} points!`;
  }

  //hide and show ById - only block 
  this.hideById = function (id) {
    let selectId = document.getElementById(id);
    selectId.style.display = "none";
  }
  this.showById = function (id, displayType) {
    let selectedId = document.getElementById(id);
    selectedId.style.display = displayType;
  }

  this.updateScore = function () {
    document.getElementById("score").querySelector("h2").innerHTML = `Points : ${points}`;
  }

  this.updateLifes = function () {
    document.getElementById("lifes").querySelector("h2").innerHTML = `Lifes left : ${lifes}`;
  }

  this.updateLevel = function () {
    document.getElementById("level").querySelector("h2").innerHTML = `Level : ${level}`;
  }

  // MENUS ------------------------------------------------------------------------------ 
  this.newGame = function () {
    this.updateLifes();
    this.updateScore();
    this.updateLevel();
    this.fireman.resetFireman();
    this.showUi();
    this.showById("title");
    this.hideById("gameOver")
    this.setFireTimer(time);
    this.setNpcTimer(time);
    this.setPowerUpTimer();
  }

  this.resetGame = function () {
    totalPoints = points;
    this.stopNpcTimer();
    this.stopFireTimer();
    this.stopPowerUpTimer();
    this.fireman.resetFireman();
    for (let i = 0; i < this.windows.length; i++) {
      this.windows[i].resetWindow();
    }

    for (let i = 0; i < this.powerUpTypes.length; i++) {
      this.powerUpTypes[i].hidePowerUp();
    }
    
    button.innerText = 'Start';
    gameOn = false;
    game.showById("howToBt", block);
    this.hideUi();
    this.showGameOver();
    lifes = 5;
    points = 0;
    level = 0;
    time = 3000;
    this.countNpc = 0;
    
  }

  // TIMERS PARA GENERAR FUEGOS / NPCS / y LEVELS

  //funcion adaptada para que tenga en cuenta el tiempo is slowed
  this.incrementLevel = function () {
    countNpc++;
    if (isTimeSlowed && countNpc === 3) {
      level++;
      this.updateLevel();
      countNpc = 0;
    } else {
      if (countNpc === 3 && level <= 15) {
        level++;
        this.updateLevel();
        countNpc = 0;
        time /= 1.1;
        this.changeTimersSpeed(time);
      }
      if (countNpc === 3 && level > 15) {
        level++;
        this.updateLevel();
        countNpc = 0;
      }
    }
  }

  // funcion que llamará el powerup que reduce el tiempo, falta ajustar tiempos y reducción de velocidad.

  this.changeTimersSpeed = function (intervalTime) {
    isTimeSlowed = false;
    this.stopNpcTimer();
    this.stopFireTimer();
    this.setNpcTimer(intervalTime);
    this.setFireTimer(intervalTime);
  }.bind(this);

  this.setNpcTimer = function (time) {
    timerNpcGen = setInterval(this.generateNpc, time);
  }

  this.stopNpcTimer = function () {
    clearInterval(timerNpcGen);
    timerNpcGen = null;
  }

  this.setFireTimer = function (time) {
    timerFireGen = setInterval(this.generateFire, time);
  }

  this.stopFireTimer = function () {
    clearInterval(timerFireGen);
    timerFireGen = null;
  }

  this.setPowerUpTimer = function () {
    timerPowerUpDuration = setInterval(this.generatePowerUp, 10000);
    
  }
  this.stopPowerUpTimer = function () {
    clearInterval(timerPowerUpDuration);
    timerPowerUpDuration = null;
  }

  this.hidePowerUpTimer = function(pwup){
    timerDeletePowerUp = setTimeout(pwup.hidePowerUp, 5000);
  }
  


  // FUNCIONES DE GAME -------------------------------------------------------------------
  this.checkPowerUpRow = function () {
    for (let i = 0; i < game.powerUpTypes.length; i++) {
      if ((this.powerUpTypes[i].elem.classList.contains(`row${this.fireman.row}`)) && (this.powerUpTypes[i].elem.classList.contains(`col${this.fireman.col}`))) {
        this.fireman.checkPowerUp(this.powerUpTypes[i]);
      }
    }
  }

  this.generatePowerUp = function () {
    let randomPowerUp = (Math.floor(Math.random() * (this.powerUpTypes.length)));
    if (isPowerUpActive) {
      return;
    }
    else if (!isPowerUpActive) {
      console.log(this.powerUpTypes[randomPowerUp]);
      this.powerUpTypes[randomPowerUp].setRandomRow();
      this.powerUpTypes[randomPowerUp].showPowerUp();
      this.hidePowerUpTimer(this.powerUpTypes[randomPowerUp]);
      //hide powerup a los 5 segundos
      //timerDeletePowerUp = setTimeout(this.powerUpTypes[randomPowerUp].hidePowerUp(), 5000);
      
    }
  }.bind(this);

  // funcion en prueba

  this.generateNpc = function () {
    let randomNpc = Math.floor(Math.random() * 9);
    let ISFULL = (item) => item.npc === true;
    if (this.windows.every(ISFULL)) {
      return;
    }
    else if (!this.windows[randomNpc].npc) {
      this.windows[randomNpc].setNpc();
    }
    else {
      this.generateNpc();
    }
  }.bind(this);

  this.generateFire = function () {
    let randomFire = Math.floor(Math.random() * 9);
    let ISFULL = (item) => item.fire === true;
    if (this.windows.every(ISFULL)) {
      audio.playSound("gameOver", 0.05);
      this.resetGame();
      return;
    }
    else if (!this.windows[randomFire].fire) {
      this.windows[randomFire].setFire();
    }
    else {
      this.generateFire(this.windows);
    }
  }.bind(this);

  this.checkWindow = function () {

    for (let i = 0; i < game.windows.length; i++) {
      if ((this.windows[i].elem.classList.contains(`row${this.fireman.row}`)) && (this.windows[i].elem.classList.contains(`col${this.fireman.col}`))) {
        this.fireman.checkNpc(this.windows[i]);
      }
      if (this.fireman.row === 4 && this.fireman.npc) {
        this.fireman.dropNpc();
        audio.playSound("dropNpc", 0.1)
      }
    }
  }

  this.extinguishFire = function () {
    audio.playSound("splash", 0.1);
    for (let i = 0; i < this.windows.length; i++) {
      if ((this.windows[i].elem.classList.contains(`row${this.fireman.row}`)) && (this.windows[i].elem.classList.contains(`col${this.fireman.col}`))) {
        this.windows[i].removeFire();
      }
    }
  }
}
