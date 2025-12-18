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

    placeShip(length, coords, orientation = "horizontal") {
        const ship = new Ship(length);

        const [x, y] = coords;

        if (this._outOfBounds(coords, length, orientation)) {
            return false;
        }

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

        if (this.board[x][y].hit) {
            return false;
        }

        this.board[x][y].hit = true;

        if (this.board[x][y].ship instanceof Ship) {
            const ship = this.board[x][y].ship;
            ship.hit();

            if (ship.sunk) {
                const index = this.ships.findIndex((s) => s.sunk === true ? s : undefined)
                this.ships.splice(index, 1);
                return false;
            }
            return true;
        }
    }
}
