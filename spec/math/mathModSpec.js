const mathMod = require('../../lib/math/mathMod');

describe('math/mathMod', () => {
  it('performs mathematical modulo', () => {
    expect(mathMod(-17, 5)).toBe(3);
    expect(mathMod(17, 5)).toBe(2);
    expect(isNaN(mathMod(17, -5))).toBe(true);
    expect(isNaN(mathMod(17, 0))).toBe(true);
    expect(isNaN(mathMod(17.2, 5))).toBe(true);
    expect(isNaN(mathMod(17, 5.3))).toBe(true);
  });
});
