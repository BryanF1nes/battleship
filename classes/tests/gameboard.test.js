const Gameboard = require('../Gameboard.js');

test('Gameboard, place a ship at a given coordinate. E.G - [3, 4]', () => {
    const gameboard = new Gameboard();
    
    gameboard.placeShip([3, 4], 4, "horizontal")
    expect(gameboard.gameboard[3][4]).toEqual({ length: 4, hits: 0, sunk: false });
});

test('If ship (length 3) is placed at [3,4] - horizontal, [3,5] and [3,6] should contain a ship', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip([3, 4], 3, "horizontal");
    expect(gameboard.gameboard[3][4]).toEqual({ length: 3, hits: 0, sunk: false });
    expect(gameboard.gameboard[3][5]).toEqual({ length: 3, hits: 0, sunk: false });
    expect(gameboard.gameboard[3][6]).toEqual({ length: 3, hits: 0, sunk: false });
});

test('If ship exceeds the gameboard throw an error.', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip([7, 3], 3, "horizontal")).toBe('Out of bounds');
});

test('If Ship is being placed on another ship throw an error', () => {
    const  gameboard = new Gameboard();

    gameboard.placeShip([3, 4], 4, "horizontal");
    expect(gameboard.placeShip([3, 5], 3, "vertical")).toBe('Ship is already placed here');
})