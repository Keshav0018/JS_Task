"use strict";

const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const resetBtn = document.querySelector(".reset-btn");

const minEl = document.querySelector(".min");
const secEl = document.querySelector(".sec");
const tabs = document.querySelectorAll(".tab");
const countEl = document.querySelector(".count");

const tabsObjects = {
  pomodoro: { min: 25, sec: 0 },
  short: { min: 5, sec: 0 },
  long: { min: 15, sec: 0 },
};

let curState = "pomodoro";

let curTime = {
  min: tabsObjects[curState].min,
  sec: tabsObjects[curState].sec,
};

let interval;

let count = 0.5;

const changeTimeOnDisplay = function () {
  minEl.innerText = (curTime.min + "").padStart(2, "0");
  secEl.innerText = (curTime.sec + "").padStart(2, "0");
};

const changeCurTime = function () {
  // When once next is clicked the cur time is set back depending the tab
  if (startBtn.innerText !== "Pause") {
    changeTimeOnDisplay();
    return;
  }

  // Timer
  if (curTime.sec == 0) {
    curTime.sec = 59;
    curTime.min--;
  } else {
    curTime.sec--;
  }

  changeTimeOnDisplay();
};

const changeToNextSate = function () {
  // Updating the count
  count += 0.5;
  // displaying the count

  countEl.innerText = `${Math.floor(count)}`;

  // Depending on the state and count jumping to correct tab

  if (curState == "pomodoro" && count % 4 != 0) {
    curState = "short";
  } else if (curState == "short" || curState == "long") {
    curState = "pomodoro";
  } else if (curState == "pomodoro" && count % 4 == 0) {
    curState = "long";
  }

  curTime.min = tabsObjects[curState].min;
  curTime.sec = tabsObjects[curState].sec;
  startBtn.innerText = "Start";
  changeCurTime();

  clearInterval(interval);

  // Removing active tab
  tabs.forEach((tab) => {
    tab.classList.remove("tab--active");
  });

  // Adding active tab to current one
  document.querySelector(`.${curState}-tab`).classList.add("tab--active");
};

const startWatch = function () {
  // If the button is pause then stop interval and change text to start   and return
  if (startBtn.innerText == "Pause") {
    clearInterval(interval);
    startBtn.innerText = "Start";
    return;
  }

  // if the button is start the give option of pause
  startBtn.innerText = "Pause";

  // To immidately change the time after start is clicked
  changeCurTime();

  // To change time on display after 1 seconds
  interval = setInterval(() => {
    changeCurTime();
    if (curTime.min == 0 && curTime.sec == 0) {
      clearInterval(interval);
      changeToNextSate();
      startWatch();
    }
  }, 1000);
};

const resetWatch = function () {
  // Reseting the clock
  curTime.min = tabsObjects[curState].min;
  curTime.sec = tabsObjects[curState].sec;
  startBtn.innerText = "Start";
  clearInterval(interval);
  changeCurTime();
};

startBtn.addEventListener("click", startWatch);

nextBtn.addEventListener("click", changeToNextSate);

resetBtn.addEventListener("click", resetWatch);

// init
(function () {
  changeTimeOnDisplay();
  countEl.innerText = `${Math.floor(count)}`;
})();
