'use strict';

let guess = Math.floor(Math.random() * 20);
let highScore = 0;
let score = 20;

const numberInput = document.querySelector('.guess');
const answer = document.querySelector('.number');
const checkBtn = document.querySelector('.check');
const msg = document.querySelector('.message');
const scoreLabel = document.querySelector('.score');
const hScoreLabel = document.querySelector('.highscore');
const againBtn = document.querySelector('.again');

checkBtn.addEventListener('click', () => {
  guessChecker();
});

againBtn.addEventListener('click', () => {
  resetScore();
});

function resetScore() {
  answer.textContent = '?';

  numberInput.disabled = false;
  score = 20;
  scoreLabel.textContent = score;
  numberInput.value = '';
  msg.textContent = 'Start guessing...';
  document.body.style.backgroundColor = '#222';
  checkBtn.style.backgroundColor = 'white';
}

function guessChecker() {
  if (numberInput.disabled) return;
  if (Number(numberInput.value) === guess) {
    displayWin();
  } else {
    if (Number(numberInput.value) > guess) {
      msg.textContent = 'Too High';
    } else if (Number(numberInput.value) < guess) {
      msg.textContent = 'Too Low';
    }
    score--;
    scoreLabel.textContent = score;
  }
  scoreChecker();
}

function displayWin() {
  answer.textContent = guess;
  document.body.style.backgroundColor = 'green';
  highScore = Math.max(highScore, score);
  hScoreLabel.textContent = highScore;
  guess = Math.floor(Math.random() * 20);
  msg.textContent = 'Correct number';
  numberInput.disabled = true;
}

function scoreChecker() {
  if (score === 0) {
    showLoseScreen();
  }
}

function showLoseScreen() {
  msg.textContent = 'YOU LOST!';
  document.body.style.backgroundColor = 'red';
  checkBtn.style.backgroundColor = 'brown';
  numberInput.disabled = true;
}
