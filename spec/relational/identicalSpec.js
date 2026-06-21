'use strict';

const identical = require('../../lib/relational/identical');

describe('relational/identical', () => {
  it('compares two parameters', () => {
    const o = {};
    expect(identical(o, o)).toBe(true);
    expect(identical(1, 1)).toBe(true);
    expect(identical(1, '1')).toBe(false);
    expect(identical([], [])).toBe(false);
    expect(identical(0, -0)).toBe(false);
    expect(identical(NaN, NaN)).toBe(true);
  });
});
