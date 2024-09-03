let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ["red", "yellow", "green", "blue"];
let h2 = document.querySelector("h2");
let startButton = document.querySelector("#start-btn");

// Start the game when the start button is clicked
startButton.addEventListener("click", function() {
  if (!started) {
    startButton.style.display = "none"; // Hide the start button
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Generate a random color and add it to the game sequence
  let randIndex = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIndex];
  gameSeq.push(randColor);

  // Display the full sequence to the user
  let i = 0;
  function displaySequence() {
    if (i < gameSeq.length) {
      let randBtn = document.querySelector(`.${gameSeq[i]}`);
      btnFlash(randBtn);
      i++;
      setTimeout(displaySequence, 500);
    }
  }
  displaySequence();
}

function checkAnswer() {
  let idx = userSeq.length - 1;
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000); // Move to the next level
    }
  } else {
    // Game over, update the high score if necessary
    if (level > highScore) {
      highScore = level - 1;
    }
    h2.innerHTML = `Game Over! Your score: <b>${level - 1}</b><br>High Score: <b>${highScore}</b><br>Tap "Start" to play again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

function btnPress(event) {
  event.preventDefault(); // Prevent default behavior (optional)
  if (!started) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("class").split(' ')[1];
  userSeq.push(userColor);

  checkAnswer();
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function(btn) {
  btn.addEventListener("touchend", btnPress);
});

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
  startButton.style.display = "block"; // Show the start button again
}
