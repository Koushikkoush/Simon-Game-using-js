let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0; // Declare the highScore variable

let btns = ["red", "yellow", "green", "blue"];

let h2 = document.querySelector("h2");

document.addEventListener("click", function(event) {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
        setTimeout(enableButtons, 1000); // Enable buttons after 1 second
    }
});

function enableButtons() {
    let allBtns = document.querySelectorAll(".btn");
    allBtns.forEach(function(btn) {
        btn.disabled = false; // Enable buttons after game starts
    });
}

// Disable buttons initially
document.querySelectorAll(".btn").forEach(function(btn) {
    btn.disabled = true;
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
    let randIndex = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}   

function checkAnswer() {
    let idx = userSeq.length - 1; // Use userSeq length to check each user input step by step
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level - 1; // Update high score before resetting
        }
        h2.innerHTML = `Game Over! Your score: <b>${level - 1}</b><br>High Score: <b>${highScore}</b><br>Tap anywhere to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("class").split(' ')[1]; // Get the color from the class
    userSeq.push(userColor);
    checkAnswer();
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function(btn) {
    btn.addEventListener("click", btnPress);
});

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;

    document.querySelectorAll(".btn").forEach(function(btn) {
        btn.disabled = true; // Disable buttons on reset
    });
}
