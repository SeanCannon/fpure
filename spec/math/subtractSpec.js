const subtract = require('../../lib/math/subtract');

describe('math/subtract', () => {
  it('subtracts two numbers', () => {
    expect(subtract(8)(5)).toBe(3);
    expect(subtract(5)(8)).toBe(-3);
  });
});
