// Perusasetukset
const canvas = document.getElementById('pelialue');
const canvas.width = 800;
const canvas.height = 500;
const ctx = canvas.getContext('2d');

// Muuttujat
let ball = { 
    x: canvas.width / 2, 
    y: canvas.height / 2, 
    radius: ..., 
    dx: ..., 
    dy: ... 
}; // pallon sijainti, koko, nopeus

let paddleLeft = { 
    x: ..., 
    y: ..., 
    width: ..., 
    height: ..., 
    dy: ... 
}; // vasen maila

let paddleRight = { 
    x: ..., 
    y: ..., 
    width: ..., 
    height: ..., 
    dy: ... }; // oikea maila

let scoreLeft = 0; // vasemman pelaajan pisteet
let scoreRight = 0; // oikean pelaajan pisteet
let gameState = "aloita"; // pelin tila: "aloita", "pelaa", "peliohi"

// Pallo

// Pelaajan "maila"

// Näppäimet
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (gameState === 'aloita' && e.code === 'Space') {
        gameState = 'pelaa';
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Kimpoaa ylä- ja alaseinästä

// Kimpoaa pelaajan mailasta

// Jos pallo menee vasemman reunan ohi -> peli ohi
    document.getElementById('gameOver').style.display = 'block';

// Kimpoaa oikeasta reunasta

// Pisteenlasku

