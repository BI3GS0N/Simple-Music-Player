const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const songTitle = document.querySelector('#title')
const songAuthor = document.querySelector('#author')
const songCover = document.querySelector('#cover-img')
const progressBar = document.querySelector('#progress-bar')
const progress = document.querySelector('#progress')
const container = document.querySelector('.container')
const audio = document.querySelector('#audio')

let songs = [{
        'title': 'Love Race',
        'author': 'Machine Gun Kelly',
        'path': 'love_race.mp3',
        'cover': 'love_race_album_cover.jpg',
        'bg': 'love_race.jpg'
    }, {
        'title': 'Yellow Ledbetter',
        'author': 'Pearl Jam',
        'path': 'yellow_ledbetter.mp3',
        'cover': 'jeremy.jpg',
        'bg': 'pearl_jam2.jpg'
    },
    {
        'title': 'Swing Life Away',
        'author': 'Rise Against Machine',
        'path': 'swing_life_away.mp3',
        'cover': 'swing_life_away_album_cover.jpg',
        'bg': 'rise.jpg'
    }
];

let index = 0;
loadSong(songs[index]);

function loadSong(song) {
    songTitle.textContent = song.title;
    songAuthor.textContent = song.author;
    songCover.src = `assets/${song.cover}`;
    audio.src = `music/${song.path}`
    document.body.style.backgroundImage = `url(assets/${song.bg})`
}

function playPause() {
    const playing = container.classList.contains('play')
    if (playing) {
        audio.pause()
        container.classList.remove('play')
        playBtn.querySelector('i.bx').classList.remove('bx-pause')
        playBtn.querySelector('i.bx').classList.add('bx-play')
    } else {
        audio.play()
        container.classList.add('play')
        playBtn.querySelector('i.bx').classList.remove('bx-play')
        playBtn.querySelector('i.bx').classList.add('bx-pause')
    }
}

function nextSong() {
    index++
    if (index > songs.length - 1) {
        index = 0
    }
    container.classList.remove('play')
    loadSong(songs[index]);
    playPause();
}

function prevSong() {
    index--
    if (index < 0) {
        index = songs.length - 1
    }
    container.classList.remove('play')
    loadSong(songs[index])
    playPause()
}

function updateProgressBar() {
    let duration = audio.duration;
    let currentTime = audio.currentTime;

    const progresstime = (currentTime / duration) * 100
    progress.style.width = `${progresstime}%`;
}

function setProgress(e) {
    const duration = audio.duration;
    const clickx = e.offsetX;
    const width = this.offsetWidth;
    audio.currentTime = (clickx / width) * duration;
}

// === event listeners
playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong)
prevBtn.addEventListener('click', prevSong)
audio.addEventListener('ended', nextSong)
audio.addEventListener('timeupdate', updateProgressBar)
progressBar.addEventListener('click', setProgress)