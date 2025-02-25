class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    };

    hit() {
        return this.hits++;
    };

    isSunk() {
        if (this.hits === this.length) {
            return this.sunk = true;
        }
        return this.sunk = false;
    }
};

// Jest Testing
module.exports = Ship;

// export default Ship;