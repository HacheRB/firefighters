//sounds 
function audioPlayer() {

    const AUDIOS = {
        fire1: new Audio("assets/music/fire1.wav"),
        fire2: new Audio("assets/music/fire2.wav"),
        fire3: new Audio("assets/music/fire3.wav"),
        fire4: new Audio("assets/music/fire4.wav"),
        fire5: new Audio("assets/music/fire5.wav"),
        grua: new Audio("assets/music/grua.wav"),
        manguera1: new Audio("assets/music/manguera1.wav"),
        manguera2: new Audio("assets/music/manguera2.wav"),
        menu1: new Audio("assets/music/menu1.wav"),
        menu2: new Audio("assets/music/menu2.wav"),
        npcMuere: new Audio("assets/music/menu2.wav"),
        pause_in: new Audio("assets/music/pause_in.wav"),
        pause_out: new Audio("assets/music/pause_out.wav"),
        splash: new Audio("assets/music/Splash-agua.wav"),
    }

    this.playSound = function (sound, vol) {
        let soundSelect = AUDIOS[sound];
        soundSelect.volume = vol;
        soundSelect.play();
    }

    this.pauseSound = function (sound) {
        let soundSelect = AUDIOS[sound];
        soundSelect.pause();
    }

    this.loopSound = function (sound, vol) {
        let soundSelect = AUDIOS[sound];
        soundSelect.volume = vol;
        soundSelect.loop = true;
        soundSelect.play();
    }
}

