const emojis = ['🎮', '🎲', '🎯', '🎨', '🎭', '🎪', '🎢', '🎡'];
const gameBoard = document.getElementById('gameBoard');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const resetBtn = document.getElementById('resetBtn');
const scoreboard = document.getElementById('scoreboard');

const bgsound = new Audio('./Game Sounds/bg.mp3');
const cardmatched = new Audio('./Game Sounds/cardmatched.mp3');
const winsound = new Audio('./Game Sounds/Win.mp3');

let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let timer = 0;
let timerInterval;
let isPlaying = false;

function initializeGame() {

    // Reset game state
    cards = [];
    flippedCards = [];
    moves = 0;
    matches = 0;
    timer = 0;
    isPlaying = false;
    clearInterval(timerInterval);

    // Update display
    movesDisplay.textContent = moves;
    timeDisplay.textContent = timer;
    gameBoard.innerHTML = '';

    // Create card deck
    const cardDeck = [...emojis, ...emojis];
    shuffleArray(cardDeck);

    // Create card elements
    cardDeck.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startTimer() {
    if (!isPlaying) {
        isPlaying = true;
        winsound.pause();
        bgsound.play();
        bgsound.loop = true;
        timerInterval = setInterval(() => {
            timer++;
            timeDisplay.textContent = timer;
        }, 1000);
    }
}

function flipCard() {
    const card = this;
    
    // Prevent flipping if card is already flipped or matched
    if (card.classList.contains('flipped') ||
        card.classList.contains('matched') ||
        flippedCards.length >= 2) {
        return;
    }

    startTimer();

    // Flip card
    card.classList.add('flipped');
   
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;

    if (match) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matches++;
        cardmatched.play();
        if (matches === emojis.length) {
            setTimeout(() => {
                bgsound.pause();
                winsound.play();
                scoreboard.innerHTML=`<p>Congratulations🎉! You won in ${moves} moves and ${timer} seconds!</p>`;
                
                clearInterval(timerInterval);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

resetBtn.addEventListener('click', initializeGame);

initializeGame();