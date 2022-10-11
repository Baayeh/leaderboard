/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-await */
// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

class Services {
  // /games/
  static createGame = async (game) =>
    await fetch(`${BASE_URL}games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });

  // /games/:id/scores/
  static getScores = async (id) => await fetch(`${BASE_URL}games/${id}/scores`);

  // /games/:id/scores/
  static createGameScore = async (id, userScore) =>
    await fetch(`${BASE_URL}games/${id}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userScore),
    });
}

export default Services;
