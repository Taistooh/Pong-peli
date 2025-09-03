const canvas = document.getElementById('pelialue');
const ctx = canvas.getContext('2d');

// Muuttujat
let ball = { x: ..., y: ..., radius: ..., dx: ..., dy: ... }; // pallon sijainti, koko, nopeus
let paddleLeft = { x: ..., y: ..., width: ..., height: ..., dy: ... }; // vasen maila
let paddleRight = { x: ..., y: ..., width: ..., height: ..., dy: ... }; // oikea maila
let scoreLeft = 0; // vasemman pelaajan pisteet
let scoreRight = 0; // oikean pelaajan pisteet
let gameState = "start"; // pelin tila: "start", "play", "gameOver"

// Pallo

// Pelaajan "maila"

// Näppäimet

// Kimpoaa ylä- ja alaseinästä

// Kimpoaa pelaajan mailasta

// Jos pallo menee vasemman reunan ohi -> peli ohi
    document.getElementById('gameOver').style.display = 'block';

// Kimpoaa oikeasta reunasta

// Pisteenlasku

