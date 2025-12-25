
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

/* Start game */
document.addEventListener("keydown", function () {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        h2.innerText = "Game Started";
        levelUp();
    }
});

/* Game flash */
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

/* User flash */
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

/* Level up */
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    // show sequence (single flash per level like classic version)
    setTimeout(() => {
        gameFlash(randBtn);
    }, 500);
}

/* Check answer */
function checkAns(currentIndex) {
    if (userSeq[currentIndex] === gameSeq[currentIndex]) {

        // if user finished current sequence
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {
        gameOver();
    }
}

/* Button press */
function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

/* Add click listeners */
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

/* Game over */
function gameOver() {
    h2.innerHTML = `Game Over!<br>Your score was <b>${level}</b><br>Press any key to restart`;
    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 200);

    reset();
}

/* Reset */
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
