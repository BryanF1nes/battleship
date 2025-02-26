function playerBoard(player) {
  player.gameboard.placeShip([1, 2], 5, "vertical");
  player.gameboard.placeShip([0, 0], 4, "vertical");
  player.gameboard.placeShip([3, 4], 3, "horizontal");
  player.gameboard.placeShip([9, 0], 3, "horizontal");
  player.gameboard.placeShip([9, 8], 2, "horizontal");
}

export default playerBoard;
