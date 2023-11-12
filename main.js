const musicContainer = document.getElementById('music-container');
const directsong = document.getElementById('directplay');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

var songIndex = 0;
var songs=[{},{},{},{},{},{}];
loadSong(songs[songIndex]);

function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
  
    audio.play();
  }
  
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
  
    audio.pause();
  }
function prevSong() {
    songIndex=songIndex-1 ;
    
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }

function nextSong() {
    songIndex=songIndex + 1;
  
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
  
    loadSong(songs[songIndex]);
  
    playSong();
  }
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
  
  // Set progress bar
  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }
  function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    var sec;
    var sec_d;
  
    // define minutes currentTime
    let min = (currentTime == null) ? 0 :
      Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;
  
    // define seconds currentTime
    function get_sec(x) {
      if (Math.floor(x) >= 60) {
  
        for (var i = 1; i <= 60; i++) {
          if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
            sec = Math.floor(x) - (60 * i);
            sec = sec < 10 ? '0' + sec : sec;
          }
        }
      } else {
        sec = Math.floor(x);
        sec = sec < 10 ? '0' + sec : sec;
      }
    }
  
    get_sec(currentTime, sec);
  
    // change currentTime DOM
    currTime.innerHTML = min + ':' + sec;
  
    // define minutes duration
    let min_d = (isNaN(duration) === true) ? '0' :
      Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;
  
  
    function get_sec_d(x) {
      if (Math.floor(x) >= 60) {
  
        for (var i = 1; i <= 60; i++) {
          if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
            sec_d = Math.floor(x) - (60 * i);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
          }
        }
      } else {
        sec_d = (isNaN(duration) === true) ? '0' :
          Math.floor(x);
        sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
      }
    }
  
    // define seconds duration
  
    get_sec_d(duration);
  
    // change duration DOM
    durTime.innerHTML = min_d + ':' + sec_d;
  
  };
  // Event listeners
  directsong.addEventListener('click', function() {
    const isPlaying = musicContainer.classList.contains('play');
  
    if (isPlaying) {
      pauseSong();
    } 
    else {
      playSong();
    }
  });
playBtn.addEventListener('click', function () {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } 
  else {
    playSong();
  }
});

// Change song

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);

  
  