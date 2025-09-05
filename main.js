// Perusasetukset
const canvas = document.getElementById('pelialue');
canvas.width = 800;
canvas.height = 500;
const ctx = canvas.getContext('2d');

// Muuttujat
let ball = { 
    x: canvas.width / 2,   // keskelle vaaka
    y: canvas.height / 2,  // keskelle pysty
    radius: 10,            // pallon säde
    dx: 3,                 // nopeus x-suunta
    dy: 3                  // nopeus y-suunta
};

let paddleLeft = {                     // vasen maila
    x: 10,                             // 10px vasemmasta reunasta
    y: canvas.height / 2 - 40,         // keskelle pystysuunnassa
    width: 10,                         // mailan leveys
    height: 80,                        // mailan korkeus
    dy: 0                              // nopeus y-suunnassa (aluksi 0)
};

let paddleRight = {                    // oikea maila
    x: canvas.width - 20,              // 10px oikeasta reunasta
    y: canvas.height / 2 - 40,
    width: 10,
    height: 80,
    dy: 0
};

let scoreLeft = 0; // vasemman pelaajan pisteet
let scoreRight = 0; // oikean pelaajan pisteet
let gameState = "start"; // pelin tila: "start", "play", "gameOver"
let keys = {};
let winner = "";

let timeLeft = 30; // sekuntia
let timerInterval;


// Pelin käynnistys
document.getElementById('startBtn').addEventListener('click', () => {
    if (gameState === 'start' || gameState === 'gameOver') {
        resetGame();
        gameState = 'play';
    }
});

function resetGame() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 3;
    ball.dx = 3;
    paddleRight.y = canvas.height / 2 - paddleRight.height / 2;
    paddleLeft.y = canvas.height / 2 - paddleLeft.height / 2;
    startTimer();
}

// Ajastin
function startTimer() {
    timeLeft = 30;
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            checkGameOver(); // tarkista voittaja ajan täyttyessä
            clearInterval(timerInterval);
        }
    }, 1000);
}


// Liikutetaan oikeaa mailaa
function movePaddles() {
    if (keys['ArrowUp']) {
        paddleRight.y -= 5;
    }
    if (keys['ArrowDown']) {
        paddleRight.y += 5;
    }
    if (paddleRight.y < 0) paddleRight.y = 0;
    if (paddleRight.y + paddleRight.height > canvas.height) {
        paddleRight.y = canvas.height - paddleRight.height;
    }
}

// Päivitetään pallon ja mailojen liike
function update() {
    if (gameState === 'play') {
        // pallo liikkuu
        ball.x += ball.dx;
        ball.y += ball.dy;

        //kimpoaa ylä- ja alaseinästä
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.dy *= -1;
        }

        //törmäys vasempaan mailaan
        if (
            ball.x - ball.radius < paddleLeft.x + paddleLeft.width &&
            ball.y > paddleLeft.y &&
            ball.y < paddleLeft.y + paddleLeft.height
        ) {
            ball.dx *= -1; //vaihda suunta
            ball.x = paddleLeft.x + paddleLeft.width + ball.radius; //työntää pallon mailan ulkopuolelle
            increaseBallSpeed(); // lisätään nopeutta
        }

        //törmäys oikeaan mailaan
        if (
            ball.x + ball.radius > paddleRight.x &&
            ball.y > paddleRight.y &&
            ball.y < paddleRight.y + paddleRight.height
        ) {
            ball.dx *= -1; //vaihda suunta
            ball.x = paddleRight.x - ball.radius; //työntää pallon mailan ulkopuolelle
            increaseBallSpeed(); // lisätään nopeutta
        }

        //pisteiden lasku
        if (ball.x + ball.radius < 0) {
            //pallo meni vasemmalta yli
            scoreRight++;
            checkGameOver();
            resetBall();
        }
        if (ball.x - ball.radius > canvas.width) {
            //pallo meni oikealta yli
            scoreLeft++;
            checkGameOver();
            resetBall();
        }

        //mailojen liike
        movePaddles();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    // suunta vaihtuu mutta saavutettu nopeus säilyy
    ball.dx = Math.sign(ball.dx) * (Math.random() > 0.5 ? 1 : -1) * Math.abs(ball.dx);
    ball.dy = Math.sign(ball.dy) * (Math.random() > 0.5 ? 1 : -1) * Math.abs(ball.dy);
}

// Pallon nopeuden kasvatus
function increaseBallSpeed() {
    ball.dx *= 1.05;
    ball.dy *= 1.05;

    // varmistus ettei nopeus kasva liikaa
    ball.dx = Math.max(Math.min(ball.dx, 10), -10);
    ball.dy = Math.max(Math.min(ball.dy, 10), -10);
}

// Pelin piirto
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjä ruutu
    drawBall(); // Pallon piirto
    drawPaddles();  // Mailojen piirto
    drawScores();// Tänne pisteet

    if (gameState === 'gameOver') {
        ctx.fillStyle = '#faa307';
        ctx.font = '40px Unkempt';
        ctx.textAlign = 'center';
        ctx.fillText(winner, canvas.width / 2, canvas.height / 2);
    }
}

function drawScores() {
    ctx.fillStyle = '#faa307';
    ctx.font = '24px Unkempt';
    //Pelaaja 1 (vasen maila, ai)
    ctx.textAlign = 'left';
    ctx.fillText(`Pelaaja 1: ${scoreLeft}`, 20, 30); // vas. yläkulma

    //Pelaaja 2 (oikea maila, ihminen)
    ctx.textAlign = 'right';
    ctx.fillText(`Pelaaja 2: ${scoreRight}`, canvas.width - 20, 30); //oik. yläkulma

    ctx.textAlign = 'center';
    ctx.fillText(`Aika: ${timeLeft}s`, canvas.width / 2, 30); // ajastin
}

// Pallon piirto
function drawBall() {
    ctx.beginPath(); // Uusi polku
    ctx.arc(
        ball.x,        // x-koordinaatti
        ball.y,        // y-koordinaatti
        ball.radius,   // säde
        0,             // alku­kulma
        Math.PI * 2    // loppukulma (ympyrä)
    );
    ctx.fillStyle = "white"; // väri
    ctx.fill();              // täyttö
    ctx.closePath();         // Sulje polku
}

// Mailojen piirto
function drawPaddles() {
    ctx.fillStyle = "white"; // mailojen väri

    // Vasen maila
    ctx.fillRect(
        paddleLeft.x, 
        paddleLeft.y, 
        paddleLeft.width, 
        paddleLeft.height
    );

    // Oikea maila
    ctx.fillRect(
        paddleRight.x, 
        paddleRight.y, 
        paddleRight.width, 
        paddleRight.height
    );
}

// Tekoälyvastus (tässä seuraa pallon y-koordinaattia niin ettei ehdi aina mukaan)
function updateAIMovement() {
    const targetY = ball.y - paddleRight.height / 2;
    const aiSpeed = 2.5; // hitaampi kuin pallon nopeus

    if (paddleLeft.y < targetY) {
        paddleLeft.y += aiSpeed;
    } else if (paddleLeft.y > targetY) {
        paddleLeft.y -= aiSpeed;
    }
}


// Näppäimet
document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault(); //estää sivun scrollauksen
    }

    keys[e.key] = true;

    if (gameState === 'start' && e.code === 'Space') {
        gameState = 'play';
    }
});

document.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault(); //estää sivun scrollauksen
    }
    keys[e.key] = false;
});

//Game over-tarkistus
function checkGameOver() {
    if (scoreLeft >= 5 || scoreRight >= 5 || timeLeft <= 0) {
        gameState = 'gameOver';
        clearInterval(timerInterval); // ajastimen nollaus

        // voittajan määritys
        if (scoreLeft > scoreRight) {
            winner = "Pelaaja 1 voitti!";
        } else if (scoreRight > scoreLeft) {
            winner = "Pelaaja 2 voitti!";
        } else {
            winner = "Tasapeli!";
        }
    }
}

// Pelisilmukka
function gameLoop() {
    updateAIMovement(); // tekoäly ohjaa vasenta mailaa
    drawGame();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();



