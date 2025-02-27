import "./styles.css";
import Player from "../classes/Player.js";
import createBoard from "../modules/createBoard.js";
import spawnShips from "../modules/spawnShips.js";

const player = new Player('Bob');
const ai = new Player('ai');
const container = document.querySelector("#container");
const playerboard = player.gameboard.gameboard;
const aiboard = ai.gameboard.gameboard;

const playerContainer = document.createElement("div");
playerContainer.id = "player-container";

const aiContainer = document.createElement("div");
aiContainer.id = "ai-container";

let currentTurn = "player";

(function init() {
  spawnShips(player);
  spawnShips(ai);
  createBoard(playerContainer, playerboard, player.name);
  createBoard(aiContainer, aiboard, ai.name);

  container.append(playerContainer, aiContainer);
})()  

aiContainer.addEventListener("click", (e) => {
  const dataSet = e.target.getAttribute("data-set");
  if (!dataSet) return;

  const [row, col] = dataSet.split("-").map(Number); 

  if (
    ai.gameboard.gameboard[row][col] === "X" ||
    ai.gameboard.gameboard[row][col] === "HIT"
  ) {
    return; 
  }

  ai.gameboard.receiveAttack([row, col]);

  checkGameOver();
  switchTurn();
  createBoard(aiContainer, aiboard, ai.name);
});

function switchTurn() {
  currentTurn = currentTurn === "player" ? "ai" : "player";

  if (currentTurn === "ai") {
    aiAttack();
  }
};

function aiAttack() {
  let validAttack = false;

  while (!validAttack) {
    const row = getRandomInt(0, 9);
    const col = getRandomInt(0, 9);

    if (player.gameboard.gameboard[row][col] !== "X" && player.gameboard.gameboard[row][col] !== "HIT") {
      player.gameboard.receiveAttack([row, col]);
      validAttack = true;
    }
  }

  checkGameOver();
  switchTurn();
  createBoard(playerContainer, player.gameboard.gameboard, player.name);
}

function checkGameOver() {
  if (player.gameboard.gameOver) {
    alert("Game Over! AI Wins!");
  } else if (ai.gameboard.gameOver) {
    alert("Game Over! Player Wins!");
  }
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}