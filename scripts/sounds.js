//sounds 
function audioPlayer() {

    const AUDIOS = {
        pause_in: new Audio("assets/music/pause_in.wav"),
        pause_out: new Audio("assets/music/pause_out.wav"),
        gameOver: new Audio("assets/music/sfx_alarm_loop8.wav"),
        fire1: new Audio("assets/music/fire1.wav"),
        splash: new Audio("assets/music/Splash-agua.wav"),
        dropNpc: new Audio("assets/music/dropNPC.wav"),
        npcMuere: new Audio("assets/music/sfx_deathscream_human9.wav"),
        extraLife: new Audio("assets/music/sfx_sounds_powerup3.wav"),
        music: new Audio("assets/music/music.wav"),
        spawnNpc: new Audio("assets/music/sfx_sound_nagger2.wav"),
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

