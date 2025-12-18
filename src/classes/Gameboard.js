import { Ship } from "./Ship";

export class Gameboard {
    constructor() {
        this.board = this._generateBoard();
    }

    _generateBoard() {
        return [...Array(10)].map(() => [...Array(10)].map(() => {
            return { ship: null, hit: false }
        }));
    }

    _outOfBounds(coords, length) {
        const [x, y] = coords;

        if (x + length > 10 || y + length > 10) {
            return true;
        }

        return false;
    }

    placeShip(length, coords, orientation = "horizontal") {
        const ship = new Ship(length);

        const [x, y] = coords;

        if (this._outOfBounds(coords, length)) {
            return false;
        }

        for (let i = 0; i < ship.length; i++) {
            if (orientation === "horizontal") {
                this.board[x][y + i].ship = ship;
            } else {
                this.board[x + i][y].ship = ship;
            }
        }

        return true;
    }
}
