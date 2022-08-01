'use strict';

//selecting elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

//hide Dice image
diceEl.classList.add('hidden');

let playing, scores, currentScore, activePlayer;

//initialize variables/reset game
const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  current0El.textContent = 0;
  score0El.textContent = 0;
  current1El.textContent = 0;
  score1El.textContent = 0;

  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add('hidden');
};

init();

//switch to next player
const switchPlayer = function () {
  //checks if the active player is 0, if it is, switch to player 1, if not switch to player 0
  activePlayer = activePlayer === 0 ? 1 : 0;

  // 'toggle' checks if any of these 2 elements are using 'player--active' class
  // it basically switches the 'player--active' class to the new active player (background color, font)
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//when you click on Roll button
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generates a random number between 1 and 6
    let dice = Math.floor(Math.random() * 6) + 1;
    console.log(dice);
    if (diceEl.classList.contains('hidden')) {
      diceEl.classList.remove('hidden');
    }

    //shows the right dice image for the dice number
    diceEl.src = `dice-${dice}.png`;

    //checks if the dice number is different than 1
    if (dice !== 1) {
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // this only happens when the dice number is 1

      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      switchPlayer();
    }
  }
});

//when you click on Hold button
btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  currentScore = 0;

  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  if (scores[activePlayer] >= 10) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .getElementById(`name--${activePlayer}`)
      .classList.add('player-winner');
    //alert(`Player ${activePlayer + 1} won!! `);
    ////btnHold.classList.add('hidden');
    //btnRoll.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

//when you click on New button
btnNew.addEventListener('click', function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .getElementById(`name--${activePlayer}`)
    .classList.remove('player-winner');
  init();
});
