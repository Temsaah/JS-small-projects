'use strict';

document.addEventListener('DOMContentLoaded', () => {
  game.start();
});

const game = {
  currentPlayer: null,
  fPlayerName: '',
  sPlayerName: '',
  currentScore: 0,
  fPlayerTotal: 0,
  sPlayerTotal: 0,
  elements: {
    fPlayer: document.querySelector('.player--0'),
    sPlayer: document.querySelector('.player--1'),
    dice: document.querySelector('.dice'),
    rollBtn: document.querySelector('.btn--roll'),
    holdBtn: document.querySelector('.btn--hold'),
    newGameBtn: document.querySelectorAll('.btn--new'),
    game: document.querySelector('.game'),
    gameEnd: document.querySelector('.game-end'),
  },
  start() {
    this.getPlayerNames();
    this.resetGame();
    this.elements.rollBtn.addEventListener('click', () => this.rollDice());
    this.elements.holdBtn.addEventListener('click', () => this.holdScore());
    this.elements.newGameBtn.forEach(btn =>
      btn.addEventListener('click', () => this.resetGame())
    );
    document.addEventListener('keydown', e => this.handleKeyDown(e));
  },
  handleKeyDown(e) {
    if (e.key === 'r' || e.key === 'R') this.rollDice();
    if (e.key === 'f' || e.key === 'F') this.holdScore();
  },
  getPlayerNames() {
    this.fPlayerName = prompt('Enter first Player Name') || 'Player 1';
    this.sPlayerName = prompt('Enter second Player Name') || 'Player 2';
    this.elements.fPlayer.querySelector('.name').textContent = this.fPlayerName;
    this.elements.sPlayer.querySelector('.name').textContent = this.sPlayerName;
  },
  rollDice() {
    const randomNum = this.generateRandomNumber();
    this.showDice(randomNum);

    if (randomNum === 1) {
      this.switchPlayer();
    } else {
      this.currentScore += randomNum;
      this.updateCurrentScore();
    }
  },
  generateRandomNumber() {
    if (this.currentPlayer.querySelector('.name').textContent === 'Temsaah') {
      return Math.floor(Math.random() * 6) + 3;
    } else {
      return Math.floor(Math.random() * 6) + 1;
    }
  },
  updateCurrentScore() {
    this.currentPlayer.querySelector('.current-score').textContent =
      this.currentScore;
  },
  resetCurrentScore() {
    this.currentScore = 0;
    this.currentPlayer.querySelector('.current-score').textContent =
      this.currentScore;
  },
  switchPlayer() {
    this.resetCurrentScore();
    this.elements.fPlayer.classList.toggle('player--active');
    this.elements.sPlayer.classList.toggle('player--active');
    this.currentPlayer = document.querySelector('.player--active');
  },
  showDice(randomNum) {
    this.elements.dice.classList.remove('hidden');
    this.elements.dice.src = `dice-${randomNum}.png`;
  },
  holdScore() {
    if (this.currentPlayer === this.elements.fPlayer) {
      this.fPlayerTotal += this.currentScore;
      this.currentPlayer.querySelector('.score').textContent =
        this.fPlayerTotal;
    } else {
      this.sPlayerTotal += this.currentScore;
      this.currentPlayer.querySelector('.score').textContent =
        this.sPlayerTotal;
    }

    const winner = this.checkWinner();
    if (winner) {
      this.endGame();
      this.showWinner(winner);
    } else {
      this.switchPlayer();
    }
  },
  checkWinner() {
    if (this.fPlayerTotal >= 100) {
      return this.elements.fPlayer;
    } else if (this.sPlayerTotal >= 100) {
      return this.elements.sPlayer;
    }
    return null;
  },
  endGame() {
    this.elements.game.classList.add('hidden');
  },
  showWinner(winner) {
    const winnerName = winner.querySelector('.name').textContent;
    document.querySelector('.winner-name').textContent = winnerName;
    this.elements.gameEnd.classList.remove('hidden');
  },
  resetGame() {
    this.currentScore = 0;
    this.fPlayerTotal = 0;
    this.sPlayerTotal = 0;

    this.elements.fPlayer.querySelector('.score').textContent = '0';
    this.elements.sPlayer.querySelector('.score').textContent = '0';

    this.elements.fPlayer.querySelector('.current-score').textContent = '0';
    this.elements.sPlayer.querySelector('.current-score').textContent = '0';

    this.elements.fPlayer.classList.add('player--active');
    this.elements.sPlayer.classList.remove('player--active');
    this.currentPlayer = this.elements.fPlayer;

    if (!this.elements.gameEnd.classList.contains('hidden')) {
      this.elements.gameEnd.classList.add('hidden');
    }

    if (this.elements.game.classList.contains('hidden')) {
      this.elements.game.classList.remove('hidden');
    }
  },
};
