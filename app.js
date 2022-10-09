console.log("fa")
let index;

//initialze the variable
let songIndex = 0;

// mp3 file
let progress;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { SongName: "welcome", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { SongName: "hey you", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { SongName: "coming home", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { SongName: "taste the feeling", filePath: "songs/4.mp3", coverPath: "covers/8.jpg" },
    { SongName: "hurt", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }, { SongName: "closer", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" }
]
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerText = songs[i].SongName;
})

// audioElement.play();


//handle play/pause click
//add addeventlistener in masterPlay
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime == 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;

        }

    })
    //listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log("timeupdate")
        //update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
    //now set initial value to 0 of progress bar in htmls
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause')
        element.classList.add('fa-play')
    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();

        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play')
        e.target.classList.add('fa-pause')
        audioElement.src = `songs/${songIndex+1}.mp3 `;
        masterSongName.innerText = songs[songIndex].SongName;

        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');


    })


})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3 `;
    masterSongName.innerText = songs[songIndex].SongName;


    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.add('fa-play');
    masterPlay.classList.remove('fa-pause');

})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 5;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3 `;
    masterSongName.innerText = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.add('fa-play');
    masterPlay.classList.remove('fa-pause');

})