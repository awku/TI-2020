var activeSong = null;
var previousPaused = true;
var previousVolume;

function play(id) {
    activeSong = document.getElementById(id);

    if (previousPaused) {
        activeSong.pause();
    }
    else {
        activeSong.play();
    }

    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeSlider = document.getElementById('volume-meter').offsetWidth * percentageOfVolume;
    
    document.getElementById('volume-status').style.width = Math.round(percentageOfVolumeSlider) + "px";
}

function playPrevious(id) {
    if (activeSong !== null) {
        previousPaused = activeSong.paused;
    }
    changeSong(-1);
    play(id);
}

function playNext(id) {
    if (activeSong !== null) {
        previousPaused = activeSong.paused;
    }
    changeSong(1);
    play(id);
}

function playPause(id) {
    activeSong = document.getElementById(id);
    
    if (activeSong.paused) {
        activeSong.play(id);
        document.getElementById('play-pause').src = "pause.svg";
    }
    else{
        activeSong.pause();
        document.getElementById('play-pause').src = "play.svg";
    }
}

function updateTime() {
    if (activeSong !== null && !isNaN(activeSong.duration)) {
        var currentSeconds = (Math.floor(activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
        var currentMinutes = Math.floor(activeSong.currentTime / 60);
        document.getElementById('song-time').innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(activeSong.duration / 60) + ":" + (Math.floor(activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(activeSong.duration % 60);

        var percentageOfSong = (activeSong.currentTime/activeSong.duration);
        var percentageOfSlider = document.getElementById('song-slider').offsetWidth * percentageOfSong;
    
        document.getElementById('track-progress').style.width = Math.round(percentageOfSlider) + "px";
    }
}
function volumeUpdate(number) {
    activeSong.volume = number / 100;
}

function setLocation(percentage) {
    activeSong.currentTime = activeSong.duration * percentage;
}

function setSongPosition(obj,e) {
    var songSliderWidth = obj.offsetWidth;
    var evtobj=window.event? event : e;
    clickLocation =  evtobj.layerX - obj.offsetLeft;
    
    var percentage = (clickLocation/songSliderWidth);
    setLocation(percentage);
}

function setVolume(percentage) {
    activeSong.volume =  percentage;
    
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeSlider = document.getElementById('volume-meter').offsetWidth * percentageOfVolume;
    
    document.getElementById('volume-status').style.width = Math.round(percentageOfVolumeSlider) + "px";
}

function muteSong() {
    if (activeSong.volume>0) {
        previousVolume=activeSong.volume;
        document.getElementById('speaker').src = "speakermute.svg";
        setVolume(0);
    }
    else{
        setVolume(previousVolume);
        document.getElementById('speaker').src = "speaker.svg";
    }
}

function setNewVolume(obj,e) {
    var volumeSliderWidth = obj.offsetWidth;
    var evtobj = window.event? event: e;
    clickLocation = evtobj.layerX - obj.offsetLeft;
    
    var percentage = (clickLocation/volumeSliderWidth);
    setVolume(percentage);
}

function stopSong() {
    activeSong.currentTime = 0;
    activeSong.pause();
}

function endedSong(id) {
    previousPaused = false;
    changeSong(1);
    play(id);
}
