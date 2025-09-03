const canvas = document.getElementById('pelialue');
const ctx = canvas.getContext('2d');

// Muuttujat

let ball = { 
    x: canvas.width / 2,   // keskelle vaaka
    y: canvas.height / 2,  // keskelle pysty
    radius: 10,            // pallon säde
    dx: 3,                 // nopeus x-suunta
    dy: 3                  // nopeus y-suunta
};

let paddleLeft = { x: ..., y: ..., width: ..., height: ..., dy: ... }; // vasen maila
let paddleRight = { x: ..., y: ..., width: ..., height: ..., dy: ... }; // oikea maila
let scoreLeft = 0; // vasemman pelaajan pisteet
let scoreRight = 0; // oikean pelaajan pisteet
let gameState = "start"; // pelin tila: "start", "play", "gameOver"


// Pelin piirto
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Tyhjä ruutu
    drawBall(); // Pallon piirto
    // Tänne mailat pisteet jne.
}


// Pallo
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


// Pelaajan "maila"

// Näppäimet

// Kimpoaa ylä- ja alaseinästä

// Kimpoaa pelaajan mailasta

// Jos pallo menee vasemman reunan ohi -> peli ohi
    document.getElementById('gameOver').style.display = 'block';

// Kimpoaa oikeasta reunasta

// Pisteenlasku

// Pelisilmukka
function gameLoop() {
    drawGame();
    requestAnimationFrame(gameLoop);
}
gameLoop();


