import Gameboard from "./Gameboard.js";

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }
}

// module.exports = Player;
export default Player;
