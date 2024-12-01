const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const metronomeButton = document.getElementById("metronome-button");

let audio = new Audio("src/tunes/a.wav");
let metronomeAudio = new Audio("src/tunes/compasso.wav");
let isPlaying = false;
let intervalID;
let tempo = 120;

const playTune = (key) => {
  audio.src = `src/tunes/${key}.wav`;
  audio.play();
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => clickedKey.classList.remove("active"), 150);
};

const playClick = () => metronomeAudio.play();

const toggleMetronome = () => {
  if (!isPlaying) {
    isPlaying = true;
    metronomeButton.textContent = "Parar Compasso";
    metronomeButton.classList.add("active");
    intervalID = setInterval(playClick, (60 / tempo) * 1000);
  } else {
    isPlaying = false;
    metronomeButton.textContent = "Iniciar Compasso";
    metronomeButton.classList.remove("active");
    clearInterval(intervalID);
    metronomeAudio.pause();
    metronomeAudio.currentTime = 0;
  }
};

metronomeButton.addEventListener("click", toggleMetronome);

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
});

document.addEventListener("keydown", (e) => {
  if (e.key && e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
    playTune(e.key.toLowerCase());
  }
});

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});

keysCheck.addEventListener("click", () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
});
