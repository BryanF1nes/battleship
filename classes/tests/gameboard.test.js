const Gameboard = require("../Gameboard.js");

test("Gameboard, place a ship at a given coordinate. E.G - [3, 4]", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 4, "horizontal");
  expect(gameboard.gameboard[3][4]).toEqual({
    length: 4,
    hits: 0,
    sunk: false,
  });
});

test("If ship (length 3) is placed at [3,4] - horizontal, [3,5] and [3,6] should contain a ship", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "horizontal");
  expect(gameboard.gameboard[3][4]).toEqual({
    length: 3,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.gameboard[3][5]).toEqual({
    length: 3,
    hits: 0,
    sunk: false,
  });
  expect(gameboard.gameboard[3][6]).toEqual({
    length: 3,
    hits: 0,
    sunk: false,
  });
});

test("If ship exceeds the gameboard throw an error.", () => {
  const gameboard = new Gameboard();

  expect(gameboard.placeShip([7, 3], 3, "horizontal")).toBe("Out of bounds");
});

test("If Ship is being placed on another ship throw an error", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 4, "horizontal");
  expect(gameboard.placeShip([3, 5], 3, "vertical")).toBe(
    "Ship is already placed here",
  );
});

test("Receive attack checks if [x, y] coords hit a ship", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "horizontal");
  gameboard.receiveAttack([3, 4]);
  expect(gameboard.gameboard[3][4]).toEqual({
    length: 3,
    hits: 1,
    sunk: false,
  });
});

test("Receive attack was a miss", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 3, "horizontal");
  gameboard.receiveAttack([3, 8]);
  expect(gameboard.gameboard[3][8]).toBe("MISS");
});

test("If all ships are sunk, end game", () => {
  const gameboard = new Gameboard();

  gameboard.placeShip([3, 4], 2, "vertical");
  gameboard.receiveAttack([3, 4]);
  gameboard.receiveAttack([4, 4]);
  expect(gameboard.gameOver).toBeTruthy();
});
