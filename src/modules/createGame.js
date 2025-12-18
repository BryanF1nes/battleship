import { Player } from "../classes/Player";

export const createGame = (() => {
    const player = new Player();
    const computer = new Player();

    const boards = document.querySelector(".boards");
    const playerBoard = document.createElement("div");
    playerBoard.className = "player-board";

    const computerBoard = document.createElement("div");
    computerBoard.className = "computer-board";

    const init = () => {
        boards.appendChild(playerBoard);
        boards.appendChild(computerBoard);
        player.gameboard.placeShip(3, [0, 4]);
        player.gameboard.placeShip(5, [2, 1], "vertical");
        player.gameboard.placeShip(3, [4, 9], "vertical");
        player.gameboard.placeShip(4, [7, 3]);
        player.gameboard.placeShip(2, [9, 3]);

        render(player.gameboard, playerBoard);
        render(computer.gameboard, computerBoard);
    }

    return { player, computer, init }
})()

export const render = (board, container) => {
    container.innerHTML = ""

    board.board.forEach((row, x) => {
        row.forEach((col, y) => {
            const div = document.createElement("div");
            div.className = "cell";
            div.dataset.x = x;
            div.dataset.y = y;

            if (col.ship !== null && !col.hit) {
                div.classList.add("ship");
            }

            if (col.hit && col.ship !== null) {
                div.classList.add("hit");

                if (col.ship.sunk) {
                    div.classList.add("sunk");
                }
            }

            if (col.hit && col.ship === null) {
                div.classList.add("miss");
            }

            div.addEventListener("click", () => {
                if (col.hit) return;
                board.receiveAttack([x, y]);
                render(board, container);
            });

            container.appendChild(div);
        })
    })
}

