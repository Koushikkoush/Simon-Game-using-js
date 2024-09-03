let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let btns = ["red", "yellow", "green", "blue"];
let h2 = document.querySelector("h2");

document.addEventListener("click", function(event) {
    if (!started) {
        console.log("Game started");
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
    let randIndex = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIndex];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    setTimeout(() => btnFlash(randBtn), 500); // Delay flash to avoid immediate input
}

function checkAnswer() {
    let idx = userSeq.length - 1;
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level > highScore) {
            highScore = level - 1;
        }
        h2.innerHTML = `Game Over! Your score: <b>${level - 1}</b><br>High Score: <b>${highScore}</b><br>Tap anywhere to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    if (!started) return; // Prevent button press before the game starts

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("class").split(' ')[1];
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
}
