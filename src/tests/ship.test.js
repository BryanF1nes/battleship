import { Ship } from '../classes/Ship';

test('Ship - ship object created with a length, their hits, and whether they are sunk', () => {
    const ship = new Ship(4);
    expect(ship).toEqual({ length: 4, hits: 0, sunk: false })
    expect(ship).toBeInstanceOf(Ship);
});

test('Ship - when hit is received ship.hits increases', () => {
    const ship = new Ship(4);
    ship.hit();
    expect(ship.hits).toEqual(1);
})

test('Ship - when hits equals its length the ship is considered sunk', () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(3);
    expect(ship.sunk).toBeTruthy();
})

test('Ship - can not receive more hits after it is sunk', () => {
    const ship = new Ship(3);

    for (let i = 0; i < 3; i++) {
        ship.hit();
    };

    ship.hit();
    expect(ship.hits).toEqual(3);
})
