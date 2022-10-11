/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import API from './Services.js';
import Game from './Game.js';

const CreateGame = (game) => {
  API.createGame(game).then((res) => {
    res.json().then((data) => {
      const split = data.result.split(' ');
      const id = split[3];
      const gameInstance = new Game(game.name, id);
      localStorage.setItem('game', JSON.stringify(gameInstance));
    });
  });
};

// Add Score
const addScore = (id, score) => {
  const promise = new Promise((resolve, reject) => {
    API.createGameScore(id, score).then((res) => {
      res
        .json()
        .then((data) => {
          resolve(data.result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
  return promise;
};

// Get Scores
const getAllScores = (id) => {
  // eslint-disable-next-line no-unused-vars
  const promise = new Promise((resolve, reject) => {
    API.getScores(id).then((res) => {
      res.json().then((data) => {
        resolve(data.result);
      });
    });
  });
  return promise;
};

export { CreateGame, addScore, getAllScores };
