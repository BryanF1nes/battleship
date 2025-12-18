import { Player } from "../classes/Player";

export const createGame = () => {
    const player = new Player();
    const computer = new Player();

    let currentPlayer = player;
    let opponent = computer;

    const setupBoards = () => {
        // temporary hardcoded placement
        player.gameboard.placeShip(5, [0, 5]);
        player.gameboard.placeShip(4, [2, 0]);
        player.gameboard.placeShip(3, [7, 7], "vertical");
        player.gameboard.placeShip(3, [0, 0]);
        player.gameboard.placeShip(2, [5, 4], "vertical");

        computer.gameboard.placeShip(5, [1, 5]);
        computer.gameboard.placeShip(4, [2, 0]);
        computer.gameboard.placeShip(3, [7, 7], "vertical");
        computer.gameboard.placeShip(3, [0, 0]);
        computer.gameboard.placeShip(2, [5, 4], "vertical");
    };

    const attack = (x, y) => {
        const result = opponent.gameboard.receiveAttack([x, y]);
        if (!result) return false;

        switchTurn();
        return true;
    };

    const switchTurn = () => {
        [currentPlayer, opponent] = [opponent, currentPlayer];
    };

    return {
        player,
        computer,
        setupBoards,
        attack,
        getCurrentPlayer: () => currentPlayer,
        getOpponent: () => opponent,
    };
};
