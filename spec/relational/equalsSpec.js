'use strict';

const equals = require('../../lib/relational/equals');

describe('relational/equals', () => {
  it('compares two parameters', () => {
    const o = {};
    let a = {}, b = {};
    a.v = a;
    b.v = b;
    expect(equals(a, b)).toBe(true);
    expect(equals(o, o)).toBe(true);
    expect(equals(1, 1)).toBe(true);
    expect(equals(1, '1')).toBe(false);
    expect(equals([], [])).toBe(true);
    expect(equals([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(equals([1, 2, 3], [1, 4, 3])).toBe(false);
    expect(equals({}, {})).toBe(true);
    expect(equals(0, -0)).toBe(false);
    expect(equals(NaN, NaN)).toBe(true);
  });
});
