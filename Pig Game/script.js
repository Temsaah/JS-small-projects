'use strict';

let currentPlayer = document.querySelector('.player--active');

let fPlayerName;
let sPlayerName;

let currentScore = 0;
let fPlayerTotal = 0;
let sPlayerTotal = 0;

const fPlayer = document.querySelector('.player--0');
const sPlayer = document.querySelector('.player--1');

let playerCurrentScore = currentPlayer.querySelector('.current-score');

let playerTotalScore = currentPlayer.querySelector('.score');

const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelectorAll('.btn--new');

const game = document.querySelector('.game');
const gameEnd = document.querySelector('.game-end');

document.addEventListener('keydown', e => {
  if (e.key === 'r' || e.key === 'R') rollDice();
  if (e.key === 'f' || e.key === 'F') holdScore();
});

rollBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newGameBtn.forEach(btn => {
  btn.addEventListener('click', resetGame);
});

function gameStart() {
  getPlayerNames();
  resetGame();
}

function getPlayerNames() {
  fPlayerName = prompt('Enter first Player Name');
  sPlayerName = prompt('Enter second Player Name');
  fPlayer.querySelector('.name').textContent = fPlayerName;
  sPlayer.querySelector('.name').textContent = sPlayerName;
}

function rollDice() {
  let randomNum = Math.floor(Math.random() * 6) + 1;

  showDice(randomNum);

  if (randomNum === 1) {
    switchPlayer();
  } else {
    currentScore += randomNum;
    playerCurrentScore.textContent = currentScore;
  }
}

function resetCurrentScore(player) {
  currentScore = 0;
  player.querySelector('.current-score').textContent = currentScore;
}

function switchPlayer() {
  resetCurrentScore(currentPlayer);
  fPlayer.classList.toggle('player--active');
  sPlayer.classList.toggle('player--active');
  currentPlayer = document.querySelector('.player--active');
  playerCurrentScore = currentPlayer.querySelector('.current-score');
  playerTotalScore = currentPlayer.querySelector('.score');
}

function showDice(randomNum) {
  dice.classList.remove('hidden');
  dice.src = `dice-${randomNum}.png`;
}

function holdScore() {
  if (currentPlayer === fPlayer) {
    fPlayerTotal += currentScore;
    playerTotalScore.textContent = fPlayerTotal;
  } else if (currentPlayer === sPlayer) {
    sPlayerTotal += currentScore;
    playerTotalScore.textContent = sPlayerTotal;
  }

  let winner = checkWinner();

  console.log(winner);

  if (winner) {
    endGame();
    showWinner(winner);
    return;
  }

  switchPlayer();
}

function checkWinner() {
  if (fPlayerTotal < 100 && sPlayerTotal < 100) return null;

  if (fPlayerTotal >= 100) {
    return fPlayer;
  } else if (sPlayerTotal >= 100) {
    return sPlayer;
  }
}

function endGame() {
  game.classList.add('hidden');
}

function showWinner(winner) {
  const winnerName = winner.querySelector('.name').textContent;
  document.querySelector('.winner-name').textContent = winnerName;

  gameEnd.classList.remove('hidden');
}

function resetGame() {
  currentScore = 0;
  fPlayerTotal = 0;
  sPlayerTotal = 0;

  fPlayer.querySelector('.score').textContent = '0';
  sPlayer.querySelector('.score').textContent = '0';

  fPlayer.querySelector('.current-score').textContent = '0';
  sPlayer.querySelector('.current-score').textContent = '0';
  resetUI();
}

function resetUI() {
  if (!gameEnd.classList.contains('hidden')) {
    gameEnd.classList.add('hidden');
  }

  if (game.classList.contains('hidden')) {
    game.classList.remove('hidden');
  }
}

gameStart();
