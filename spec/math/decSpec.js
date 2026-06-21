const dec = require('../../lib/math/dec');

describe('math/dec', () => {
  it('decrements a number', () => {
    expect(dec(8)).toBe(7);
  });
});
