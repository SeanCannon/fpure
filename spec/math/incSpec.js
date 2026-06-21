const inc = require('../../lib/math/inc');

describe('math/inc', () => {
  it('increments a number', () => {
    expect(inc(8)).toBe(9);
  });
});
