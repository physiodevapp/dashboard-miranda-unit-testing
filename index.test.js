
const { Room } = require('./index')

describe("Room tests", () => {

  test('isOccupied Room method', () => {
    
    const room = new Room();

    const isOccupied = room.isOccupied('09/07/2024');

    expect(isOccupied).toBe(false);

  });
  
});