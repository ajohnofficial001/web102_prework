/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */
import GAMES_DATA from "./games.js";

const GAMES_JSON = JSON.parse(GAMES_DATA);
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
  for (let index = 0; index < games.length; index++) {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");
    gameCard.innerHTML = `
      <img  src=${games[index].img} class="game-img" alt=${games[index].name} /> <br/>
      <p>${games[index].description} goal: ${games[index].goal}</p> 
    `;
    gamesContainer.appendChild(gameCard);
  }
}
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

const contributionsCard = document.getElementById("num-contributions");
let sum = GAMES_JSON.reduce(function (acc, backer) {
  return acc + backer.backers;
}, 0);
contributionsCard.innerHTML = `${sum.toLocaleString("en-US")}`;

const raisedCard = document.getElementById("total-raised");
let pledgedSum = GAMES_JSON.reduce(function (acc, pledge) {
  return acc + pledge.pledged;
}, 0);
raisedCard.innerHTML = `$${pledgedSum.toLocaleString("en-US")}`;
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

function filterUnfundedOnly() {
  const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  deleteChildElements(gamesContainer);
  addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
  const fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  deleteChildElements(gamesContainer);
  addGamesToPage(fundedGames);
}

function showAllGames() {
  const showAll = GAMES_JSON.filter((game) => {
    return game.pledged > 0;
  });
  deleteChildElements(gamesContainer);
  addGamesToPage(showAll);
}

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

const descriptionContainer = document.getElementById("description-container");

const unfunded = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});
const displayStr = document.createElement("p");
displayStr.innerHTML = `A total of $${pledgedSum.toLocaleString(
  "en-US"
)} has been raised for 11 games. Currently, ${
  unfunded.length < 1 ? "all games are funded" : unfunded.length
} games remain unfunded.
We need your help to fund this amazing games!
`;
descriptionContainer.appendChild(displayStr);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});
const [one, two, ...rest] = sortedGames;
const winner = document.createElement("p");
const secondRunner = document.createElement("p");
winner.innerHTML = one.name;
firstGameContainer.appendChild(winner);

secondRunner.innerHTML = two.name;
secondGameContainer.appendChild(secondRunner);

//Implementing Search Field
const searchField = document.getElementById("search-field");
searchField.addEventListener("input", () => {
  const filteredGames = GAMES_JSON.filter((game) =>
    game.name.includes(searchField.value)
  );
  // console.log(filteredGames);
  deleteChildElements(gamesContainer);
  addGamesToPage(filteredGames);
});
