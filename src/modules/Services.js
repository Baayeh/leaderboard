/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-return-await */
// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

class API {
  // /games/
  static createGame = async (game) => {
    const res = await fetch(`${BASE_URL}games`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game),
    });
    return await res.json();
  };

  // /games/:id/scores/
  static getScores = async (id) => {
    const res = await fetch(`${BASE_URL}games/${id}/scores`);
    return await res.json();
  };

  // /games/:id/scores/
  static createGameScore = async (id, userScore) => {
    const res = await fetch(`${BASE_URL}games/${id}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userScore),
    });
    return await res.json();
  };
}

export default API;
