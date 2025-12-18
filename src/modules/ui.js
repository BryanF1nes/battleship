export const renderBoard = (gameboard, container, { hideShips = false } = {}) => {
    container.innerHTML = "";

    gameboard.board.forEach((row, x) => {
        row.forEach((cell, y) => {
            const div = document.createElement("div");
            div.className = "cell";
            div.dataset.x = x;
            div.dataset.y = y;

            if (cell.ship && !cell.hit && !hideShips) {
                div.classList.add("ship");
            }

            if (cell.hit && cell.ship) {
                div.classList.add("hit");
                if (cell.ship.sunk) div.classList.add("sunk");
            }

            if (cell.hit && !cell.ship) {
                div.classList.add("miss");
            }

            container.appendChild(div);
        });
    });
};
