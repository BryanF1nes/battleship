import { Gameboard } from "./Gameboard";

export class Player {
    constructor(name) {
        this.name = name;
        this.gameboard = new Gameboard();
        this.attacks = new Set();
    }

    getRandomAttack() {
        let x, y;
        let key;

        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
            key = `${x},${y}`;
        } while (this.attacks.has(key));

        this.attacks.add(key);
        return [x, y]
    }

}
