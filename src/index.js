import "./styles.css";
import { createGame } from "./modules/gameController";
import { renderBoard } from "./modules/ui";
import { bindBoardEvents } from "./modules/domEvents";

const boards = document.querySelector(".boards");
const playerBoard = document.createElement("div");
const computerBoard = document.createElement("div");

playerBoard.className = "player-board";
computerBoard.className = "computer-board";

boards.append(playerBoard, computerBoard);

const game = createGame();
game.setupBoards();

renderBoard(game.player.gameboard, playerBoard);
renderBoard(game.computer.gameboard, computerBoard, { hideShips: true });

bindBoardEvents(computerBoard, game, true);
