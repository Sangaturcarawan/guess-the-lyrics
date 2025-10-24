const lyrics = [
  {
    title: "What Was I Made For? by Billie Eilish",
    videoID: "T5t5p0V5g0g",
    start: 0,
    end: 30,
    lyricsBefore: "I don't know how to feel",
    lyricsAfter: "But I know I was made for you",
  },
];

let current = 0;
let player;
let videoVisible = false;

const lyricElem = document.getElementById("lyric");
const answerElem = document.getElementById("answer");
const feedbackElem = document.getElementById("feedback");

const checkBtn = document.getElementById("check-btn");
const nextBtn = document.getElementById("next-btn");
const toggleVideoBtn = document.getElementById("toggle-video-btn");

const playerContainer = document.getElementById("player-container");

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "180",
    width: "320",
    videoId: lyrics[current].videoID,
    playerVars: {
      controls: 1,
      start: lyrics[current].start,
      end: lyrics[current].end,
    },
    events: {
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          const duration = lyrics[current].end - lyrics[current].start;
          setTimeout(() => player.pauseVideo(), duration * 1000);
        }
      },
    },
  });
}

function loadLyrics() {
  const song = lyrics[current];
  lyricElem.textContent = song.lyricsBefore;
  feedbackElem.textContent = "";
  answerElem.value = "";
  nextBtn.classList.add("hidden");

  if (player && player.loadVideoById) {
    player.loadVideoById({
      videoId: song.videoID,
      startSeconds: song.start,
      endSeconds: song.end,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadLyrics();
});

checkBtn.addEventListener("click", () => {
  const userAnswer = answerElem.value.trim().toLowerCase();
  const correct = lyrics[current].lyricsAfter.toLowerCase();

  if (userAnswer === correct) {
    feedbackElem.textContent = "✅ Correct!";
    feedbackElem.style.color = "#00ffb7";
    nextBtn.classList.remove("hidden");
  } else {
    feedbackElem.textContent = "❌ Try again!";
    feedbackElem.style.color = "#ff8080";
  }
});

nextBtn.addEventListener("click", () => {
  current++;
  if (current < lyrics.length) {
    loadLyrics();
  } else {
    lyricElem.textContent = "🎉 You've finished all the songs!";
    answerElem.style.display = "none";
    checkBtn.style.display = "none";
    nextBtn.style.display = "none";
    toggleVideoBtn.style.display = "none";
    player.stopVideo();
  }
});

toggleVideoBtn.addEventListener("click", () => {
  videoVisible = !videoVisible;
  if (videoVisible) {
    playerContainer.classList.remove("hidden-video");
    toggleVideoBtn.textContent = "🎧 Audio Only";
  } else {
    playerContainer.classList.add("hidden-video");
    toggleVideoBtn.textContent = "🎥 Show Video";
  }
});
