// Game variables
let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;
let highScore = 0;

// DOM elements
const buttons = ["red", "yellow", "green", "blue"];
const heading = document.querySelector("h2");
const startButton = document.querySelector("#start-btn");
const allButtons = document.querySelectorAll(".btn");

// Start the game when the start button is clicked
startButton.addEventListener("click", () => {
  if (!started) {
    startButton.style.display = "none"; // Hide the start button
    started = true;
    levelUp();
  }
});

// Function to flash a button
function flashButton(button, className) {
  button.classList.add(className);
  setTimeout(() => {
    button.classList.remove(className);
  }, 250);
}

// Function to level up
function levelUp() {
  userSequence = [];
  level++;
  heading.innerText = `Level ${level}`;

  // Generate a random color and add it to the game sequence
  const randomIndex = Math.floor(Math.random() * buttons.length);
  const randomColor = buttons[randomIndex];
  gameSequence.push(randomColor);

  // Display the full sequence to the user
  let i = 0;
  function displaySequence() {
    if (i < gameSequence.length) {
      const button = document.querySelector(`.${gameSequence[i]}`);
      flashButton(button, "flash");
      i++;
      setTimeout(displaySequence, 500);
    }
  }
  displaySequence();
}

// Function to check the user's answer
function checkAnswer() {
  const idx = userSequence.length - 1;
  if (userSequence[idx] === gameSequence[idx]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 1000); // Move to the next level
    }
  } else {
    // Game over, update the high score if necessary
    if (level > highScore) {
      highScore = level - 1;
    }
    heading.innerHTML = `Game Over! Your score: <b>${level - 1}</b><br>High Score: <b>${highScore}</b><br>Tap "Start" to play again.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    reset();
  }
}

// Function to handle button press
function buttonPress() {
  if (!started) return;

  const button = this;
  flashButton(button, "userflash");

  const userColor = button.getAttribute("class").split(" ")[1];
  userSequence.push(userColor);

  checkAnswer();
}

// Add event listeners to all buttons
allButtons.forEach((button) => {
  button.addEventListener("click", buttonPress);
});

// Function to reset the game
function reset() {
  started = false;
  userSequence = [];
  gameSequence = [];
  level = 0;
  startButton.style.display = "block"; // Show the start button again
}
