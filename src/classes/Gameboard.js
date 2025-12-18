import { Ship } from "./Ship";

export class Gameboard {
    constructor() {
        this.board = this._generateBoard();
        this.ships = [];
    }

    _generateBoard() {
        return [...Array(10)].map(() => [...Array(10)].map(() => {
            return { ship: null, hit: false }
        }));
    }

    _outOfBounds(coords, length, orientation) {
        const [x, y] = coords;

        if (orientation === "horizontal" && y + length > 10) return true;
        if (orientation === "vertical" && x + length > 10) return true;

        return false;
    }

    _isNearAnotherShip(coords, length, orientation) {
        const [x, y] = coords;

        for (let i = 0; i < length; i++) {
            const currentX = orientation === "vertical" ? x + i : x;
            const currentY = orientation === "horizontal" ? y + i : y;

            // Check a 1-tile buffer around the current cell
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const checkX = currentX + dx;
                    const checkY = currentY + dy;

                    if (checkX >= 0 && checkX < 10 && checkY >= 0 && checkY < 10) {
                        if (this.board[checkX][checkY].ship !== null) {
                            return true; // Another ship is nearby
                        }
                    }
                }
            }
        }

        return false;
    }

    placeShip(length, coords, orientation = "horizontal") {
        const ship = new Ship(length);

        const [x, y] = coords;

        if (this._outOfBounds(coords, length, orientation)) {
            return false;
        }
        if (this._isNearAnotherShip(coords, length, orientation)) return false

        for (let i = 0; i < ship.length; i++) {
            if (orientation === "horizontal") {
                this.board[x][y + i].ship = ship;
            } else {
                this.board[x + i][y].ship = ship;
            }
        }

        this.ships.push(ship);
        return true;
    }

    receiveAttack(coords) {
        const [x, y] = coords;
        const cell = this.board[x][y]

        if (cell.hit) {
            return false;
        }

        cell.hit = true;

        if (cell.ship instanceof Ship) {
            cell.ship.hit();

            if (cell.ship.sunk) {
                const index = this.ships.findIndex((s) => s === cell.ship)
                if (index !== -1) this.ships.splice(index, 1);
            }
        }

        return true;
    }

    hasLost() {
        return this.ships.length === 0;
    }
}
