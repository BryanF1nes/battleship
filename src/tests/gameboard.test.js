import { Gameboard } from "../classes/Gameboard";
import { Ship } from "../classes/Ship";

test('Gameboard - Can place ships at a given coordinate ([x, y]) position within the board horizontally', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(5, [0, 1]);
    expect(gameboard.board[0][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[0][2].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[0][3].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[0][4].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[0][5].ship).toBeInstanceOf(Ship);
});

test('Gameboard - Can place ships at a given coordinate ([x, y]) position within the board vertically', () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(5, [0, 1], "vertical");
    expect(gameboard.board[0][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[1][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[2][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[3][1].ship).toBeInstanceOf(Ship);
    expect(gameboard.board[4][1].ship).toBeInstanceOf(Ship);
});

test('Gameboard - Cant place ships "out of bounds" of the board', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(3, [0, 9])).toBeFalsy();
});

test('Gameboard - Can place ships on the edges', () => {
    const gameboard = new Gameboard();

    expect(gameboard.placeShip(2, [0, 8])).toBeTruthy();
    expect(gameboard.placeShip(2, [8, 0], "vertical")).toBeTruthy();
});
