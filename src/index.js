/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import {
  refreshBtn,
  form,
  scoreList,
  msg,
  gameTitle,
} from './modules/DOMElements.js';
import api from './modules/Services.js';
import Game from './modules/Game.js';

const [name, score] = form.elements;

const game = {
  name: 'House of Dragons',
};

gameTitle.innerHTML = `${game.name} - Leaderboard`;

// run function if data is null
document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('game'));
  data ??
    api.createGame(game).then((res) => {
      const split = res.result.split(' ');
      const id = split[3];
      const gameInstance = new Game(game.name, id);
      localStorage.setItem('game', JSON.stringify(gameInstance));
    });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userScore = {
    user: name.value,
    score: Number(score.value),
  };
  const game = JSON.parse(localStorage.getItem('game'));
  api
    .createGameScore(game.id, userScore)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      msg.style.display = 'block';
      msg.innerHTML = res.result;
      setTimeout(() => {
        msg.style.display = 'none';
      }, 5000);
      form.reset();
    });
});

// Get all scores
refreshBtn.addEventListener('click', () => {
  fetchAllScores();
  scoreList.style.display = 'block';
});

const fetchAllScores = async () => {
  const game = JSON.parse(localStorage.getItem('game'));
  const scores = await api.getScores(game.id);
  scoreList.innerHTML = scores.result
    .map(
      (score) => `<li class="score-item list-group-item d-flex justify-content-between align-items-center">${score.user}<span class="badge bg-primary rounded-pill">${score.score}</span></li>`,
    )
    .join('');

  scoreList.style.display = 'block';
};
