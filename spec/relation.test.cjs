const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { gt, lt, gte, lte, identical, equals } = require('../dist/index.js');

describe('gt', () => {
  it('returns true when the second argument is greater than the first (data-last)', () => {
    assert.equal(gt(3, 5), true);
    assert.equal(gt(5, 3), false);
    assert.equal(gt(3)(5), true);
  });

  it('supports partial application for reusable thresholds', () => {
    const gt3 = gt(3);
    assert.equal(gt3(5), true);
    assert.equal(gt3(2), false);
  });
});

describe('lt', () => {
  it('returns true when the second argument is less than the first', () => {
    assert.equal(lt(5, 3), true);
    assert.equal(lt(3, 5), false);
  });
});

describe('gte', () => {
  it('returns true when the second argument is greater than or equal to the first', () => {
    assert.equal(gte(3, 5), true);
    assert.equal(gte(5, 3), false);
    assert.equal(gte(3, 3), true);
  });
});

describe('lte', () => {
  it('returns true when the second argument is less than or equal to the first', () => {
    assert.equal(lte(5, 3), true);
    assert.equal(lte(3, 5), false);
    assert.equal(lte(3, 3), true);
  });
});

describe('identical', () => {
  it('returns true for same-value-zero equality', () => {
    assert.equal(identical(1, 1), true);
    assert.equal(identical(NaN, NaN), true);
  });

  it('returns false for different values', () => {
    assert.equal(identical(1, '1'), false);
    assert.equal(identical([], []), false);
    assert.equal(identical(0, -0), false);
  });
});

describe('equals', () => {
  it('compares primitives by value', () => {
    assert.equal(equals(1, 1), true);
    assert.equal(equals(1, '1'), false);
    assert.equal(equals(NaN, NaN), true);
  });

  it('compares arrays deeply', () => {
    assert.equal(equals([1, 2, 3], [1, 2, 3]), true);
    assert.equal(equals([1, 2, 3], [1, 2, 4]), false);
    assert.equal(equals([1, [2, 3]], [1, [2, 3]]), true);
  });

  it('compares objects deeply', () => {
    assert.equal(equals({ a: 1, b: 2 }, { a: 1, b: 2 }), true);
    assert.equal(equals({ a: 1, b: 2 }, { a: 1, b: 3 }), false);
    assert.equal(equals({ a: 1, b: { c: 3 } }, { a: 1, b: { c: 3 } }), true);
  });

  it('returns false when comparing empty vs non-empty structures', () => {
    assert.equal(equals({}, { a: 1 }), false);
    assert.equal(equals([], [1]), false);
  });

  it('compares Dates by time value', () => {
    assert.equal(equals(new Date(0), new Date(0)), true);
    assert.equal(equals(new Date(0), new Date(1)), false);
  });

  it('compares Errors by name and message', () => {
    assert.equal(equals(new Error('msg'), new Error('msg')), true);
    assert.equal(equals(new Error('a'), new Error('b')), false);
  });

  it('compares RegExps by source and flags', () => {
    assert.equal(equals(/test/g, /test/g), true);
    assert.equal(equals(/test/g, /test/gi), false);
  });

  it('compares Maps by entries', () => {
    assert.equal(equals(new Map([['a', 1]]), new Map([['a', 1]])), true);
    assert.equal(equals(new Map([['a', 1]]), new Map([['a', 1], ['b', 2]])), false);
  });

  it('compares Sets by values', () => {
    assert.equal(equals(new Set([1]), new Set([1])), true);
    assert.equal(equals(new Set([1]), new Set([1, 2])), false);
  });

  it('distinguishes 0 from -0', () => {
    assert.equal(equals(0, -0), false);
  });

  it('compares String objects by primitive value', () => {
    assert.equal(equals(new String('a'), new String('b')), false);
  });

  it('returns false for different Symbols', () => {
    assert.equal(equals(Symbol('a'), Symbol('a')), false);
  });

  it('handles circular references without infinite recursion', () => {
    const a = {};
    a.self = a;
    const b = {};
    b.self = b;
    assert.equal(equals(a, b), true);
  });

  it('compares thenable functions by reference', () => {
    const t1 = () => {};
    t1.then = () => {};
    const t2 = () => {};
    t2.then = () => {};
    assert.equal(equals(t1, t1), true);
    assert.equal(equals(t1, t2), false);
  });
});
