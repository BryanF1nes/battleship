export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        if (this.isSunk()) {
            return;
        }

        this.hits++;
        this.isSunk();
    }

    // TODO: This logical statement could be updated at some point.
    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
            return true;
        }

        return false;
    }
}
