import { renderBoard } from "./ui";

export const bindBoardEvents = (container, game, isComputerBoard = false) => {
    container.addEventListener("click", (e) => {
        const cell = e.target;
        if (!cell.classList.contains("cell")) return;

        if (!isComputerBoard) return; // player can't click own board

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        const success = game.attack(x, y);
        if (!success) return;

        renderBoard(game.player.gameboard, document.querySelector(".player-board"));
        renderBoard(game.computer.gameboard, document.querySelector(".computer-board"), {
            hideShips: true,
        });
    });
};
