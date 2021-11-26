const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.prev'),
      nextBtn = document.querySelector('.next'),
      audio = document.querySelector('.audio'),
      progressContainer = document.querySelector('.progress_conrainer'),
      progress = document.querySelector('.progress'),
      title = document.querySelector('.song'),
      cover = document.querySelector('.img_cover'),
      imgSrc = document.querySelector('.img_src');

//названия песни
const songs = ['пеня1 - лесной 1','пеня2 -древность осин','пеня3 - воздушный'];
//песня по умолчанию
let songIndex = 0;

function  loadSong(song) {
    title.innerHTML = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `img/cover${songIndex + 1}.png`;

}

loadSong(songs[songIndex]);


//play
function playSong() {
  player.classList.add('play');
  imgSrc.src = './img/img4.png';
  audio.play();
}

function pauseSong() {
    player.classList.remove('play');
    imgSrc.src = './img/img3.png';
    audio.pause();
}
playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying){
        pauseSong()
    } else {
        playSong();
    }
});

// next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
      songIndex = 0;
  }
    loadSong(songs[songIndex]);
    playSong();

}
nextBtn.addEventListener('click', nextSong);

// prev song
function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();

}
prevBtn.addEventListener('click', prevSong);

//progress bar
function updateProgress(e) {
 const {duration, currentTime} = e.srcElement;
 const progressPersent= (currentTime / duration)  * 100;
 progress.style.width = `${progressPersent}%`;
}
audio.addEventListener('timeupdate', updateProgress);


// set progress

function setProgress(e) {
 const width = this.clientWidth;
 const clickX = e.offsetX;
 const duration = audio.duration;

 audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);


//autopley

audio.addEventListener('ended', nextSong);