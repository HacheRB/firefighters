// Constructor Objeto Game

function Game() {
  this.fireman = new Fireman();
  this.fireman.removeNpc();
  this.windows = [
    new windowObj(11),
    new windowObj(12),
    new windowObj(13),
    new windowObj(21),
    new windowObj(22),
    new windowObj(23),
    new windowObj(31),
    new windowObj(32),
    new windowObj(33)
  ];


  // UI UPDATES --------------------------------------------------------------------------

  this.addPoints = function () {
    points += 100;
    this.updateScore(); // GLOBAL SCOPE, CUIDADO AL MOVERLA
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

  this.mainMenu = function () {
    //ocultar live y points
    document.getElementById("lifes").style.display = "none";
    document.getElementById("score").style.display = "none";
  }

  this.showTitle = function () {
    var title = document.getElementById("title");
    title.style.display = "block";
    var header = title.querySelector("h1");
    header.innerText = `GAME OVER!
    You got ${points} points!`;
  }

  this.hideTitle = function () {
    document.getElementById("title").style.display = "none";
  }

  this.showGameOver = function () {
    var gameOv = document.getElementById("gameOver");
    gameOv.style.display = "block";
    var header = gameOv.querySelector("h1");
    header.innerText = `GAME OVER!
    You got ${points} points!`;
  }

  this.hideGameOver = function () {
    document.getElementById("gameOver").style.display = "none";
  }

  this.showHowTo = function () {
    var howToPlay = document.getElementById("howToBt");
    howToPlay.style.display = "block";
  }

  this.hideHowTo = function () {
    var howToPlay = document.getElementById("howToBt");
    howToPlay.style.display = "block";
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

  this.setButtonStart = function () {
    button.innerText = 'Start';
    gameOn = false;
  }


  // MENUS ------------------------------------------------------------------------------ 
  this.newGame = function () {
    console.log(points);
    this.updateScore();
    this.fireman.resetFireman();
    this.showUi();
    this.hideTitle();
    this.hideGameOver();
    this.setFireTimer(time);
    this.setNpcTimer(time);
  }

  this.resetGame = function () {
    totalPoints = points;
    this.stopNpcTimer();
    this.stopFireTimer();
    this.fireman.resetFireman();
    for (let i = 0; i < this.windows.length; i++) {
      this.windows[i].resetWindow();
    }
    lifes = 5;
    this.updateLifes();
    this.hideUi();
    this.showGameOver();
    points = 0;
    level = 0;
    this.countNpc = 0;
  }


  // TIMERS PARA GENERAR FUEGOS / NPCS ---------------------------------------------------

  this.incrementLevel = function () {
    countNpc++;
    if (countNpc === 3) {
      level++;
      this.updateLevel();
      countNpc = 0;
    }
  }

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


  // FUNCIONES DE GAME -------------------------------------------------------------------

  this.generateNpc = function () {
    let randomNpc = Math.floor(Math.random() * 9);
    let ISFULL = (item) => item.npc === true;
    if (this.windows.every(ISFULL)) {
      this.stopNpcTimer();
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
      }
    }
  }

  this.extinguishFire = function () {
    for (let i = 0; i < this.windows.length; i++) {
      if ((this.windows[i].elem.classList.contains(`row${this.fireman.row}`)) && (this.windows[i].elem.classList.contains(`col${this.fireman.col}`))) {
        this.windows[i].removeFire();
      }
    }
  }

}
