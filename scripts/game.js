//Variables
const game = new Game();

function windowObj(num) {
  this.elem = document.getElementById('window' + num);
  //console.log(this.elem);
  this.npc = false;
  this.fire = false;

  this.setFire = function () {
    this.elem.classList.add("fireOnWindow");
    this.fire = true;
  }

  this.removeFire = function () {
    this.elem.classList.remove("fireOnWindow");
    this.fire = false;
  }

  this.setNpc = function () {
    this.elem.classList.add("npcOnWindow");
    this.npc = true;
  }
  this.removeNpc = function () {
    this.elem.classList.remove("npcOnWindow");
    this.npc = false;
  }
}

function Fireman() {
  this.elem = document.getElementById("fireman");
  this.col = 4;
  this.row = 4;
  this.npc = false;
  
  this.setNpc = function () {
    this.elem.classList.add("wiNpc");
    this.npc = true;
  }
  this.removeNpc = function () {
    this.elem.classList.remove("wiNpc");
    this.npc = false;
  }
  this.move = function (dir) {
    if (dir === "right" && this.col < 4) {
      this.col++;
      
    }
    if (dir === "up" && this.row > 1) {
      this.row--;
      
    }
    if (dir === "left" && this.col > 1) {
      this.col--;
      
    }
    if (dir === "down" && this.row < 4) {
      this.row++;
     
    }
    //this.elem.classList.remove([`row${this.row}`, ]`row${this.row}`)
    // col${this.col})
   // this.elem.classList = `row${this.row} col${this.col}`
  }
}

function Game() {
  this.fireman = new Fireman();
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
}

function checkWindow(windowsArr, fireman) {
  
  let firemanRow = `row${game.fireman.row}`;
  let firemanCol = `col${game.fireman.col}`;
  for (let i = 0; i < windowsArr.length; i++) {
    //console.log(windowsArr[i].elem);
    //console.log(windowsArr[i].elem.contains(firemanRow));
    if ((windowsArr[i].elem.classList.contains(firemanRow)) && (windowsArr[i].elem.classList.contains(firemanCol))) {
      //console.log("window");
      console.log(windowsArr[i]);
      checkNpc(windowsArr[i], fireman);
    }
  }
}
// this.elem = document.getElementById('window' + num);

function checkNpc(window, fireman) {
  if (window.npc){
    window.removeNpc();
    fireman.setNpc();
    console.log(fireman);
    console.log("Tiene Npc");
  }
  else{
    console.log("No tiene Npc");
  }

}


document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") { game.fireman.move("right") }
  if (event.key === "ArrowUp") { game.fireman.move("up") }
  if (event.key === "ArrowDown") { game.fireman.move("down") }
  if (event.key === "ArrowLeft") { game.fireman.move("left") }
  if (event.key === " ") { checkWindow(game.windows, game.fireman) }
  //console.log(event);
})
console.log(game);
game.windows[0].setNpc();
game.windows[2].setNpc();
console.log(game.windows[0]);


//game.window1.removeNpc();
//game.window2.removeFire();

/*
console.log(game.windows.getRandomWindow());  //style.backgroundColor = 'red';
*/