function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isValidPlacement(gameboard, row, col, length, orientation) {
  // Check for buffer zone (at least one empty tile between ships)
  const directions = [
    [-1, -1], [-1, 0], [-1, 1], // Top-left, Top, Top-right
    [0, -1], [0, 1], // Left, Right
    [1, -1], [1, 0], [1, 1] // Bottom-left, Bottom, Bottom-right
  ];

  // Check surrounding cells and the area where the ship will be placed
  if (orientation === "horizontal") {
    if (col + length > 10) return false;
    for (let i = 0; i < length; i++) {
      // Check if the ship will overlap with existing ships
      if (gameboard[row][col + i] !== "") return false;

      // Check surrounding cells
      for (let [dx, dy] of directions) {
        const x = row + dx;
        const y = col + i + dy;
        if (x >= 0 && x < 10 && y >= 0 && y < 10) {
          if (gameboard[x][y] !== "") return false; // Not an empty tile
        }
      }
    }
  } else { // vertical placement
    if (row + length > 10) return false;
    for (let i = 0; i < length; i++) {
      // Check if the ship will overlap with existing ships
      if (gameboard[row + i][col] !== "") return false;

      // Check surrounding cells
      for (let [dx, dy] of directions) {
        const x = row + i + dx;
        const y = col + dy;
        if (x >= 0 && x < 10 && y >= 0 && y < 10) {
          if (gameboard[x][y] !== "") return false; // Not an empty tile
        }
      }
    }
  }
  return true;
}

function spawnShips(player) {
  const shipLengths = [5, 4, 3, 3, 2];
  const gameboard = player.gameboard.gameboard;

  for (const length of shipLengths) {
    let placed = false;

    while (!placed) {
      const row = getRandomInt(0, 9);
      const col = getRandomInt(0, 9);
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

      if (isValidPlacement(gameboard, row, col, length, orientation)) {
        player.gameboard.placeShip([row, col], length, orientation);
        placed = true;
      }
    }
  }
}

export default spawnShips;
