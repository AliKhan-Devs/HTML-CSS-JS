const choices = ['rock', 'paper', 'scissors'];
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultElement = document.getElementById('result');
const choiceButtons = document.querySelectorAll('.choice');
const resetButton = document.getElementById('reset');

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'draw';
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'player';
    }
    
    return 'computer';
}

function updateScore(winner) {
    if (winner === 'player') playerScore++;
    if (winner === 'computer') computerScore++;
    
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function getResultMessage(winner, playerChoice, computerChoice) {
    if (winner === 'draw') {
        return `Draw 🤝! Both chose ${playerChoice}`;
    }
    if (winner === 'player') {
        return `You win 🎉! ${playerChoice} beats ${computerChoice}`;
    }
    return `Computer wins 🤖! ${computerChoice} beats ${playerChoice}`;
}

function handleChoice(event) {
    const playerChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    
    updateScore(winner);
    resultElement.textContent = getResultMessage(winner, playerChoice, computerChoice);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultElement.textContent = 'Choose your move!';
}

// Event Listeners
choiceButtons.forEach(button => {
    button.addEventListener('click', handleChoice);
});

resetButton.addEventListener('click', resetGame);