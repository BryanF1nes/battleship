const Ship = require("../Ship.js");

test("Ship created with a length of 5", () => {
  const ship = new Ship(5);
  expect(ship.length).toBe(5);
});

test("Ship is hit and increases its hit counter", () => {
  const ship = new Ship(4);

  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship is hit multiple times and is sunk", () => {
  const ship = new Ship(2);

  ship.hit();
  ship.isSunk();
  ship.hit();
  ship.isSunk();
  expect(ship.sunk).toBeTruthy();
});
