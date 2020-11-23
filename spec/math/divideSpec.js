const divide = require('../../lib/math/divide');

describe('math/divide', () => {
  it('divides two numbers', () => {
    expect(divide(20)(5)).toBe(4);
    expect(divide(5, 1)).toBe(5);
    expect(divide(0)(3)).toBe(0);
    expect(divide(3)(0)).toBe(Infinity);
    expect(divide(3)(-0)).toBe(-Infinity);
  });
});
