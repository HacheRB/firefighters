//sounds 

function playSound (sound, vol){
    let soundSelect = document.getElementById(sound);
    soundSelect.volume = vol;
    soundSelect.play() ;
}

function loopSound (sound, vol){
    let soundSelect = document.getElementById(sound);
    //ponerlo con loop
    soundSelect.volume = vol;
    soundSelect.play() ;
}

//para el fuego utilizar los loop 
