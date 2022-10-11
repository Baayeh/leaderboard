"use strict";
(self["webpackChunkleaderboard"] = self["webpackChunkleaderboard"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/DOMElements.js */ "./src/modules/DOMElements.js");
/* harmony import */ var _modules_middleware_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/middleware.js */ "./src/modules/middleware.js");
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */



const [name, score] = _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.form.elements;

const game = {
  name: 'House of Dragons',
};

// Create a new game
const data = JSON.parse(localStorage.getItem('game'));
// run function if data is null
data ?? (0,_modules_middleware_js__WEBPACK_IMPORTED_MODULE_1__.CreateGame)(game);

_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userScore = {
    user: name.value,
    score: Number(score.value),
  };
  const game = JSON.parse(localStorage.getItem('game'));
  (0,_modules_middleware_js__WEBPACK_IMPORTED_MODULE_1__.addScore)(game.id, userScore)
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.form.reset();
    });
});

// Get all scores
_modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.refreshBtn.addEventListener('click', () => {
  fetchAllScores();
  _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.scoreList.style.display = 'block';
});

const fetchAllScores = () => {
  const game = JSON.parse(localStorage.getItem('game'));
  (0,_modules_middleware_js__WEBPACK_IMPORTED_MODULE_1__.getAllScores)(game.id).then((res) => {
    const scores = res;
    _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.scoreList.innerHTML = '';
    scores.forEach((score) => {
      const li = `<li class="score-item">
                  <span class="name">${score.user}: </span>
                  <span class="score">${score.score}</span>
                </li>`;
      _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.scoreList.innerHTML += li;
    });
  });
};


/***/ }),

/***/ "./src/modules/DOMElements.js":
/*!************************************!*\
  !*** ./src/modules/DOMElements.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "form": () => (/* binding */ form),
/* harmony export */   "refreshBtn": () => (/* binding */ refreshBtn),
/* harmony export */   "scoreList": () => (/* binding */ scoreList),
/* harmony export */   "submitBtn": () => (/* binding */ submitBtn)
/* harmony export */ });
/* eslint-disable object-curly-newline */
const refreshBtn = document.querySelector('.refresh');
const submitBtn = document.querySelector('.add-btn');
const form = document.querySelector('.form');
const scoreList = document.querySelector('.score-list');




/***/ }),

/***/ "./src/modules/Game.js":
/*!*****************************!*\
  !*** ./src/modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Game {
  constructor(name, id) {
    this.id = id;
    this.name = name;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/modules/Services.js":
/*!*********************************!*\
  !*** ./src/modules/Services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Services);


/***/ }),

/***/ "./src/modules/middleware.js":
/*!***********************************!*\
  !*** ./src/modules/middleware.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CreateGame": () => (/* binding */ CreateGame),
/* harmony export */   "addScore": () => (/* binding */ addScore),
/* harmony export */   "getAllScores": () => (/* binding */ getAllScores)
/* harmony export */ });
/* harmony import */ var _Services_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Services.js */ "./src/modules/Services.js");
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game.js */ "./src/modules/Game.js");
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */



const CreateGame = (game) => {
  _Services_js__WEBPACK_IMPORTED_MODULE_0__["default"].createGame(game).then((res) => {
    res.json().then((data) => {
      const split = data.result.split(' ');
      const id = split[3];
      const gameInstance = new _Game_js__WEBPACK_IMPORTED_MODULE_1__["default"](game.name, id);
      localStorage.setItem('game', JSON.stringify(gameInstance));
    });
  });
};

// Add Score
const addScore = (id, score) => {
  const promise = new Promise((resolve, reject) => {
    _Services_js__WEBPACK_IMPORTED_MODULE_0__["default"].createGameScore(id, score).then((res) => {
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
    _Services_js__WEBPACK_IMPORTED_MODULE_0__["default"].getScores(id).then((res) => {
      res.json().then((data) => {
        resolve(data.result);
      });
    });
  });
  return promise;
};




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDdUU7QUFDTTs7QUFFN0Usc0JBQXNCLGtFQUFhOztBQUVuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrRUFBVTs7QUFFbEIsMEVBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsZ0VBQVE7QUFDVjtBQUNBO0FBQ0EsTUFBTSwrREFBVTtBQUNoQixLQUFLO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBLGdGQUEyQjtBQUMzQjtBQUNBLEVBQUUsNEVBQXVCO0FBQ3pCLENBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUUsb0VBQVk7QUFDZDtBQUNBLElBQUksd0VBQW1CO0FBQ3ZCO0FBQ0E7QUFDQSx1Q0FBdUMsV0FBVztBQUNsRCx3Q0FBd0MsWUFBWTtBQUNwRDtBQUNBLE1BQU0sd0VBQW1CO0FBQ3pCLEtBQUs7QUFDTCxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVrRDs7Ozs7Ozs7Ozs7Ozs7O0FDTmxEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1BwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBLEtBQUs7O0FBRUw7QUFDQSxrREFBa0QsU0FBUyxRQUFRLEdBQUc7O0FBRXRFO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUyxRQUFRLEdBQUc7QUFDdkM7QUFDQSxpQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCeEI7QUFDQTtBQUNBO0FBQ2dDO0FBQ0g7O0FBRTdCO0FBQ0EsRUFBRSwrREFBYztBQUNoQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0RBQUk7QUFDbkM7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBYTtBQUNqQjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFOEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzIiwid2VicGFjazovL2xlYWRlcmJvYXJkLy4vc3JjL21vZHVsZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9tb2R1bGVzL1NlcnZpY2VzLmpzIiwid2VicGFjazovL2xlYWRlcmJvYXJkLy4vc3JjL21vZHVsZXMvbWlkZGxld2FyZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQgeyByZWZyZXNoQnRuLCBmb3JtLCBzY29yZUxpc3QgfSBmcm9tICcuL21vZHVsZXMvRE9NRWxlbWVudHMuanMnO1xuaW1wb3J0IHsgQ3JlYXRlR2FtZSwgYWRkU2NvcmUsIGdldEFsbFNjb3JlcyB9IGZyb20gJy4vbW9kdWxlcy9taWRkbGV3YXJlLmpzJztcblxuY29uc3QgW25hbWUsIHNjb3JlXSA9IGZvcm0uZWxlbWVudHM7XG5cbmNvbnN0IGdhbWUgPSB7XG4gIG5hbWU6ICdIb3VzZSBvZiBEcmFnb25zJyxcbn07XG5cbi8vIENyZWF0ZSBhIG5ldyBnYW1lXG5jb25zdCBkYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZScpKTtcbi8vIHJ1biBmdW5jdGlvbiBpZiBkYXRhIGlzIG51bGxcbmRhdGEgPz8gQ3JlYXRlR2FtZShnYW1lKTtcblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IHVzZXJTY29yZSA9IHtcbiAgICB1c2VyOiBuYW1lLnZhbHVlLFxuICAgIHNjb3JlOiBOdW1iZXIoc2NvcmUudmFsdWUpLFxuICB9O1xuICBjb25zdCBnYW1lID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZScpKTtcbiAgYWRkU2NvcmUoZ2FtZS5pZCwgdXNlclNjb3JlKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBHZXQgYWxsIHNjb3Jlc1xucmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZmV0Y2hBbGxTY29yZXMoKTtcbiAgc2NvcmVMaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSk7XG5cbmNvbnN0IGZldGNoQWxsU2NvcmVzID0gKCkgPT4ge1xuICBjb25zdCBnYW1lID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZScpKTtcbiAgZ2V0QWxsU2NvcmVzKGdhbWUuaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgIGNvbnN0IHNjb3JlcyA9IHJlcztcbiAgICBzY29yZUxpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgc2NvcmVzLmZvckVhY2goKHNjb3JlKSA9PiB7XG4gICAgICBjb25zdCBsaSA9IGA8bGkgY2xhc3M9XCJzY29yZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm5hbWVcIj4ke3Njb3JlLnVzZXJ9OiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNjb3JlXCI+JHtzY29yZS5zY29yZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5gO1xuICAgICAgc2NvcmVMaXN0LmlubmVySFRNTCArPSBsaTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgb2JqZWN0LWN1cmx5LW5ld2xpbmUgKi9cbmNvbnN0IHJlZnJlc2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVmcmVzaCcpO1xuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1idG4nKTtcbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybScpO1xuY29uc3Qgc2NvcmVMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjb3JlLWxpc3QnKTtcblxuZXhwb3J0IHsgcmVmcmVzaEJ0biwgc3VibWl0QnRuLCBmb3JtLCBzY29yZUxpc3QgfTtcbiIsImNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBpZCkge1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBpbXBsaWNpdC1hcnJvdy1saW5lYnJlYWsgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJldHVybi1hd2FpdCAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9wZXJhdG9yLWxpbmVicmVha1xuY29uc3QgQkFTRV9VUkwgPVxuICAnaHR0cHM6Ly91cy1jZW50cmFsMS1qcy1jYXBzdG9uZS1iYWNrZW5kLmNsb3VkZnVuY3Rpb25zLm5ldC9hcGkvJztcblxuY2xhc3MgU2VydmljZXMge1xuICAvLyAvZ2FtZXMvXG4gIHN0YXRpYyBjcmVhdGVHYW1lID0gYXN5bmMgKGdhbWUpID0+XG4gICAgYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9Z2FtZXNgLCB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZ2FtZSksXG4gICAgfSk7XG5cbiAgLy8gL2dhbWVzLzppZC9zY29yZXMvXG4gIHN0YXRpYyBnZXRTY29yZXMgPSBhc3luYyAoaWQpID0+IGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfWdhbWVzLyR7aWR9L3Njb3Jlc2ApO1xuXG4gIC8vIC9nYW1lcy86aWQvc2NvcmVzL1xuICBzdGF0aWMgY3JlYXRlR2FtZVNjb3JlID0gYXN5bmMgKGlkLCB1c2VyU2NvcmUpID0+XG4gICAgYXdhaXQgZmV0Y2goYCR7QkFTRV9VUkx9Z2FtZXMvJHtpZH0vc2NvcmVzYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJTY29yZSksXG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlcnZpY2VzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wbGljaXQtYXJyb3ctbGluZWJyZWFrICovXG4vKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11c2UtYmVmb3JlLWRlZmluZSAqL1xuaW1wb3J0IEFQSSBmcm9tICcuL1NlcnZpY2VzLmpzJztcbmltcG9ydCBHYW1lIGZyb20gJy4vR2FtZS5qcyc7XG5cbmNvbnN0IENyZWF0ZUdhbWUgPSAoZ2FtZSkgPT4ge1xuICBBUEkuY3JlYXRlR2FtZShnYW1lKS50aGVuKChyZXMpID0+IHtcbiAgICByZXMuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IHNwbGl0ID0gZGF0YS5yZXN1bHQuc3BsaXQoJyAnKTtcbiAgICAgIGNvbnN0IGlkID0gc3BsaXRbM107XG4gICAgICBjb25zdCBnYW1lSW5zdGFuY2UgPSBuZXcgR2FtZShnYW1lLm5hbWUsIGlkKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdnYW1lJywgSlNPTi5zdHJpbmdpZnkoZ2FtZUluc3RhbmNlKSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gQWRkIFNjb3JlXG5jb25zdCBhZGRTY29yZSA9IChpZCwgc2NvcmUpID0+IHtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBBUEkuY3JlYXRlR2FtZVNjb3JlKGlkLCBzY29yZSkudGhlbigocmVzKSA9PiB7XG4gICAgICByZXNcbiAgICAgICAgLmpzb24oKVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gR2V0IFNjb3Jlc1xuY29uc3QgZ2V0QWxsU2NvcmVzID0gKGlkKSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIEFQSS5nZXRTY29yZXMoaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmVzLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIHJlc29sdmUoZGF0YS5yZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbmV4cG9ydCB7IENyZWF0ZUdhbWUsIGFkZFNjb3JlLCBnZXRBbGxTY29yZXMgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==