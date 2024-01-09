console.log("Spotify Songs")

//Intialize the Variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let upTime = document.getElementById('uptime');
const volumeControl = document.getElementById('volumeControl');
const muteButton = document.getElementById('muteButton');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs=[

{songName: "Shree Ram Bhajan", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
{songName: "Agar Tum Saath Ho", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
{songName: "Kesariya", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
{songName: "295", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
{songName: "Blinding Lights", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
{songName: "Elevated", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
{songName: "No-Love", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
{songName: "Spaceship", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
{songName: "We-Rollin", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
{songName: "Chal Chaiya Chaiya", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItem.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Shubh.addEventListener('click', ()=>{
//  if(audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//         masterPlay.classList.remove('fa-circle-play');
//         masterPlay.classList.add('fa-circle-pause');
//         gif.style.opacity =1;
//     }
//     else{
//         audioElement.pause();
//         masterPlay.classList.remove('fa-circle-pause');
//         masterPlay.classList.add('fa-circle-play');
//         gif.style.opacity =0;
//     }
// })
//Handle Play/Pause button

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity =1;
        upTime.style.opacity  = 1;
        muteButton.style.opacity =1;
        volumeControl.style.opacity =1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity =0;
        upTime.style.opacity  = 0;
        muteButton.style.opacity =0;
        volumeControl.style.opacity =0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate' ,()=>{
    console.log('timeupdate')
    //update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})


audioElement.addEventListener('timeupdate', ()=>{
        const currTime = formatTime(audioElement.currentTime);
        upTime.textContent = currTime;
})

function formatTime(time){
    const minutes =  Math.floor(time / 60);
    const seconds =  (time - minutes * 60).toFixed(0);
    const formattedTime =`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    return formattedTime;
}
    
audioElement.addEventListener('ended', ()=>{
    songIndex = (songIndex+1) % songs.length;
    const nextSong = songs[songIndex];
    audioElement.src = nextSong.filePath
    masterSongName.innerHTML = songs[songIndex].songName;
    // audioElement.currentTime = 0;
    audioElement.play();
})

volumeControl.addEventListener('input', ()=>{
    audioElement.volume = volumeControl.value;
    muteButton.textContent = audioElement.volume === 0 ? 'Unmute' : 'Mute';
})

muteButton.addEventListener('click', ()=>{
    audioElement.muted = !audioElement.muted;
    volumeControl.value = audioElement.muted ? 0 : audioElement.volume;
    muteButton.textContent = audioElement.muted ? 'Unmute' : 'Mute';
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value*audioElement.duration)/100)
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(audioElement.paused || audioElement.currentTime<=0){
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        upTime.style.opacity  = 1;
        muteButton.style.opacity =1;
        volumeControl.style.opacity =1;
        gif.style.opacity =1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        }
        else{
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            upTime.style.opacity  = 0;
            gif.style.opacity =0;
            muteButton.style.opacity =0;
        volumeControl.style.opacity =0;
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
