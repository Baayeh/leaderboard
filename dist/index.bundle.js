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
      _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.style.display = 'block';
      _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.innerHTML = res;
      setTimeout(() => {
        _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.msg.remove();
      }, 5000);
      _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.form.reset();
      fetchAllScores();
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
    _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.scoreList.innerHTML = scores
      .map(
        (
          score,
        ) => `<li class="score-item list-group-item d-flex justify-content-between align-items-center">
        ${score.user}
    <span class="badge bg-primary rounded-pill">${score.score}</span>
  </li>`,
      )
      .join('');
  });
  _modules_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__.scoreList.style.display = 'block';
};

fetchAllScores();


/***/ }),

/***/ "./src/modules/DOMElements.js":
/*!************************************!*\
  !*** ./src/modules/DOMElements.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "form": () => (/* binding */ form),
/* harmony export */   "msg": () => (/* binding */ msg),
/* harmony export */   "refreshBtn": () => (/* binding */ refreshBtn),
/* harmony export */   "scoreList": () => (/* binding */ scoreList),
/* harmony export */   "submitBtn": () => (/* binding */ submitBtn)
/* harmony export */ });
/* eslint-disable object-curly-newline */
const refreshBtn = document.querySelector('.refresh');
const submitBtn = document.querySelector('.add-btn');
const form = document.querySelector('.form');
const scoreList = document.querySelector('.score-list');
const msg = document.querySelector('.message');




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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFHa0M7QUFDMkM7O0FBRTdFLHNCQUFzQixrRUFBYTs7QUFFbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsa0VBQVU7O0FBRWxCLDBFQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGdFQUFRO0FBQ1Y7QUFDQTtBQUNBLE1BQU0sc0VBQWlCO0FBQ3ZCLE1BQU0sa0VBQWE7QUFDbkI7QUFDQSxRQUFRLCtEQUFVO0FBQ2xCLE9BQU87QUFDUCxNQUFNLCtEQUFVO0FBQ2hCO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQSxnRkFBMkI7QUFDM0I7QUFDQSxFQUFFLDRFQUF1QjtBQUN6QixDQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFFLG9FQUFZO0FBQ2Q7QUFDQSxJQUFJLHdFQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixrREFBa0QsWUFBWTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRSw0RUFBdUI7QUFDekI7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUV1RDs7Ozs7Ozs7Ozs7Ozs7O0FDUHZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1BwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0EsaUJBQWlCLG9DQUFvQztBQUNyRDtBQUNBLEtBQUs7O0FBRUw7QUFDQSxrREFBa0QsU0FBUyxRQUFRLEdBQUc7O0FBRXRFO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUyxRQUFRLEdBQUc7QUFDdkM7QUFDQSxpQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNCeEI7QUFDQTtBQUNBO0FBQ2dDO0FBQ0g7O0FBRTdCO0FBQ0EsRUFBRSwrREFBYztBQUNoQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsZ0RBQUk7QUFDbkM7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUksb0VBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSw4REFBYTtBQUNqQjtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFOEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzIiwid2VicGFjazovL2xlYWRlcmJvYXJkLy4vc3JjL21vZHVsZXMvR2FtZS5qcyIsIndlYnBhY2s6Ly9sZWFkZXJib2FyZC8uL3NyYy9tb2R1bGVzL1NlcnZpY2VzLmpzIiwid2VicGFjazovL2xlYWRlcmJvYXJkLy4vc3JjL21vZHVsZXMvbWlkZGxld2FyZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXG5pbXBvcnQge1xuICByZWZyZXNoQnRuLCBmb3JtLCBzY29yZUxpc3QsIG1zZyxcbn0gZnJvbSAnLi9tb2R1bGVzL0RPTUVsZW1lbnRzLmpzJztcbmltcG9ydCB7IENyZWF0ZUdhbWUsIGFkZFNjb3JlLCBnZXRBbGxTY29yZXMgfSBmcm9tICcuL21vZHVsZXMvbWlkZGxld2FyZS5qcyc7XG5cbmNvbnN0IFtuYW1lLCBzY29yZV0gPSBmb3JtLmVsZW1lbnRzO1xuXG5jb25zdCBnYW1lID0ge1xuICBuYW1lOiAnSG91c2Ugb2YgRHJhZ29ucycsXG59O1xuXG4vLyBDcmVhdGUgYSBuZXcgZ2FtZVxuY29uc3QgZGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUnKSk7XG4vLyBydW4gZnVuY3Rpb24gaWYgZGF0YSBpcyBudWxsXG5kYXRhID8/IENyZWF0ZUdhbWUoZ2FtZSk7XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCB1c2VyU2NvcmUgPSB7XG4gICAgdXNlcjogbmFtZS52YWx1ZSxcbiAgICBzY29yZTogTnVtYmVyKHNjb3JlLnZhbHVlKSxcbiAgfTtcbiAgY29uc3QgZ2FtZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2dhbWUnKSk7XG4gIGFkZFNjb3JlKGdhbWUuaWQsIHVzZXJTY29yZSlcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBtc2cuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBtc2cuaW5uZXJIVE1MID0gcmVzO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIG1zZy5yZW1vdmUoKTtcbiAgICAgIH0sIDUwMDApO1xuICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgZmV0Y2hBbGxTY29yZXMoKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBHZXQgYWxsIHNjb3Jlc1xucmVmcmVzaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgZmV0Y2hBbGxTY29yZXMoKTtcbiAgc2NvcmVMaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSk7XG5cbmNvbnN0IGZldGNoQWxsU2NvcmVzID0gKCkgPT4ge1xuICBjb25zdCBnYW1lID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ2FtZScpKTtcbiAgZ2V0QWxsU2NvcmVzKGdhbWUuaWQpLnRoZW4oKHJlcykgPT4ge1xuICAgIGNvbnN0IHNjb3JlcyA9IHJlcztcbiAgICBzY29yZUxpc3QuaW5uZXJIVE1MID0gc2NvcmVzXG4gICAgICAubWFwKFxuICAgICAgICAoXG4gICAgICAgICAgc2NvcmUsXG4gICAgICAgICkgPT4gYDxsaSBjbGFzcz1cInNjb3JlLWl0ZW0gbGlzdC1ncm91cC1pdGVtIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgJHtzY29yZS51c2VyfVxuICAgIDxzcGFuIGNsYXNzPVwiYmFkZ2UgYmctcHJpbWFyeSByb3VuZGVkLXBpbGxcIj4ke3Njb3JlLnNjb3JlfTwvc3Bhbj5cbiAgPC9saT5gLFxuICAgICAgKVxuICAgICAgLmpvaW4oJycpO1xuICB9KTtcbiAgc2NvcmVMaXN0LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufTtcblxuZmV0Y2hBbGxTY29yZXMoKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG9iamVjdC1jdXJseS1uZXdsaW5lICovXG5jb25zdCByZWZyZXNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlZnJlc2gnKTtcbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtYnRuJyk7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0nKTtcbmNvbnN0IHNjb3JlTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZS1saXN0Jyk7XG5jb25zdCBtc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZScpO1xuXG5leHBvcnQgeyByZWZyZXNoQnRuLCBzdWJtaXRCdG4sIGZvcm0sIHNjb3JlTGlzdCwgbXNnIH07XG4iLCJjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IobmFtZSwgaWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiLyogZXNsaW50LWRpc2FibGUgaW1wbGljaXQtYXJyb3ctbGluZWJyZWFrICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1yZXR1cm4tYXdhaXQgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBvcGVyYXRvci1saW5lYnJlYWtcbmNvbnN0IEJBU0VfVVJMID1cbiAgJ2h0dHBzOi8vdXMtY2VudHJhbDEtanMtY2Fwc3RvbmUtYmFja2VuZC5jbG91ZGZ1bmN0aW9ucy5uZXQvYXBpLyc7XG5cbmNsYXNzIFNlcnZpY2VzIHtcbiAgLy8gL2dhbWVzL1xuICBzdGF0aWMgY3JlYXRlR2FtZSA9IGFzeW5jIChnYW1lKSA9PlxuICAgIGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfWdhbWVzYCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGdhbWUpLFxuICAgIH0pO1xuXG4gIC8vIC9nYW1lcy86aWQvc2NvcmVzL1xuICBzdGF0aWMgZ2V0U2NvcmVzID0gYXN5bmMgKGlkKSA9PiBhd2FpdCBmZXRjaChgJHtCQVNFX1VSTH1nYW1lcy8ke2lkfS9zY29yZXNgKTtcblxuICAvLyAvZ2FtZXMvOmlkL3Njb3Jlcy9cbiAgc3RhdGljIGNyZWF0ZUdhbWVTY29yZSA9IGFzeW5jIChpZCwgdXNlclNjb3JlKSA9PlxuICAgIGF3YWl0IGZldGNoKGAke0JBU0VfVVJMfWdhbWVzLyR7aWR9L3Njb3Jlc2AsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VyU2NvcmUpLFxuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTZXJ2aWNlcztcbiIsIi8qIGVzbGludC1kaXNhYmxlIGltcGxpY2l0LWFycm93LWxpbmVicmVhayAqL1xuLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydCAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cbmltcG9ydCBBUEkgZnJvbSAnLi9TZXJ2aWNlcy5qcyc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL0dhbWUuanMnO1xuXG5jb25zdCBDcmVhdGVHYW1lID0gKGdhbWUpID0+IHtcbiAgQVBJLmNyZWF0ZUdhbWUoZ2FtZSkudGhlbigocmVzKSA9PiB7XG4gICAgcmVzLmpzb24oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zdCBzcGxpdCA9IGRhdGEucmVzdWx0LnNwbGl0KCcgJyk7XG4gICAgICBjb25zdCBpZCA9IHNwbGl0WzNdO1xuICAgICAgY29uc3QgZ2FtZUluc3RhbmNlID0gbmV3IEdhbWUoZ2FtZS5uYW1lLCBpZCk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ2FtZScsIEpTT04uc3RyaW5naWZ5KGdhbWVJbnN0YW5jZSkpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8vIEFkZCBTY29yZVxuY29uc3QgYWRkU2NvcmUgPSAoaWQsIHNjb3JlKSA9PiB7XG4gIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgQVBJLmNyZWF0ZUdhbWVTY29yZShpZCwgc2NvcmUpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgcmVzXG4gICAgICAgIC5qc29uKClcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIEdldCBTY29yZXNcbmNvbnN0IGdldEFsbFNjb3JlcyA9IChpZCkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBBUEkuZ2V0U2NvcmVzKGlkKS50aGVuKChyZXMpID0+IHtcbiAgICAgIHJlcy5qc29uKCkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICByZXNvbHZlKGRhdGEucmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5leHBvcnQgeyBDcmVhdGVHYW1lLCBhZGRTY29yZSwgZ2V0QWxsU2NvcmVzIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=