const multiply = require('../../lib/math/multiply');

describe('math/multiply', () => {
  it('multiplies two numbers', () => {
    expect(multiply(4)(5)).toBe(20);
  });
});
