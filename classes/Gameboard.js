const Ship = require('./Ship.js');

class Gameboard {
    constructor() {
        this.gameboard = Array(10).fill().map(() => Array(10).fill(0));
    };

    placeShip([row, col], length, orientiaton) {
        const ship = new Ship(length);

        // If [row, col] === ship return message
        const message = ['Out of bounds', 'Ship is already placed here'];

        for (let i = 0; i < ship.length; i++) {
            if (this.gameboard[row][col + i] !== 0 ||
                this.gameboard[row + i][col] !== 0
            ) {
                return message[1];
            }
        }

        if (ship.length + col >= 10) return message[0];
        if (ship.length + row >= 10) return message[0];

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
    };

    receiveAttack([row, col]) {
        return;
    };
};

module.exports = Gameboard;