import { renderBoard } from "./ui";

export const bindBoardEvents = (container, game, isComputerBoard = false) => {
    const playerBoard = document.querySelector(".player-board");
    const computerBoard = document.querySelector(".computer-board");

    container.addEventListener("click", (e) => {
        const cell = e.target;
        if (!cell.classList.contains("cell")) return;

        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);

        if (game.isPlacing()) {
            const placed = game.placeShipAt(x, y);
            if (!placed) return;

            renderBoard(game.player.gameboard,);
            updatePlacementStatus(game)
            return;
        }

        if (!isComputerBoard) return;

        const success = game.attack(x, y);
        if (!success) return;

        renderBoard(game.player.gameboard, playerBoard);
        renderBoard(game.computer.gameboard, computerBoard, {
            hideShips: true,
        });

        updatePlacementStatus(game)

        const winner = game.checkGameOver();
        if (winner) {
            alert(`${winner.name} wins!`);
            return;
        }

        setTimeout(() => {
            const [cx, cy] = game.computer.getRandomAttack();
            game.attack(cx, cy);

            renderBoard(game.player.gameboard, playerBoard)
            updatePlacementStatus(game)

            const winner = game.checkGameOver();
            if (winner) {
                alert(`${winner.name} wins!`);
                return;
            }
        }, 500)
    });
};

const status = document.getElementById("placement-status");

export const updatePlacementStatus = (game) => {
    if (game.isPlacing()) {
        status.textContent = `Placing ship of length ${game.getCurrentShipLength()} (${game.getOrientation()})`;
    } else if (game.getCurrentPlayer() === game.player) {
        status.textContent = "Your turn: Click the computer board to attack!";
    } else {
        status.textContent = "Computer is thinking...";
    }
};


export const bindGlobalEvents = (game) => {
    document.addEventListener("keydown", (e) => {
        if (e.key === "r") {
            game.rotateShip();
            updatePlacementStatus(game);
        }
    });
};
