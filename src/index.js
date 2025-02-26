import "./styles.css";
import Player from "../classes/Player.js";
import createBoard from "../modules/createBoard.js";
import playerBoard from "../modules/playerBoard.js";

const player = new Player();
const container = document.querySelector("#container");
const gameboard = player.gameboard.gameboard;

playerBoard(player);
createBoard(container, gameboard);

container.addEventListener("click", (e) => {
  const dataSet = e.target.getAttribute("data-set");
  const [x, y] = dataSet.split("").map(Number);

  if (!dataSet) return;

  if (
    player.gameboard.gameboard[x][y] === "X" ||
    player.gameboard.gameboard[y][x] === "HIT" ||
    player.gameboard.gameboard[y][x] === "SUNK"
  ) {
    return;
  }

  player.gameboard.receiveAttack([x, y]);
  createBoard(container, gameboard);
});
