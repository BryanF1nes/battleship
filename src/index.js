import "./styles.css";

import Player from '../classes/Player.js';
import Ship from "../classes/Ship.js";

const container = document.querySelector('#container');
const player = new Player();


const gameboard = player.gameboard.gameboard;
function createBoard() {
    container.textContent = ''
    const board = document.createElement('div');
    board.id = 'gameboard'
    board.classList.add('flex')
    for (let i = 0; i < gameboard.length; i++) {
        const rows = document.createElement('div');
        for (let j = 0; j < gameboard[i].length; j++) {
            const cols = document.createElement('div');
            cols.setAttribute('data-set', `${j}${i}`)
            cols.classList.add('px-2', 'border-1', 'cursor-pointer');
            if (gameboard[j][i] !== 0 && gameboard[j][i] !== 'X') {
                cols.classList.add('bg-red-500')
                cols.textContent = 'S'
            } else if (gameboard[j][i] === 'X') {
                cols.classList.add('bg-gray-800')
                cols.textContent = gameboard[j][i]
            } else {
                cols.textContent = gameboard[j][i]
            }
            rows.append(cols);
        }
        board.append(rows);
    };
    container.append(board);
};

createBoard();

player.gameboard.placeShip([3, 4], 3, "horizontal");
createBoard();
player.gameboard.placeShip([1, 2], 5, "vertical");
createBoard();
player.gameboard.placeShip([9,8], 2, "horizontal");
createBoard();
player.gameboard.placeShip([0,0], 4, "vertical");
createBoard();


container.addEventListener('click', (e) => {
    const [x, y] = e.target.getAttribute('data-set')
    player.gameboard.receiveAttack([x, y]);
    createBoard();
})