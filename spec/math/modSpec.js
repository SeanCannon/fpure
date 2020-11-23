const mod = require('../../lib/math/mod');

describe('math/mod', () => {
  it('performs mathematical modulo', () => {
  expect(mod(-17, 3)).toBe(-2);
  expect(mod(17, -3)).toBe(2);
  });
});
