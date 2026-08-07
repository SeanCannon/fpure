const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { both, either, and, or, not, complement, ifElse, when, unless, cond, allPass, anyPass, defaultTo, equals, gt, isEmpty, isNotEmpty, pathSatisfies, propSatisfies, until, xor } = require('../dist/index.js');

describe('both', () => {
  it('returns true when both predicates pass', () => {
    const isPositive = x => x > 0;
    const isEven = x => x % 2 === 0;
    assert.equal(both(isPositive, isEven, 4), true);
    assert.equal(both(isPositive, isEven, -4), false);
    assert.equal(both(isPositive, isEven, 3), false);
  });

  it('supports partial application', () => {
    const isPositive = x => x > 0;
    const isEven = x => x % 2 === 0;
    const isPositiveAndEven = both(isPositive, isEven);
    assert.equal(isPositiveAndEven(4), true);
    assert.equal(isPositiveAndEven(3), false);
  });
});

describe('either', () => {
  it('returns true when either predicate passes', () => {
    const isPositive = x => x > 0;
    const isEven = x => x % 2 === 0;
    assert.equal(either(isPositive, isEven, 4), true);
    assert.equal(either(isPositive, isEven, 3), true);
    assert.equal(either(isPositive, isEven, -3), false);
  });

  it('supports partial application', () => {
    const isPositive = x => x > 0;
    const isEven = x => x % 2 === 0;
    const isPositiveOrEven = either(isPositive, isEven);
    assert.equal(isPositiveOrEven(-2), true);
    assert.equal(isPositiveOrEven(-3), false);
  });
});

describe('and', () => {
  it('returns the first argument if it is falsy', () => {
    assert.equal(and(null, 42), null);
    assert.equal(and(0, 42), 0);
    assert.equal(and(false, 42), false);
    assert.equal(and('', 42), '');
  });

  it('returns the second argument if the first is truthy', () => {
    assert.equal(and(true, 42), 42);
    assert.equal(and(1, 'hello'), 'hello');
  });

  it('supports partial application', () => {
    const andTrue = and(true);
    assert.equal(andTrue(42), 42);
  });
});

describe('or', () => {
  it('returns the first argument if it is truthy', () => {
    assert.equal(or(42, 100), 42);
    assert.equal(or(true, false), true);
    assert.equal(or(1, null), 1);
  });

  it('returns the second argument if the first is falsy', () => {
    assert.equal(or(null, 42), 42);
    assert.equal(or(false, true), true);
    assert.equal(or(0, 100), 100);
  });

  it('supports partial application', () => {
    const orDefault = or(null);
    assert.equal(orDefault(42), 42);
    assert.equal(orDefault('hello'), 'hello');
  });
});

describe('not', () => {
  it('negates a value', () => {
    assert.equal(not(true), false);
    assert.equal(not(false), true);
    assert.equal(not(0), true);
    assert.equal(not(1), false);
  });
});

describe('complement', () => {
  it('wraps a predicate to return the logical negation', () => {
    const isEven = x => x % 2 === 0;
    const isOdd = complement(isEven);
    assert.equal(isOdd(1), true);
    assert.equal(isOdd(2), false);
  });

  it('supports partial application', () => {
    const isEven = x => x % 2 === 0;
    const notEven = complement(isEven);
    assert.equal(notEven(3), true);
  });
});

describe('ifElse', () => {
  it('applies onTrue when the predicate is true', () => {
    const inc = x => x + 1;
    const dec = x => x - 1;
    assert.equal(ifElse(x => x > 0, inc, dec, 5), 6);
    assert.equal(ifElse(x => x > 0, inc, dec, -5), -6);
  });

  it('supports partial application', () => {
    const inc = x => x + 1;
    const dec = x => x - 1;
    const posOrNeg = ifElse(x => x > 0, inc, dec);
    assert.equal(posOrNeg(5), 6);
    assert.equal(posOrNeg(-5), -6);
  });
});

describe('when', () => {
  it('applies fn when the predicate is true', () => {
    const double = x => x * 2;
    assert.equal(when(x => x > 0, double, 5), 10);
    assert.equal(when(x => x > 0, double, -5), -5);
  });

  it('supports partial application', () => {
    const doublePositives = when(x => x > 0, x => x * 2);
    assert.equal(doublePositives(5), 10);
    assert.equal(doublePositives(-5), -5);
  });
});

describe('unless', () => {
  it('applies fn when the predicate is false', () => {
    const double = x => x * 2;
    assert.equal(unless(x => x > 0, double, -5), -10);
    assert.equal(unless(x => x > 0, double, 5), 5);
  });

  it('supports partial application', () => {
    const doubleNegatives = unless(x => x > 0, x => x * 2);
    assert.equal(doubleNegatives(-5), -10);
    assert.equal(doubleNegatives(5), 5);
  });
});

describe('cond', () => {
  it('evaluates pairs until a predicate matches', () => {
    const classify = cond([
      [x => x < 0, () => 'negative'],
      [x => x === 0, () => 'zero'],
      [x => x > 0, () => 'positive'],
    ]);
    assert.equal(classify(-1), 'negative');
    assert.equal(classify(0), 'zero');
    assert.equal(classify(1), 'positive');
  });

  it('returns undefined when no predicate matches', () => {
    const fn = cond([[() => false, () => 'never']]);
    assert.equal(fn(42), undefined);
  });
});

describe('allPass', () => {
  it('returns true when all predicates pass', () => {
    const isPositive = x => x > 0;
    const isEven = x => x % 2 === 0;
    assert.equal(allPass([isPositive, isEven], 4), true);
    assert.equal(allPass([isPositive, isEven], 3), false);
    assert.equal(allPass([isPositive, isEven], -4), false);
  });

  it('returns true for an empty predicate list', () => {
    assert.equal(allPass([], 42), true);
  });

  it('supports partial application', () => {
    const isPositiveAndEven = allPass([x => x > 0, x => x % 2 === 0]);
    assert.equal(isPositiveAndEven(4), true);
    assert.equal(isPositiveAndEven(3), false);
  });
});

describe('anyPass', () => {
  it('returns true when any predicate passes', () => {
    const isPositive = x => x > 0;
    const isEven = x => x % 2 === 0;
    assert.equal(anyPass([isPositive, isEven], 4), true);
    assert.equal(anyPass([isPositive, isEven], 3), true);
    assert.equal(anyPass([isPositive, isEven], -3), false);
  });

  it('returns false for an empty predicate list', () => {
    assert.equal(anyPass([], 42), false);
  });

  it('supports partial application', () => {
    const isPositiveOrEven = anyPass([x => x > 0, x => x % 2 === 0]);
    assert.equal(isPositiveOrEven(-2), true);
    assert.equal(isPositiveOrEven(-3), false);
  });
});

describe('isEmpty', () => {
  it('returns true for empty values', () => {
    assert.equal(isEmpty(null), true);
    assert.equal(isEmpty(undefined), true);
    assert.equal(isEmpty(''), true);
    assert.equal(isEmpty([]), true);
    assert.equal(isEmpty({}), true);
  });
  it('returns false for non-empty values', () => {
    assert.equal(isEmpty('a'), false);
    assert.equal(isEmpty([1]), false);
    assert.equal(isEmpty({a: 1}), false);
  });
});

describe('isNotEmpty', () => {
  it('returns false for empty values', () => {
    assert.equal(isNotEmpty(null), false);
    assert.equal(isNotEmpty(''), false);
  });
  it('returns true for non-empty values', () => {
    assert.equal(isNotEmpty('a'), true);
  });
});

describe('pathSatisfies', () => {
  it('returns true when path value satisfies predicate', () => {
    assert.equal(pathSatisfies(x => x > 0, ['a', 'b'], {a: {b: 5}}), true);
    assert.equal(pathSatisfies(x => x > 0, ['a', 'b'], {a: {b: -1}}), false);
  });
  it('returns false when path does not exist', () => {
    assert.equal(pathSatisfies(x => true, ['x', 'y'], {}), false);
  });
});

describe('propSatisfies', () => {
  it('returns true when property satisfies predicate', () => {
    assert.equal(propSatisfies(x => x > 0, 'a', {a: 5}), true);
    assert.equal(propSatisfies(x => x > 0, 'a', {a: -1}), false);
  });
});

describe('until', () => {
  it('applies fn until predicate is satisfied', () => {
    assert.equal(until(x => x >= 100, x => x * 2, 1), 128);
  });
});

describe('xor', () => {
  it('returns true when exactly one argument is truthy', () => {
    assert.equal(xor(true, false), true);
    assert.equal(xor(false, true), true);
    assert.equal(xor(true, true), false);
    assert.equal(xor(false, false), false);
  });
  it('supports partial application', () => {
    const xorTrue = xor(true);
    assert.equal(xorTrue(false), true);
    assert.equal(xorTrue(true), false);
  });
});

describe('defaultTo', () => {
  it('returns the default value when the value is null', () => {
    assert.equal(defaultTo(42, null), 42);
  });

  it('returns the default value when the value is undefined', () => {
    assert.equal(defaultTo(42, undefined), 42);
  });

  it('returns the value when it is not null or undefined', () => {
    assert.equal(defaultTo(42, 0), 0);
    assert.equal(defaultTo(42, ''), '');
    assert.equal(defaultTo(42, false), false);
    assert.equal(defaultTo(42, 'hello'), 'hello');
  });

  it('supports partial application', () => {
    const ensureNumber = defaultTo(0);
    assert.equal(ensureNumber(null), 0);
    assert.equal(ensureNumber(42), 42);
  });
});
