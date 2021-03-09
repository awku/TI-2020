function home() {
    document.getElementById("start-page").style.display = "block";
    document.getElementById("equation-page").style.display = "none";
    document.getElementById("amp-page").style.display = "none";
    document.getElementById("small-amp").style.display = "none";
    document.getElementById("big-amp").style.display = "none";
    document.getElementById("ap").className = "temp";  
    document.getElementById("sp").className = "active";  
    document.getElementById("e").className = "temp"; 
    document.getElementById("ba").className = "temp";  
    document.getElementById("sa").className = "temp"; 
}
function equation() {
    document.getElementById("equation-page").style.display = "block";
    document.getElementById("start-page").style.display = "none";
    document.getElementById("amp-page").style.display = "none";
    document.getElementById("small-amp").style.display = "none";
    document.getElementById("big-amp").style.display = "none";
    document.getElementById("ap").className = "temp";  
    document.getElementById("ep").className = "active";  
    document.getElementById("sp").className = "temp"; 
    document.getElementById("ba").className = "temp";  
    document.getElementById("sa").className = "temp"; 
}
function period() {
    document.getElementById("amp-page").style.display = "block";
    document.getElementById("equation-page").style.display = "none";
    document.getElementById("start-page").style.display = "none";
    document.getElementById("ap").className = "active";  
    document.getElementById("ep").className = "temp";  
    document.getElementById("sp").className = "temp"; 
}
function bigAmp() {
    document.getElementById("big-amp").style.display = "block";
    document.getElementById("small-amp").style.display = "none";
    document.getElementById("ba").className = "active";  
    document.getElementById("sa").className = "temp";  
}
function smallAmp() {
    document.getElementById("small-amp").style.display = "block";
    document.getElementById("big-amp").style.display = "none";
    document.getElementById("sa").className = "active";  
    document.getElementById("ba").className = "temp";  
}
var currentSong = 0;
var playlist;

function loadPlaylist() {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", "playlist.json", true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            playlist = JSON.parse(this.responseText);
            changeSong(0);
        }
    }
    rawFile.send();
}


function changeSong(i) {
    if (currentSong == 0 && i == -1) {
        currentSong = playlist.length - 1;
    }
    else {
        currentSong=(currentSong+i)%playlist.length;
    }
    document.getElementById('song-title').innerHTML=playlist[currentSong].title;
    document.getElementById('song-artist').innerHTML=playlist[currentSong].artist;
    var song = document.getElementById('song');
    song.src=playlist[currentSong].audiopath;
    song.addEventListener('loadedmetadata', (e) => {
        document.getElementById('song-time').innerHTML = "0:00" + ' / ' + Math.floor(e.target.duration / 60) + ":" + (Math.floor(e.target.duration % 60) < 10 ? '0' : '') + Math.floor(e.target.duration % 60);
    });
    if (playlist[currentSong].coverpath) {
        var img = document.getElementById('audio-cover');
        img.src = playlist[currentSong].coverpath;
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        if (width > height) {
            img.setAttribute("height", "100px");
            img.setAttribute("width", "auto");
        }
        else {
            img.setAttribute("width", "100px");
            img.setAttribute("height", "auto");
        }
        img.setAttribute("margin", "-50%");
    }   
    else {
        document.getElementById('audio-cover').src = "note.svg";
    }
}

function openAudio() {
    document.getElementById("audio-player").style.height = "210px";
}
function closeAudio() {
    document.getElementById("audio-player").style.height = "0";
}
function start() {
    var audio = document.getElementById('song');
    var source = document.createElement('source');
    source.type = 'audio/mpeg';
    audio.appendChild(source);

    loadPlaylist();
}
