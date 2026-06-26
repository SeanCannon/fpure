const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { add, sub, mul, div, mod, mathMod, inc, dec, negate, sum, product, mean, median, min, max, maxBy, minBy, clamp } = require('../dist/index.js');

describe('add', () => {
  it('adds two numbers and supports partial application', () => {
    assert.equal(add(4, 5), 9);
    assert.equal(add(4)(5), 9);
  });
});

describe('sub', () => {
  it('subtracts the first argument from the second (data-last)', () => {
    assert.equal(sub(3, 10), 7);
    assert.equal(sub(3)(10), 7);
  });
});

describe('mul', () => {
  it('multiplies two numbers', () => {
    assert.equal(mul(4, 5), 20);
  });
});

describe('div', () => {
  it('divides the second argument by the first (data-last)', () => {
    assert.equal(div(2, 10), 5);
  });
});

describe('mod', () => {
  it('returns the remainder of dividing the second argument by the first', () => {
    assert.equal(mod(3, 10), 1);
  });
});

describe('mathMod', () => {
  it('returns the true modulo for a positive integer modulus', () => {
    assert.equal(mathMod(5, 17), 2);
    assert.equal(mathMod(5, -17), 3);
  });

  it('returns NaN for a non-integer modulus', () => {
    assert.ok(Number.isNaN(mathMod(5, 17.2)));
  });

  it('returns NaN for a non-positive modulus', () => {
    assert.ok(Number.isNaN(mathMod(-5, 17)));
  });
});

describe('inc', () => {
  it('adds one to a number', () => {
    assert.equal(inc(5), 6);
  });
});

describe('dec', () => {
  it('subtracts one from a number', () => {
    assert.equal(dec(5), 4);
  });
});

describe('negate', () => {
  it('negates a number', () => {
    assert.equal(negate(5), -5);
  });
});

describe('sum', () => {
  it('sums all numbers in a list', () => {
    assert.equal(sum([1, 2, 3, 4]), 10);
  });

  it('returns 0 for an empty list', () => {
    assert.equal(sum([]), 0);
  });
});

describe('product', () => {
  it('multiplies all numbers in a list', () => {
    assert.equal(product([1, 2, 3, 4]), 24);
  });
});

describe('mean', () => {
  it('computes the arithmetic mean of a list', () => {
    assert.equal(mean([1, 2, 3, 4]), 2.5);
  });
});

describe('median', () => {
  it('computes the median for odd-length lists', () => {
    assert.equal(median([1, 2, 3, 4, 5]), 3);
  });

  it('computes the median for even-length lists', () => {
    assert.equal(median([1, 2, 3, 4]), 2.5);
  });
});

describe('min', () => {
  it('returns the lesser of two values', () => {
    assert.equal(min(3, 5), 3);
  });

  it('returns the first value when it is greater', () => {
    assert.equal(min(5, 3), 3);
  });
});

describe('max', () => {
  it('returns the greater of two values', () => {
    assert.equal(max(3, 5), 5);
  });

  it('returns the first value when it is greater', () => {
    assert.equal(max(5, 3), 5);
  });
});

describe('clamp', () => {
  it('clamps a value within a given range', () => {
    assert.equal(clamp(1, 10, 5), 5);
    assert.equal(clamp(1, 10, 0), 1);
    assert.equal(clamp(1, 10, 15), 10);
  });
});

describe('maxBy', () => {
  it('returns the value with the larger result from a transform', () => {
    assert.equal(maxBy(x => x.length, 'aaa', 'bb'), 'aaa');
  });

  it('returns the second value when its transform result is larger', () => {
    assert.equal(maxBy(x => x.length, 'aa', 'bbb'), 'bbb');
  });
});

describe('minBy', () => {
  it('returns the value with the smaller result from a transform', () => {
    assert.equal(minBy(x => x.length, 'aaa', 'bb'), 'bb');
  });

  it('returns the first value when its transform result is smaller', () => {
    assert.equal(minBy(x => x.length, 'aa', 'bbb'), 'aa');
  });
});
