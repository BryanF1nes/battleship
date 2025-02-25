// const Ship = require('./Ship.js');
import Ship from './Ship.js';

class Gameboard {
    constructor() {
        this.gameboard = Array(10).fill().map(() => Array(10).fill(0));
        this.gameOver = false;
        this.ships = 0;
    };

    placeShip([row, col], length, orientiaton) {
        const ship = new Ship(length);

        // If [row, col] === ship return message
        const message = ['Out of bounds', 'Ship is already placed here'];

        if (orientiaton === "horizontal" && ship.length + col > 10) return message[0];
        if (orientiaton === "vertical" && ship.length + row > 10) return message[0];

        for (let i = 0; i < ship.length; i++) {
            if (orientiaton === "horizontal" && this.gameboard[row][col + i] !== 0) {
                return message[1];
            }
            if (orientiaton === "vertical" && this.gameboard[row + i][col] !== 0) {
                return message[1];
            }
        }
        

        if (orientiaton === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                this.gameboard[row][col + i] = ship;
            }
        }

        if (orientiaton === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                this.gameboard[row + i][col] = ship;
            }
        }

        this.ships++;
    };

    receiveAttack([row, col]) {
        if (this.gameboard[row][col] !== 0 && this.gameboard[row][col] !== 'X') {
            const ship = this.gameboard[row][col];
            ship.hit();
            if (ship.isSunk()) {
                this.ships--;
                if (this.ships === 0) {
                    return this.gameOver = true;
                }
            }
            return this.gamemeOver = false;
        }
        this.gameboard[row][col] = 'X';
    };
};

// module.exports = Gameboard;
export default Gameboard;