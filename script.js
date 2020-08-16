let sessionCount = 25;
let breakCount = 5;
let sessionTimeCount = "25:00";
let breakTimeCount = "05:00";
const sessionLength = document.getElementById("session-length");
const breakLength = document.getElementById("break-length");
const timeLeft = document.getElementById("time-left");
timeLeft.innerHTML = sessionTimeCount;

let isStarted = false;
let start,
  time,
  m,
  s,
  sessionID,
  breakID,
  blinkID,
  timeRemaining,
  timePaused,
  totalSeconds;
let sessionMinutes = sessionCount * 60;
let breakMinutes = breakCount * 60;
let whichTimer = 0;

let timerLabel = document.getElementById("timer-label");
let timerIcon = document.getElementById("timer-icon");
let startStop = document.getElementById("start_stop");
let taskInput = document.getElementById("task-input");
let addTaskBtn = document.getElementById("add-task");
let taskOutput = document.getElementById("task-output");
let muteUnmuteBtn = document.getElementById("mute_unmute");
let beep = document.getElementById("beep");
beep.muted = false;
let task;

timerLabel.innerHTML = "Ready?";
timerIcon.innerHTML = '<i class="fas fa-flag-checkered"></i>';
startStop.innerHTML = '<i class="fas fa-play"></i>';
muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';

const pomodoro = (sessionSec, breakSec) => {
  let start = new Date().getTime();

  const sessionTimer = () => {
    timerLabel.innerHTML = "Get to work!";
    timerIcon.innerHTML = '<i class="fas fa-running"></i>';

    beep.pause();
    time = (new Date().getTime() - start) / 1000;
    totalSeconds = sessionSec - time;
    timeRemaining = time;
    m = Math.floor((sessionSec - time) / 60);
    s = Math.floor((sessionSec - time) % 60);
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (totalSeconds <= 0) {
      clearInterval(sessionID);
      sessionID = null;
      whichTimer = 1;
      start = new Date().getTime() + 2000;
      beep.play();
      return setTimeout(() => {
        breakID = setInterval(breakTimer, 250);
      }, 1000);
    }
    timeLeft.innerText = m + ":" + s;
  };

  const breakTimer = () => {
    beep.pause();
    timerLabel.innerHTML = "Take a break";
    timerIcon.innerHTML = '<i class="fas fa-coffee"></i>';

    time = (new Date().getTime() - start) / 1000;
    totalSeconds = breakSec - time;
    timeRemaining = time;
    m = Math.floor((breakSec - time) / 60);
    s = Math.floor((breakSec - time) % 60);
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    if (totalSeconds <= 0) {
      clearInterval(breakID);
      breakID = null;
      whichTimer = 0;
      beep.play();
      start = new Date().getTime() + 2000;
      return setTimeout(() => {
        sessionID = setInterval(sessionTimer, 250);
      }, 1000);
    }
    timeLeft.innerText = m + ":" + s;
  };

  const blinkTimer = () => {
    timeLeft.style.color =
      timeLeft.style.color == "transparent" ? "inherit" : "transparent";
  };

  if (!isStarted) {
    if (whichTimer === 0) {
      sessionID = setInterval(sessionTimer, 250);
    } else {
      breakID = setInterval(breakTimer, 250);
    }

    startStop.innerHTML = '<i class="fas fa-pause"></i>';
    clearInterval(blinkID);
    blinkID = null;
    timeLeft.style.color = "inherit";
    isStarted = true;
  } else if (isStarted) {
    if (whichTimer === 0) {
      timerLabel.innerHTML = "Work Paused";
      clearInterval(sessionID);
      sessionID = null;
      timePaused = timeRemaining;
      sessionMinutes -= timePaused;
    } else {
      timerLabel.innerHTML = "Break Paused";
      clearInterval(breakID);
      breakID = null;
      timePaused = timeRemaining;
      breakMinutes -= timePaused;
    }

    blinkID = setInterval(blinkTimer, 600);
    isStarted = false;

    timerIcon.innerHTML = '<i class="fas fa-pause"></i>';
    startStop.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const resetTimer = () => {
  clearInterval(sessionID);
  clearInterval(breakID);
  clearInterval(blinkID);
  sessionID = null;
  breakID = null;
  blinkID = null;
  isStarted = false;
  whichTimer = 0;
  timerLabel.innerHTML = "Ready?";
  timerIcon.innerHTML = '<i class="fas fa-flag-checkered"></i>';
  startStop.innerHTML = '<i class="fas fa-play"></i>';
  timeLeft.style.color = "inherit";
  taskOutput.innerHTML = "";
  sessionMinutes = sessionCount * 60;
  breakMinutes = breakCount * 60;
  timeLeft.innerHTML = sessionTimeCount;
};

document.getElementById("reset").addEventListener("click", () => {
  sessionCount = 25;
  breakCount = 5;
  sessionTimeCount = "25:00";
  breakTimeCount = "05:00";
  breakLength.innerHTML = breakCount;
  sessionLength.innerHTML = sessionCount;
  sessionMinutes = sessionCount * 60;
  breakMinutes = breakCount * 60;
  timeLeft.innerHTML = sessionTimeCount;
});

const sessionCounter = () => {
  if (event.currentTarget.id === "session-increment") {
    if (sessionCount < 60) {
      sessionCount++;
      if (sessionCount < 10) {
        sessionTimeCount = "0" + sessionCount + ":00";
      } else {
        sessionTimeCount = sessionCount + ":00";
      }
      sessionLength.innerHTML = sessionCount;
      timeLeft.innerHTML = sessionTimeCount;
    }
    resetTimer();
  }
  if (event.currentTarget.id === "session-decrement") {
    if (sessionCount > 1) {
      sessionCount--;
      if (sessionCount < 10) {
        sessionTimeCount = "0" + sessionCount + ":00";
      } else {
        sessionTimeCount = sessionCount + ":00";
      }
      sessionLength.innerHTML = sessionCount;
      timeLeft.innerHTML = sessionTimeCount;
    }
    resetTimer();
  }
};

const breakCounter = () => {
  if (event.currentTarget.id === "break-increment") {
    if (breakCount < 60) {
      breakCount++;
      if (breakCount < 10) {
        breakTimeCount = "0" + breakCount + ":00";
      } else {
        breakTimeCount = breakCount + ":00";
      }
      breakLength.innerHTML = breakCount;
    }
    resetTimer();
  }
  if (event.currentTarget.id === "break-decrement") {
    if (breakCount > 1) {
      breakCount--;
      if (breakCount < 10) {
        breakTimeCount = "0" + breakCount + ":00";
      } else {
        breakTimeCount = breakCount + ":00";
      }
      breakLength.innerHTML = breakCount;
    }
    resetTimer();
  }
};

const muteUnmute = () => {
  if (beep.muted === false) {
    beep.muted = true;
    muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    beep.muted = false;
    muteUnmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
};

taskInput.addEventListener("input", () => {
  if (taskInput.value.length === taskInput.maxLength) {
    taskInput.style.border = "2px solid red";
    taskOutput.style.color = "red";
    taskOutput.innerHTML =
      '<i id="max-chars" class="fas fa-exclamation-circle"></i> Must be ' +
      taskInput.maxLength +
      " characters or less!";
    window.addEventListener("click", (e) => {
      if (e.target.id === "add-task") {
        addTask();
      } else {
        taskInput.style.border = "none";
        taskOutput.style.color = "rgba(82, 82, 82, 1)";
        taskOutput.innerHTML = "";
        taskInput.value = "";
      }
    });
    addTaskBtn.addEventListener("click", () => {
      taskInput.style.border = "none";
      taskOutput.style.color = "rgba(82, 82, 82, 1)";
      taskOutput.innerHTML = "";
      taskInput.value = "";
    });
  } else {
    taskInput.style.border = "none";
    taskOutput.style.color = "rgba(82, 82, 82, 1)";
    taskOutput.innerHTML = "";
  }
});

const addTask = () => {
  task = taskInput.value;
  taskInput.value = "";
  taskOutput.innerHTML = task;
};
