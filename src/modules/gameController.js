import { Player } from "../classes/Player";

export const createGame = () => {
    const player = new Player('Player');
    const computer = new Player('Computer');

    let currentPlayer = player;
    let opponent = computer;

    let placementQueue = [5, 4, 3, 3, 2];
    let currentShipLength = null;
    let orientation = "horizontal";
    let placing = true;

    const setupBoards = () => {
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

    const checkGameOver = () => {
        if (player.gameboard.hasLost()) {
            return computer;
        }

        if (computer.gameboard.hasLost()) {
            return player;
        }

        return null;
    }

    const startPlacement = () => {
        currentShipLength = placementQueue.shift();
    };

    const rotateShip = () => {
        orientation = orientation === "horizontal" ? "vertical" : "horizontal";
    };

    const placeShipAt = (x, y) => {
        if (!placing || !currentShipLength) return false;

        const success = player.gameboard.placeShip(
            currentShipLength,
            [x, y],
            orientation
        );

        if (!success) return false;

        if (placementQueue.length === 0) {
            placing = false;
            currentShipLength = null;

            currentPlayer = player;
            opponent = computer;
            randomizeBoard(computer.gameboard)
        } else {
            currentShipLength = placementQueue.shift();
        }

        return true;
    };

    const randomizeBoard = (gameboard) => {
        const ships = [5, 4, 3, 3, 2];

        ships.forEach((length) => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 100) {
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);
                const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

                placed = gameboard.placeShip(length, [x, y], orientation);
                attempts++;
            }

            if (!placed) {
                console.error(`Failed to place ship of length ${length} after 100 attempts`);
            }
        });
    }

    return {
        player,
        computer,
        setupBoards,
        checkGameOver,
        attack,
        placeShipAt,
        rotateShip,
        startPlacement,
        isPlacing: () => placing,
        getOrientation: () => orientation,
        getCurrentShipLength: () => currentShipLength,
        getCurrentPlayer: () => currentPlayer,
        getOpponent: () => opponent,
    };
};
