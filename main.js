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
        }

        //törmäys oikeaan mailaan
        if (
            ball.x + ball.radius > paddleRight.x &&
            ball.y > paddleRight.y &&
            ball.y < paddleRight.y + paddleRight.height
        ) {
            ball.dx *= -1; //vaihda suunta
            ball.x = paddleRight.x - ball.radius; //työntää pallon mailan ulkopuolelle
        }

        //mailojen liike
        movePaddles();
    }
}

// Pelin piirto
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjä ruutu
    drawBall(); // Pallon piirto
    drawPaddles();  // Mailojen piirto
    // Tänne pisteet
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

// Pisteenlasku

// Pelisilmukka
function gameLoop() {
    updateAIMovement(); // tekoäly ohjaa vasenta mailaa
    drawGame();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();



