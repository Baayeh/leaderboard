/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import {
  form,
  gameTitle,
  msg,
  refreshBtn,
  scoreList,
  topScorer,
} from './modules/DOMElements.js';
import Game from './modules/Game.js';
import api from './modules/Services.js';

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

  fetchAllScores();
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
      fetchAllScores();
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

  if (scores.result.length > 0) {
    const highestScoringUser = scores.result
      .reduce((acc, curr) => (acc.score > curr.score ? acc : curr));
    topScorer.innerHTML = `
    <span>${highestScoringUser.user}</span>
    <span>${highestScoringUser.score} pts</span>
  `;
  } else {
    topScorer.innerHTML = `
    <p class="mb-0">No Score available yet</p>
  `;
  }

  scoreList.innerHTML = scores.result
    .map(
      (score, index) => `
      <li class="score-item list-group-item d-flex justify-content-between align-items-center">
        <span>
          ${index + 1}
        </span>
       ${score.user}<span class="badge bg-primary rounded-pill">${
  score.score
}</span></li>`,
    )
    .join('');

  scoreList.style.display = 'block';
};
