const mean = require('../../lib/math/mean');

describe('math/mean', () => {
  it('calculates mean value', () => {
    expect(mean([2, 7, 9])).toBe(6);
    expect(isNaN(mean([]))).toBe(true);
  });
});
