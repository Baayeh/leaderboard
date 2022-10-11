/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import { refreshBtn, form, scoreList } from './modules/DOMElements.js';
import { CreateGame, addScore, getAllScores } from './modules/middleware.js';

const [name, score] = form.elements;

const game = {
  name: 'House of Dragons',
};

// Create a new game
const data = JSON.parse(localStorage.getItem('game'));
// run function if data is null
data ?? CreateGame(game);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userScore = {
    user: name.value,
    score: Number(score.value),
  };
  const game = JSON.parse(localStorage.getItem('game'));
  addScore(game.id, userScore)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      form.reset();
    });
});

// Get all scores
refreshBtn.addEventListener('click', () => {
  fetchAllScores();
  scoreList.style.display = 'block';
});

const fetchAllScores = () => {
  const game = JSON.parse(localStorage.getItem('game'));
  getAllScores(game.id).then((res) => {
    const scores = res;
    scoreList.innerHTML = '';
    scores.forEach((score) => {
      const li = `<li class="score-item">
                  <span class="name">${score.user}: </span>
                  <span class="score">${score.score}</span>
                </li>`;
      scoreList.innerHTML += li;
    });
  });
};
