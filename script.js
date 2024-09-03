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
        h2.innerText = "Your turn! Click a button to start.";
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
    
    // Generate random color only after user input
    let randIndex = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIndex];
    gameSeq.push(randColor);
    
    // Flash all colors in the current sequence
    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let randBtn = document.querySelector(`.${color}`);
            btnFlash(randBtn);
        }, (index + 1) * 500);
    });

    console.log("Game Sequence:", gameSeq);
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
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("class").split(' ')[1];
    userSeq.push(userColor);

    if (userSeq.length === 1 && gameSeq.length === 0) {
        gameSeq.push(userColor); // Add user's first input to the sequence
        setTimeout(levelUp, 1000); // Generate next sequence after user's input
    } else {
        checkAnswer();
    }
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
